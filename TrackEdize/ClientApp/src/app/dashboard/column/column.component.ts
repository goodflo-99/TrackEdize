import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/tracking/models/issue';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  @Input()
  issues: Issue[] = [];

  @Input()
  header: string | undefined;


  constructor() { }

  ngOnInit(): void {
  }

}
