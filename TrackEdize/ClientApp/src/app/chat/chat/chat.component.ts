import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageDto } from '../models/message-dto';
import { ChatService } from '../services/chat.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'general-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService, MessageService]
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollContainer', {static: false}) scrollContainer?: ElementRef;

  constructor(private chatSvc: ChatService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.chatSvc.retrieveMappedObject().subscribe( (receivedObj: MessageDto) => { this.addToInbox(receivedObj); this.upd()});                                                     
  }

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];
  update = true;

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.msgText.length == 0){
        this.messageService.add({key: 'emptyInput', severity:'error', summary:'Text is required'});
        return;
      } else {
        this.chatSvc.broadcastMessage(this.msgDto);
        this.msgDto = new MessageDto;
      }
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);
    // document.getElementsByClassName("msg:last-child").scroll();
    this.scrollContainer?.nativeElement.scroll({
      //top: this.scrollContainer.nativeElement.scrollHeight,
      left: 0,
      bottom: 0,
      behavior: 'smooth'
    })
  }

  upd() {
    setTimeout(() => this.update = false);
    setTimeout(() => this.update = true);
  }

}
