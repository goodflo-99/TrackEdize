import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaAutoresizeDirective } from './textarea-autoresize/textarea-autoresize.directive';



@NgModule({
  declarations: [TextareaAutoresizeDirective],
  imports: [
    CommonModule
  ],
  exports: [
    TextareaAutoresizeDirective
  ]
})
export class SharedModule { }
