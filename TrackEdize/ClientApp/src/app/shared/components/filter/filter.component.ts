import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Project } from 'src/app/project/models/project';
import { ProjectService } from 'src/app/project/services/project.service';
import { NavigationHelperService } from '../../helpers/navigation-helper.service';
import { Filter } from 'src/app/tracking/models/filter';
import { Sprint } from 'src/app/tracking/models/sprint';
import { SprintService } from 'src/app/tracking/services/sprint.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  projects: Project[] = [];
  selectedProject: string | undefined;

  dropdownTimeout: any;
  searchTimeout: any;

  search: string = "";

  sprints: Sprint[] = []

  filter: Filter = new Filter();

  @Output()
  filterChange = new EventEmitter<Filter>();

  @Input() isIssue = true;

  constructor(private projectSvc: ProjectService, private sprintSvc: SprintService, private nav: NavigationHelperService) { }

  ngOnInit(): void {
    this.projectSvc.getAll().subscribe(x => this.projects = x);
  }

  projectFilterChange(e: any) {
    if(this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }

    if(this.filter.projectId) {
      this.sprintSvc.getByProjectId(this.filter.projectId).subscribe(x=> {
        this.sprints = x;
        this.dropdownTimeout = setTimeout(() => this.filterChange.emit(this.filter), 500);
      })
    }

  }

  searchFilterChange() {
    if(this.search.length < 3 && this.search.length > 0) return;

    if(this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    console.log("emmited: ", this.search)

    this.searchTimeout = setTimeout(() => this.filterChange.emit(this.filter), 500);
  }

  clearSearch() {
    this.filter.searchString = "";
    this.searchFilterChange();
  }

  addNewIssue() {
    this.nav.toNewIssue(this.selectedProject);
  }

  addNewSprint() {
    this.nav.toNewSprint(this.selectedProject);
  }

  sprintFilterChange(e: any) {
    if(this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }

    this.dropdownTimeout = setTimeout(() => this.filterChange.emit(this.filter), 500);
  }

}
