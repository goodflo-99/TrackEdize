import { Component, Input, OnInit } from '@angular/core';
import { ColorHelperService } from 'src/app/shared/helpers/color-helper.service';
import { Statuses } from 'src/app/shared/constants/statuses';
import { NavigationHelperService } from 'src/app/shared/helpers/navigation-helper.service';
import { Issue } from 'src/app/tracking/models/issue';

@Component({
  selector: 'issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent implements OnInit {

  @Input()
  issue!: Issue;

    constructor(private nav: NavigationHelperService, public colorHelper: ColorHelperService) { }

  ngOnInit(): void {
  }

  goToIssue() {
    if(this.issue.id) {
      this.nav.navigateToIssue(this.issue.id);
    }
  }

}
