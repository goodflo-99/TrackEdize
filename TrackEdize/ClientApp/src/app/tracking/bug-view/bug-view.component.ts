import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../models/issue';
import { IssueService } from '../services/issue.service';
import { Statuses } from 'src/app/shared/constants/statuses';
import { ProjectService } from 'src/app/project/services/project.service';
import { Project } from 'src/app/project/models/project';

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.scss']
})
export class BugViewComponent implements OnInit {

  iTypes = ['Bug', 'Task', 'Story'];
  selectedType?: string;

  environments = ['Development', 'Staging', 'Production'];
  selectedEnvironment?: string;

  browsers = ['Chrome', 'Safari', 'Opera', 'Firefox', 'Edge'];
  selectedBrowser?: string;

  devices = ['PC/Laptop', 'MacBook', 'Android phone', 'iPhone', 'Android tablet', 'iPad', 'Windows phone'];
  selectedDevice?: string;

  opsystems = ['Windows', 'Linux', 'Android', 'MacOS', 'iOS', 'iPadOS'];
  selectedOpSystem?: string;

  statuses: any[] = [];

  @Input()
  issue: Issue | undefined;

  @Input()
  id: string | undefined;

  isNewIssue: boolean = true;

  newIssue: Issue = new Issue();

  projects: Project[] = [];

  constructor(private issueService: IssueService, private router:Router, private route: ActivatedRoute, private projSvc: ProjectService) { }

  ngOnInit(): void {
    if(!this.id) {
      this.route.params.subscribe(x=> this.id = x['id'])
    }
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

    
    this.statuses = Statuses.getValues();
    console.log(this.statuses);

    this.projSvc.getAll().subscribe(x=> this.projects = x);
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