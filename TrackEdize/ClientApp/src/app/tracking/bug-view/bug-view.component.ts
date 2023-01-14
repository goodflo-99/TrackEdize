import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../models/issue';
import { IssueService } from '../services/issue.service';
import { Statuses } from 'src/app/common/constants/statuses';
import { Constants } from 'src/app/common/constants/constants';
import { ProjectService } from 'src/app/project/services/project.service';
import { Project } from 'src/app/project/models/project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../models/comment';
import {Clipboard} from '@angular/cdk/clipboard';
import { DialogHelperService } from 'src/app/shared/helpers/dialog-helper.service';
import { MessageService } from 'primeng/api';
import { NavigationHelperService } from 'src/app/shared/helpers/navigation-helper.service';

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.scss'],
  providers: [MessageService]
})
export class BugViewComponent implements OnInit {

  iTypes = Constants.iTypes;
  environments = Constants.environments;
  browsers = Constants.browsers;
  devices = Constants.devices;
  opsystems = Constants.opsystems;
  statuses: any[] = [];
  aDev: any[] = [];
  aQA: any[] = [];
  isNewIssue: boolean = true;
  newIssue: Issue = new Issue();
  projects: Project[] = [];
  issueForm: FormGroup = new FormGroup({});
  viewMode = false;

  //@Input() issue?: Issue;
  @Input() id?: string;
  @Input() projectId?: string;

  constructor(private issueService: IssueService,
    private nav: NavigationHelperService, 
    private route: ActivatedRoute, 
    private projSvc: ProjectService, 
    private fb: FormBuilder, 
    private clipboard: Clipboard, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.initForm();
    if (!this.id) {
      this.handleParams();
    }

    if (this.id) {
      this.isNewIssue = false;
      this.getIssue(this.id);
      this.disableForm();
    } else {
      this.setDefaultIssueType();
    }
    
    this.statuses = Statuses.getValues();

    this.getProjects();

  }
  getIssue(id: string) {
    this.issueService.getById(id).subscribe(response => {
      this.newIssue = response;
    });
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
      system: null,
      acceptance: null
    });
  }

  save() {
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

    this.disableForm();
  }

  reset() {
    this.newIssue = new Issue();
    this.setDefaultIssueType();
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

  isBug(issue: Issue) : boolean {
    return issue.type=='Bug'
  }

  isStory(issue: Issue) : boolean {
    return issue.type=='Story'
  }

  private setDefaultIssueType() {
    this.newIssue.type = 'Bug';
  }

  handleParams() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.projectId = params['projectId']
    });

    // this.route.queryParams.subscribe(params => {
    //   this.projectId = params['projectId']
    // })
  }

  getProjects() {
    this.projSvc.getAll().subscribe(projects => {
      this.projects = projects;

      if(this.isNewIssue && this.projectId && this.projectId.length > 0) {
        this.newIssue.project.id = this.projectId;
      }
    });
  }

  deleteComment(id: string) {
    if (id && this.newIssue.id) {
      this.issueService.deleteComment(id, this.newIssue.id).subscribe(x=> {
        this.updateComments(x);
      });
    }
  }

  copyLink() {
    this.clipboard.copy(window.location.href);
  }

  showDeleteIssueDialog() {
    this.messageService.clear();
    this.messageService.add({
      key: 'issue',
      sticky: true,
      severity: 'warn',
      summary: 'Confirmation',
      detail: 'Are you sure that you want to delete this issue?',
      closable: false,
      data: this.newIssue.id,
    });
  }

  delete(id?: string) {
    if(id) {
      this.issueService.delete(id).subscribe(x=> {
        this.nav.toDashboard();
      })
    }    
  }

  enableForm() {
    this.viewMode = false;
    //this.issueForm.enable();
  }

  disableForm() {
    this.viewMode = true;
    //this.issueForm.disable();
  }

}