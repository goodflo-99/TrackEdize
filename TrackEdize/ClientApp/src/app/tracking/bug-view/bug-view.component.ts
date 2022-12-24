import { Component, OnInit, Input } from '@angular/core';
import { Issue } from '../models/issue';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.scss']
})
export class BugViewComponent implements OnInit {

  environments = ['Development', 'Staging', 'Production'];
  selectedEnvironment?: string;

  browsers = ['Chrome', 'Safari', 'Opera', 'Firefox', 'Edge'];
  selectedBrowser?: string;

  devices = ['PC/Laptop', 'MacBook', 'Android phone', 'iPhone', 'Android tablet', 'iPad', 'Windows phone'];
  selectedDevice?: string;

  opsystems = ['Windows', 'Linux', 'Android', 'MacOS', 'iOS', 'iPadOS'];
  selectedOpSystem?: string;

  @Input()
  issue: Issue | undefined;

  @Input()
  id: string | undefined;

  isNewIssue: boolean = true;

  newIssue: Issue = new Issue();

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
    if(this.id) {
      this.isNewIssue = false;
      this.issueService.getById(this.id).subscribe(response=> {
        this.newIssue = response;
      });
    }
    if(this.issue) {
      this.isNewIssue = false;
      this.newIssue = this.issue;
    }
  }

  click() {
    if(this.id || this.newIssue.id) {
      this.issueService.update(this.newIssue).subscribe(x=> {
          this.newIssue = x
      });
    } else {
      this.issueService.add(this.newIssue).subscribe(x=> {
        this.isNewIssue = false;
        this.newIssue = x;
      });
    }
  }

  reset() {
    this.newIssue = new Issue();
  }

}