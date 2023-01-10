import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-message-float',
  templateUrl: './message-float.component.html',
  styleUrls: ['./message-float.component.scss']
})
export class MessageFloatComponent implements OnInit {
  chatSide: any;
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

}
