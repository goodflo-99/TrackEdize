import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorHelperService } from 'src/app/shared/helpers/color-helper.service';
import { NavigationHelperService } from 'src/app/shared/helpers/navigation-helper.service';
import { Issue } from '../models/issue';
import { IssueService } from '../services/issue.service';
import { Filter } from '../models/filter';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issues: Issue[] = [];
  constructor(private service: IssueService, private nav: NavigationHelperService, public colorHelper: ColorHelperService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(x=> this.issues = x);
  }

  edit(issue:Issue){
    this.nav.navigateToIssue(issue.id);
  }

  delete(id:any) {

  }

  getAll() {
    this.service.getAll().subscribe(x=> this.issues = x);
  }

  filterIssues(filter: Filter) {
    if(!filter.isDirty()) {
      return this.getAll();
    }
    this.service.filterIssues(filter).subscribe(x=>this.issues = x);
  }
}
