import { Component, OnInit } from '@angular/core';
import { Statuses } from 'src/app/common/constants/statuses';
import { Issue } from 'src/app/tracking/models/issue';
import { IssueService } from 'src/app/tracking/services/issue.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  issues: Issue[] = [];
  openIssues: Issue[] = [];
  progressIssues: Issue[] = [];
  readyTestingIssues: Issue[] = [];
  TestingIssues: Issue[] = [];
  doneIssues: Issue[] = [];

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.issueService.getAll().subscribe(x => {
      this.issues = x;
      this.filterByTypes(this.issues)
      
    });
  }

  filterByTypes(issues: Issue[]) {
    this.openIssues = issues.filter(x=> x.status == Statuses.Status.Open);
    this.progressIssues = issues.filter(x=> x.status == Statuses.Status.InProgress);
    this.readyTestingIssues = issues.filter(x=> x.status == Statuses.Status.ReadyForTesting);
    this.TestingIssues = issues.filter(x=> x.status == Statuses.Status.Testing);
    this.doneIssues = issues.filter(x=> x.status == Statuses.Status.Done);
  }

  filterIssues(id: any) {
    if(!id) {
      return this.getAll();
    }
    this.issueService.getByProjectId(id).subscribe(x=> {
        this.issues = x;
        this.filterByTypes(this.issues);
      });
  }

  search(str: string) {
    if(str.length == 0) {
      this.getAll();
    } else if(this.issues.length == 0) {
      this.issueService.getAll().subscribe(x=> {
        this.issues = x.filter(y=>y.subject?.toUpperCase().includes(str.toUpperCase()));
        this.filterByTypes(this.issues);
      });
    } else {
      this.issues = this.issues.filter(x=> x.subject?.toUpperCase().includes(str.toUpperCase()));
      this.filterByTypes(this.issues);
    }
  }
  
}
