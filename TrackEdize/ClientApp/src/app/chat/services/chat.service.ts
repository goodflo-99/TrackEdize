import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageDto } from '../models/message-dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection?: signalR.HubConnection;
  private api: string = environment.apiUrl + '/chat';
  private sharedObj = new Subject<MessageDto>();

  constructor(private http: HttpClient) {
    this.startConnection();
   }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(environment.apiUrl.replace('api','chat')).configureLogging(signalR.LogLevel.Trace).build();
    this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err));

    this.mapSendMessage();
  }

  public broadcastMessage(msgDto: any) {
    this.http.post(this.api+"/", msgDto).subscribe(data => console.log(data));
  }

  private mapSendMessage = () => {
    if(!this.hubConnection) return;
    this.hubConnection.on('Send', (user: string, message: string) => {
      let dto = new MessageDto();
      dto.user = user;
      dto.msgText = message;
      this.sharedObj.next(dto);
    })
  }

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }

}
