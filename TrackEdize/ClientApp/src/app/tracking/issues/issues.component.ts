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

  edit(id:Issue){
    this.router.navigate(['/issues/bug-view', id.id]);
  }

  delete(id:any) {

  }
}
