import { Component, Input, OnInit } from '@angular/core';
import { Statuses } from 'src/app/shared/constants/statuses';
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

  getHeaderColor(type: any) {
    switch(type) {
      case Statuses.Status.Open: return "open-header-color";
      case Statuses.Status.InProgress: return "in-progress-header-color";
      case Statuses.Status.ReadyForTesting: return "ready-for-testing-header-color";
      case Statuses.Status.Testing: return "testing-header-color";
      case Statuses.Status.Done: return "done-header-color";
      default: break;
    }
    return "";
  }

}
