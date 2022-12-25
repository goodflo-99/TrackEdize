import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/project/models/project';
import { ProjectService } from 'src/app/project/services/project.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  projects: Project[] = [];
  selectedProjects: string[] = [];

  timeout: any;

  @Output()
  projectChange = new EventEmitter<string[]>();

  constructor(private projectSvc: ProjectService) { }

  ngOnInit(): void {
    this.projectSvc.getAll().subscribe(x => this.projects = x);
  }

  projectFilterChange(e: any) {
    if(this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => this.emmitProjects(e.value), 2000);
  }

  emmitProjects(values: string[]) {
    console.log("emmited: ", values)
    this.projectChange.emit(values);
  }

}
