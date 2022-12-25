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
  progresIssues: Issue[] = [];
  doneIssues: Issue[] = [];

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
    this.issueService.getAll().subscribe(x => {
      this.issues = x;

      this.openIssues = this.issues.filter(x=> x.status == Statuses.Status.Open);
      this.progresIssues = this.issues.filter(x=> x.status == Statuses.Status.InProgres);
      this.doneIssues = this.issues.filter(x=> x.status == Statuses.Status.Done);

    });
  }

}
