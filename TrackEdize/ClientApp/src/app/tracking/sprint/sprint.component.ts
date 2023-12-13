import { Component, OnInit } from '@angular/core';
import { Sprint } from '../models/sprint';
import { SprintService } from '../services/sprint.service';
import { NavigationHelperService } from 'src/app/shared/helpers/navigation-helper.service';
import { Filter } from '../models/filter';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit {

  sprints: Sprint[] = [];
  constructor(private service: SprintService, private nav: NavigationHelperService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(x=> this.sprints = x);
  }

  edit(issue:Sprint){
    this.nav.navigateToSprint(issue.id);
  }

  delete(id:any) {

  }

  getAll() {
    this.service.getAll().subscribe(x=> this.sprints = x);
  }

  filter(filter: any) {
    if(!filter.projectId) {
      return this.getAll();
    }
    console.log("triggered from SprintComponent", filter.projectId)
    this.service.getByProjectId(filter.projectId).subscribe(x=>this.sprints = x);
  }

}
