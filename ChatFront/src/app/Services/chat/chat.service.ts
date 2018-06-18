/*
 * @Author: mgharib 
 * @Date: 2018-06-19 00:00:18 
 * @Last Modified time: 2018-06-19 00:00:18 
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {

  }

  searchUsers = function (searchText: String) {
    return this.http.post("http://localhost:3000/api/users/search", { searchText: searchText });
  }
  getConversation = function (userId: Number) {
    return this.http.get("http://localhost:3000/api/chat/conversation/"+userId);
  }
}
