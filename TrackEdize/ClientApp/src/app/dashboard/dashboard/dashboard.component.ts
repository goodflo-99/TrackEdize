import { Component, OnInit } from '@angular/core';
import { Statuses } from 'src/app/shared/constants/statuses';
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
    this.issueService.getAll().subscribe(x => {
      this.issues = x;

      this.openIssues = this.issues.filter(x=> x.status == Statuses.Status.Open);
      this.progressIssues = this.issues.filter(x=> x.status == Statuses.Status.InProgress);
      this.readyTestingIssues = this.issues.filter(x=> x.status == Statuses.Status.ReadyForTesting);
      this.TestingIssues = this.issues.filter(x=> x.status == Statuses.Status.Testing);
      this.doneIssues = this.issues.filter(x=> x.status == Statuses.Status.Done);

    });
  }

  filterIssues(e: any) {

  }
  
  search(e: any) {

  }

}
