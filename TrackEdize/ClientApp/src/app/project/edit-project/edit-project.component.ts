import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  @Input()
  id: string | undefined;

  project: Project = new Project();

  projectForm: FormGroup = new FormGroup({});

  constructor(private projectService:ProjectService, private router:Router, private route: ActivatedRoute, private fb:FormBuilder) {
   }

  ngOnInit(): void {
    if(!this.id) {
      this.route.params.subscribe(x=> this.id = x['id'])
    }
    if(this.id) {
      this.projectService.getById(this.id).subscribe(res => this.project = res);
    } else {
      this.project = new Project;
    }

    this.initForm();
  }

  save() {
    if(this.projectForm.pristine) {
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

  generateAbbv() {
    if(!this.project.name) return;
    let abbv = "";
    const reg: RegExp = /[ -]/;
    const str = this.project.name.split(reg);
    if(str.length == 1) {
      abbv = str[0].slice(0,3);
    } else {
      str.forEach(x=> {
        if(abbv.length >= 4) return;
        abbv += x[0];
      })
    }

    this.project.abbreviation = abbv.toUpperCase();
  }

  initForm() {
    this.projectForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      abbv: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      description: null
    })
  }

}
