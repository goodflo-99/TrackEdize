import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../models/issue';
import { IssueService } from '../services/issue.service';
import { Statuses } from 'src/app/shared/constants/statuses';
import { Constants } from 'src/app/shared/constants/constants';
import { ProjectService } from 'src/app/project/services/project.service';
import { Project } from 'src/app/project/models/project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.scss']
})
export class BugViewComponent implements OnInit {

  iTypes = Constants.iTypes;
  environments = Constants.environments;
  browsers = Constants.browsers;
  devices = Constants.devices;
  opsystems = Constants.opsystems;
  statuses: any[] = [];
  users: any[] = [];

  @Input()
  issue: Issue | undefined;

  @Input()
  id: string | undefined;

  isNewIssue: boolean = true;
  newIssue: Issue = new Issue();
  projects: Project[] = [];

  issueForm: FormGroup = new FormGroup({});

  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private projSvc: ProjectService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    if (!this.id) {
      this.route.params.subscribe(x => this.id = x['id'])
    }
    if (this.id) {
      this.isNewIssue = false;
      this.issueService.getById(this.id).subscribe(response => {
        this.newIssue = response;
      });
    }
    if (this.issue) {
      this.isNewIssue = false;
      this.newIssue = this.issue;
    }


    this.statuses = Statuses.getValues();
    console.log(this.statuses);

    this.projSvc.getAll().subscribe(x => this.projects = x);
  }

  initForm() {
    this.issueForm = this.fb.group({
      projectId: [null, [Validators.required]],
      type: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      username: null,
      password: null,
      steps: null,
      actualResult: null,
      expectedResult: null,
      environment: null,
      version: null,
      browser: null,
      device: null,
      system: null
    });
  }

  click() {
    if (this.id || this.newIssue.id) {
      this.issueService.update(this.newIssue).subscribe(x => {
        this.newIssue = x
      });
    } else {
      this.issueService.add(this.newIssue).subscribe(x => {
        this.isNewIssue = false;
        this.newIssue = x;
      });
    }
  }

  reset() {
    this.newIssue = new Issue();
  }

  updateComments(commets: Comment[]) {
    this.newIssue.comments = commets;
  }

  addComment(comment: Comment) {
    if (this.newIssue.id && this.newIssue.id != null) {
      if (comment.id) {
        this.issueService.updateComment(comment, this.newIssue.id).subscribe(x => this.updateComments(x));
      } else {
        this.issueService.addComment(comment, this.newIssue.id).subscribe(x => this.updateComments(x));
      }
    }
  }

}