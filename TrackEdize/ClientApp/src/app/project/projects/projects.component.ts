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
  providers: [MessageService]

})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router, private messageService: MessageService) { }

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

  deleteProject(id: string | undefined) {
    if(id) {
      this.projectService.delete(id).subscribe(() => {
        this.getProjects();
      });
    }
  }

  showConfirm(id: string | undefined) {
    this.messageService.clear();
    this.messageService.add({
      key: 'project',
      sticky: true,
      severity: 'warn',
      summary: 'Confirmation',
      detail: 'Are you sure that you want to delete this project?',
      closable: false,
      data: id,
    });
  }

}
