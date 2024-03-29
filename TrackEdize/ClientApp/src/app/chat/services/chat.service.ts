import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as signalR from "@microsoft/signalr"
import { Observable, Subject } from 'rxjs';
import { AccountInfo } from 'src/app/common/models/AccountInfo';
import { AccountService } from 'src/app/services/account.service';
import { environment } from '../../../environments/environment';
import { MessageDto } from '../models/message-dto';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ChatService {

  private hubConnection?: signalR.HubConnection;
  private api: string = environment.apiUrl + '/chat';
  private sharedObj = new Subject<MessageDto>();

  constructor(private http: HttpClient, private jwtHelper : JwtHelperService) {
    this.startConnection();
    this.hubConnection?.onclose(this.reconect);
   }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(environment.apiUrl.replace('api','chat'), {
      accessTokenFactory: this.jwtHelper.tokenGetter
    }).configureLogging(signalR.LogLevel.Warning).build();
    this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => {console.log('Error while starting connection: ' + err); this.reconect(); });

    this.mapSendMessage();
  }

  public loadHistory() {
    return this.http.get<MessageDto[]>(this.api+"/history");
  }

  public broadcastMessage(msgDto: any) {
    this.http.post(this.api+"/", msgDto).subscribe(data => console.log(data));
  }

  private mapSendMessage = () => {
    if(!this.hubConnection) return;
    this.hubConnection.on('Send', (dto: MessageDto) => {
      this.sharedObj.next(dto);
    })
  }

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }

  private reconect() {
    setTimeout(this.startConnection, 1500);
  }
}
