import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ConfirmationService]

})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router, private confirmationService: ConfirmationService) { }

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

  callDeletePopUp(id: string | undefined) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this project?",
      header: 'Confirmation',
      accept: () => {
        this.deleteProject(id);
      }
    })
  }

  private deleteProject(id: string | undefined) {
    if(id) {
      this.projectService.delete(id).subscribe(() => {
        this.getProjects();
      });
    }
  }

}
