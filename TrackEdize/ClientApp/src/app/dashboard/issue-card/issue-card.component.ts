import { Component, Input, OnInit } from '@angular/core';
import { Statuses } from 'src/app/shared/constants/statuses';
import { NavigationHelper } from 'src/app/shared/helpers/navigation.helper';
import { Issue } from 'src/app/tracking/models/issue';

@Component({
  selector: 'issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent implements OnInit {

  @Input()
  issue!: Issue;

  constructor(private nav: NavigationHelper) { }

  ngOnInit(): void {
  }

  goToIssue() {
    if(this.issue.id) {
      this.nav.navigateToIssue(this.issue.id);
    }
  }

  getBorderCardColor(type: any) {
    switch(type) {
      case "Bug": return "bug-border-card-color";
      case "Task": return "task-border-card-color";
      case "Story": return "story-border-card-color";
      default: break;
    }
    return "";
  }

  getIssueCardColor(status: any) {
    switch(status) {
      case "Bug": return "bug-card-color";
      case "Task": return "task-card-color";
      case "Story": return "story-card-color";
      default: break;
    }
    return "";
  }

}
