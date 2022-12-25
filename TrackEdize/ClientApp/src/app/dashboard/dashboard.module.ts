import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { ColumnComponent } from './column/column.component';



@NgModule({
  declarations: [
    DashboardComponent,
    IssueCardComponent,
    ColumnComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'dashboard', component: DashboardComponent},
      
    ]),
    CardModule
  ]
})
export class DashboardModule { }
