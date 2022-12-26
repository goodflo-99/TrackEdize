import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaAutoresizeDirective } from './textarea-autoresize/textarea-autoresize.directive';
import { FilterComponent } from './filter/filter.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { MdbFormControlComponent, MdbFormsModule } from 'mdb-angular-ui-kit/forms';



@NgModule({
  declarations: [TextareaAutoresizeDirective, FilterComponent],
  imports: [
    CommonModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    MdbFormsModule
  ],
  exports: [
    TextareaAutoresizeDirective,
    FilterComponent
  ]
})
export class SharedModule { }
