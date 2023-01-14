import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageDto } from '../models/message-dto';
import { ChatService } from '../services/chat.service';
import { MessageService } from 'primeng/api';
import { AccountInfo } from 'src/app/common/models/AccountInfo';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'general-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService, MessageService]
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollContainer', { static: false }) scrollContainer?: ElementRef;
  accInfo: AccountInfo;

  constructor(private chatSvc: ChatService, private messageService: MessageService, accountSvc: AccountService) {
    this.accInfo = accountSvc.accountInfo;
    console.log(this.accInfo)
  }

  ngOnInit(): void {
    this.chatSvc.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); this.upd() });
    this.chatSvc.loadHistory().subscribe(messages => {
      this.msgInboxArray = messages;
      messages.filter(x=> {
        x.user == "First Last"
      });
    });
  }

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];
  update = true;

  send(): void {
    if (this.msgDto) {
      if (this.msgDto.msgText.length == 0) {
        this.messageService.add({ key: 'emptyInput', severity: 'error', summary: 'Text is required' });
        return;
      } else {
        this.chatSvc.broadcastMessage(this.msgDto);
        this.msgDto = new MessageDto;
      }
    }
  }

  addToInbox(obj: MessageDto) {
    

    let new1 = {...obj};
    this.msgInboxArray.push(new1);
  }

  upd() {
    setTimeout(() => this.update = false);
    setTimeout(() => this.update = true);
  }

}
