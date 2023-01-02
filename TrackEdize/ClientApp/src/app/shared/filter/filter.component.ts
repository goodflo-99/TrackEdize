import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/project/models/project';
import { ProjectService } from 'src/app/project/services/project.service';
import { NavigationHelper } from '../helpers/navigation.helper';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  projects: Project[] = [];
  selectedProjects: string[] = [];
  selectedProject: string | undefined;

  projectTimeout: any;
  searchTimeout: any;

  search: string = "";

  @Output()
  projectChange = new EventEmitter<string[]>();

  @Output()
  searchChange = new EventEmitter<string>();

  constructor(private projectSvc: ProjectService, private nav: NavigationHelper) { }

  ngOnInit(): void {
    this.projectSvc.getAll().subscribe(x => this.projects = x);
  }

  projectsFilterChange(e: any) {
    if(this.projectTimeout) {
      clearTimeout(this.projectTimeout);
    }

    this.projectTimeout = setTimeout(() => this.emmitProjects(e.value), 2000);
  }

  projectFilterChange(e: any) {
    if(this.projectTimeout) {
      clearTimeout(this.projectTimeout);
    }

    this.projectTimeout = setTimeout(() => this.projectChange.emit(e.value), 500);
  }

  emmitProjects(values: string[]) {
    console.log("emmited: ", values)
    this.projectChange.emit(values);
  }

  searchFilterChange() {
    if(this.search.length < 3 && this.search.length > 0) return;

    if(this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    console.log("emmited: ", this.search)

    this.searchTimeout = setTimeout(() => this.searchChange.emit(this.search), 500);
  }

  clearSearch() {
    console.log("clear")
    this.search = "";
    this.searchFilterChange();
  }

  addNewIssue() {
    this.nav.toNewIssue();
  }

}
