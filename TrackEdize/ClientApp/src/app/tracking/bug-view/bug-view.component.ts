import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.scss']
})
export class BugViewComponent implements OnInit {

  environments = ['Development', 'Staging', 'Production'];
  selectedEnvironment?: string;

  browsers = ['Chrome', 'Safari', 'Opera', 'Firefox', 'Edge'];
  selectedBrowser?: string;

  devices = ['PC/Laptop', 'MacBook', 'Android phone', 'iPhone', 'Android tablet', 'iPad', 'Windows phone'];
  selectedDevice?: string;

  opsystems = ['Windows', 'Linux', 'Android', 'MacOS', 'iOS', 'iPadOS'];
  selectedOpSystem?: string;

  constructor() { }

  ngOnInit(): void {
  }

}