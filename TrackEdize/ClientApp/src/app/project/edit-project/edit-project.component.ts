import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit, OnChanges {

  @Input()
  id: string | undefined;

  project!: Project;

  wasChanges: boolean = false;

  constructor(private projectService:ProjectService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!this.id) {
      this.route.params.subscribe(x=> this.id = x['id'])
    }
    if(this.id) {
      this.projectService.getById(this.id).subscribe(res => this.project = res);
    } else {
      this.project = new Project;
      this.wasChanges = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.wasChanges = true;
  }

  save() {
    if(!this.wasChanges) {
      return this.close();
    }

    let req = this.id ? this.projectService.update(this.project) : this.projectService.add(this.project);

    req.subscribe(() => {
      this.close();
    });    
  }

  close() {
    this.router.navigate(['/projects'])
  }

}
