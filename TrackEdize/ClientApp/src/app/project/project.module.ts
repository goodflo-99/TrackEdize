import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectService } from './services/project.service';
import { RouterModule } from '@angular/router';
import { MdbFormControlComponent, MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthGuard } from '../common/guards/auth.guard';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

@NgModule({
  providers: [ProjectService],
  declarations: [
    EditProjectComponent,
    ProjectsComponent    
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    MessagesModule,
    MessageModule,
    RouterModule.forChild([
      { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'projects/edit-project', component: EditProjectComponent, canActivate: [AuthGuard]},
      { path: 'projects/edit-project/:id', component: EditProjectComponent, canActivate: [AuthGuard] }
    ]),
    MdbFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
})
export class ProjectModule { }
