import { Component, OnInit } from '@angular/core';
import { MessageDto } from '../models/message-dto';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'general-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

  constructor(private chatSvc: ChatService) { }

  ngOnInit(): void {
    this.chatSvc.retrieveMappedObject().subscribe( (receivedObj: MessageDto) => { this.addToInbox(receivedObj);});                                                     
  }

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.msgText.length == 0){
        window.alert("Text is required.");
        return;
      } else {
        this.chatSvc.broadcastMessage(this.msgDto);
      }
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);

  }

}
