/*
 * @Author: mgharib 
 * @Date: 2018-06-19 00:00:18 
 * @Last Modified time: 2018-06-19 00:00:18 
 * socket io reference : https://medium.com/dailyjs/real-time-apps-with-typescript-integrating-web-sockets-node-angular-e2b57cbd1ec1 
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chatMessage';
import * as socketIo from 'socket.io-client';
import { Event } from '../models/event';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket;
  constructor(private http: HttpClient) {

  }

  /**
   * @author mgharib
   * @param searchText
   * Used for searching user(email and name)
   */
  searchUsers = function (searchText: String) {
    return this.http.post("http://localhost:3000/api/users/search", { searchText: searchText });
  }

  /**
   * @author mgharib
   * Used for listing all users except the current logged in user to be displayed in the left side part of chat screen
   */
  allExceptCurrent = function () {
    return this.http.get("http://localhost:3000/api/users/allexceptcurrent");
  }

  /**
   * @author mgharib
   * @param userId
   * Used for listing the conversation between the current logged in user and the selected one 
   */
  getConversation = function (userId: Number) {
    return this.http.get("http://localhost:3000/api/chats/conversation/" + userId);
  }

}
