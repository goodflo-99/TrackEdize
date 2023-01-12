import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaAutoresizeDirective } from './textarea-autoresize/textarea-autoresize.directive';
import { FilterComponent } from './components/filter/filter.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { MdbFormControlComponent, MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import {InputTextModule} from 'primeng/inputtext';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [TextareaAutoresizeDirective, FilterComponent,DeleteConfirmDialogComponent],
  imports: [
    CommonModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    MdbFormsModule,
    InputTextModule,
    ToastModule,
    RippleModule,
    MessagesModule,
    MessageModule,
    ButtonModule
  ],
  exports: [
    TextareaAutoresizeDirective,
    FilterComponent,
    DeleteConfirmDialogComponent
  ]
})
export class SharedModule { }
