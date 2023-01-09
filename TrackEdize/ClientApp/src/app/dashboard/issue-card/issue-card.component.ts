import { Component, Input, OnInit } from '@angular/core';
import { ColorHelperService } from 'src/app/common/color-helper.service';
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

  constructor(private nav: NavigationHelper, public colorHelper: ColorHelperService) { }

  ngOnInit(): void {
  }

  goToIssue() {
    if(this.issue.id) {
      this.nav.navigateToIssue(this.issue.id);
    }
  }

}
