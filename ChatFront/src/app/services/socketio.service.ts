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

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {
  private socket;
  constructor() {

  }


  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: ChatMessage): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
      this.socket.on('message', (data: ChatMessage) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
