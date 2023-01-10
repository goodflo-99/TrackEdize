import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { RouterModule } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChipModule,
    MdbFormsModule,
    RouterModule.forChild([
      { path:'chat', component: ChatComponent}
    ])
  ],
  exports: [
    ChatComponent,
  ]
})
export class ChatModule { }
