import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { GanttComponent } from './gantt/gantt.component';


@NgModule({
  declarations: [
    GanttComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ]
})
export class ReportingModule { }
