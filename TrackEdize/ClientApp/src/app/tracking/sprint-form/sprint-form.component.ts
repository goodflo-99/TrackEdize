import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/project/models/project';
import { ProjectService } from 'src/app/project/services/project.service';
import { Sprint } from '../models/sprint';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { SprintService } from '../services/sprint.service';
import { NavigationHelperService } from 'src/app/shared/helpers/navigation-helper.service';
import { Constants } from 'src/app/common/constants/constants';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.scss']
})
export class SprintFormComponent implements OnInit, AfterViewInit {

  sprintForm: FormGroup = new FormGroup({});
  projects: Project[] = [];
  isNewIssue: boolean = true;
  _newSprint: Sprint = new Sprint();
  viewMode = false;
  statuses = Constants.sprintStatuses; 
  startDate?: Date
  endDate?: Date

  @Input() id?: string;
  @Input() projectId?: string;

  constructor(private fb: FormBuilder, 
    private projSvc: ProjectService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private sprintSvc: SprintService,
    private nav: NavigationHelperService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initForm();
    this.getProjects();

    if (!this.id) {
      this.handleParams();
      this.newSprint.status = this.statuses[0];

      if(this.projectId) {
        this.updateTitle();
      }
    }
  }

  get newSprint() {
    return this._newSprint;
  }

  set newSprint(value : Sprint) {
    this._newSprint = value;
    if(value.startDate)
      this.startDate = new Date(value.startDate);
    if(value.endDate)
      this.endDate = new Date(value.endDate);
  }

  ngAfterViewInit() {
    if (this.id) {
      this.isNewIssue = false;
      this.getSprint(this.id);
      this.disableForm();
    }
  }

  initForm() {
    this.sprintForm = this.fb.group({
      projectId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      desciption: null,
    });
  }

  getProjects() {
    this.projSvc.getAll().subscribe(projects => {
      this.projects = projects;

      if(this.isNewIssue && this.projectId && this.projectId.length > 0) {
        this.newSprint.projectId = this.projectId;
        this.updateTitle();
      }
    });
  }

  delete(id?: string) {
    if(id) {
      this.sprintSvc.delete(id).subscribe(x=> {
        this.nav.back();
      })
    }    
  }

  enableForm() {
    this.viewMode = false;
  }

  disableForm() {
    this.viewMode = true;
  }

  saveDates() {
    if(this.isNewIssue) return;
    this.save();
  }

  save() {
    this.newSprint.endDate = this.endDate;
    this.newSprint.startDate = this.startDate;
    if (this.id || this.newSprint.id) {
      this.sprintSvc.update(this.newSprint).subscribe(x => {
        this.newSprint = x
      });
    } else {
      this.sprintSvc.add(this.newSprint).subscribe(x => {
        this.isNewIssue = false;
        this.newSprint = x;
      });
    }

    this.disableForm();
  }

  reset() {
    this.newSprint = new Sprint();
  }

  showDeleteIssueDialog() {
    this.messageService.clear();
    this.messageService.add({
      key: 'sprint',
      sticky: true,
      severity: 'warn',
      summary: 'Confirmation',
      detail: 'Are you sure that you want to delete this sprint?',
      closable: false,
      data: this.newSprint.id,
    });
  }

  handleParams() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.projectId = params['projectId']

      if(this.projectId && !this.sprintForm.get('projectId')?.value) {
        this.sprintForm.patchValue({projectId: this.projectId })
      }
    })
  }

  updateTitle() {
    if (!this.id && this.sprintForm.get('projectId')?.value) {
      const project = this.sprintForm.get('projectId')?.value;
      this.sprintSvc.getOrderByProject(project).subscribe(x => {
        this.newSprint.title = `${this.projects.find(x=> x.id == this.sprintForm.get('projectId')?.value)?.name} sprint ${x + 1}`;
      })
    }
  }

  getSprint(id: string) {
    this.sprintSvc.getById(id).subscribe(x=> {
      this.newSprint = x;
      this.cd.detectChanges();
    })
  }

}
