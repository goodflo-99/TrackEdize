import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectService } from './services/project.service';
import { RouterModule } from '@angular/router';
import { MdbFormControlComponent, MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  providers: [ProjectService],
  declarations: [
    EditProjectComponent,
    ProjectsComponent    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/edit-project', component: EditProjectComponent},
      { path: 'projects/edit-project/:id', component: EditProjectComponent, }
    ]),
    MdbFormsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProjectModule { }
