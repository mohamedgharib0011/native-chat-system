/*
 * @Author: mgharib 
 * @Date: 2018-06-19 00:00:18 
 * @Last Modified time: 2018-06-19 00:00:18 
 *  User for integration with Socket IO server
 * https://medium.com/dailyjs/real-time-apps-with-typescript-integrating-web-sockets-node-angular-e2b57cbd1ec1 
 */


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chatMessage';
import * as socketIo from 'socket.io-client';
import { Event } from '../models/event';
import { AuthService } from './auth.service';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {
  private socket;
  constructor(private authService:AuthService) {

  }


  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: ChatMessage): void {
    this.socket.emit('message', message);
  }

  public goOnline(): void {
    const currentUser = this.authService.getUserInfo();
    this.socket.emit('onlinestatus', {userId:currentUser['userId'], status:true});
  }

  public goOffline(): void {
    const currentUser = this.authService.getUserInfo();
    this.socket.emit('onlinestatus', {userId:currentUser['userId'], status:false});
  }

  public onOnlineStatusChange(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('onlinestatus', (data: any) => observer.next(data));
    });
  }

  public onMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
      this.socket.on('message', (data: ChatMessage) => observer.next(data));
    });
  }

  // public onOffline(): Observable<String> {
  //   return new Observable<String>(observer => {
  //     this.socket.on('offlineuser', (data: String) => observer.next(data));
  //   });
  // }

  // public onEvent(event: Event): Observable<any> {
  //   return new Observable<Event>(observer => {
  //     this.socket.on(event, () => observer.next());
  //   });
  // }
}
