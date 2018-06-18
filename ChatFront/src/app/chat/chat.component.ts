import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { ChatService } from '../Services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  searchText: String;
  constructor(private titleService: Title, private chatService: ChatService) {
    this.titleService.setTitle("Chat");
    this.chatService.searchUsers(this.searchText).subscribe((x) => {

    })

  }

  ngOnInit() {
  }

}
