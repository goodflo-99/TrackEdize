import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) { }

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

}
