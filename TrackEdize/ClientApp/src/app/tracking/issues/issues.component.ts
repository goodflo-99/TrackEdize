import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from '../models/issue';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issues: Issue[] = [];
  constructor(private service: IssueService, private router: Router) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(x=> this.issues = x);
  }

  edit(issue:Issue){
    this.router.navigate(['/issues/bug-view', issue.id]);
  }

  delete(id:any) {

  }

  getAll() {
    this.service.getAll().subscribe(x=> this.issues = x);
  }

  filterIssues(id: any) {
    if(!id) {
      return this.getAll();
    }
    console.log("triggered from issues.component", id)
    this.service.getByProjectId(id).subscribe(x=>this.issues = x);
  }

  search(str: string) {
    console.log("searched ", str)
    if(str.length == 0) {
      this.getAll();
    } else if(this.issues.length == 0) {
      this.service.getAll().subscribe(x=> this.issues = x.filter(y=>y.subject?.toUpperCase().includes(str.toUpperCase())));
    } else {
      this.issues = this.issues.filter(x=> x.subject?.toUpperCase().includes(str.toUpperCase()));
    }
  }
}
