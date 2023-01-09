import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import {Message} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  msgs: Message[] = [];

  constructor(private projectService: ProjectService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getAll().subscribe(res => {
      this.projects = res;
    })
  }

  addProject() {
    this.router.navigate(['/projects/edit-project']);
  }

  editProject(id: string | undefined) {
    this.router.navigate(['/projects/edit-project', id]);
  }

  private deleteProject(id: string | undefined) {
    if(id) {
      this.projectService.delete(id).subscribe(() => {
        this.getProjects();
      });
    }
  }

  showConfirm(id: string | undefined) {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Confirmation',
      detail: 'Are you sure that you want to delete this project?',
      closable: false,
      data: id,
    });
  }

  onConfirm(id: string | undefined) {
    this.messageService.clear('c');
    this.deleteProject(id);
    this.messageService.add({key: 'msgs', severity:'success', summary:'Confirmed', detail:'Project deleted'});
  }

  onReject() {
    this.messageService.clear('c');
    this.messageService.add({key: 'msgs', severity:'info', summary:'Rejected', detail:'You have rejected'});
  }

}
