import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { RouterModule } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import {ToastModule} from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { ChatService } from './services/chat.service';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChipModule,
    MdbFormsModule,
    ToastModule,
    ScrollerModule,
    RouterModule.forChild([
      { path:'chat', component: ChatComponent}
    ])
  ],
  exports: [
    ChatComponent,
  ],
  providers:[ChatService]
})
export class ChatModule { }
