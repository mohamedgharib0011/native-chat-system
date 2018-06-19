import { Component, OnInit, OnDestroy } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { ChatService } from '../../services/chat.service';
import { isArray } from 'util';
import { ChatMessage } from '../../models/chatMessage';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';
import { SocketIOService } from '../../services/socketio.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public searchText: String;
  public users;
  public conversation;
  public selectedUser;
  private ioConnection;
  private currentUser;
  public messageContent: String;

  constructor(private titleService: Title, private chatService: ChatService, private socketIoService: SocketIOService, private authService: AuthService) {
    this.currentUser = authService.getUserInfo();
    this.titleService.setTitle("Chat");
  }

  ngOnInit() {
    this.initIoConnection();
    this.loadChatScreenData();
  }

  /**
   * @author mgharib
   * Used for loading the users and the conversation between the current logged in user and the selected one (first by default)
   */
  loadChatScreenData() {
    this.chatService.allExceptCurrent().subscribe((users) => {
      if (users && isArray(users) && users.length > 0) {
        this.users = users;
        this.selectedUser = users[0];
        this.loadConversation();
      } else {
        this.users = [];
      }

    });
  }

  /**
   * @author mgharib
   * Used for loading the conversation between the current logged in user and the selected one
   */
  private loadConversation(){
    this.chatService.getConversation(this.selectedUser._id).subscribe((conversation) => {
      this.conversation = conversation && isArray(conversation) ? conversation : [];
    });
  }



  /**
   * @author mgharib
   * Socket IO intializations (connection and subscription)
   */
  private initIoConnection(): void {
    this.socketIoService.initSocket();

    // filter the subscription and push messages only related to the current logged in user and the selected one
    this.ioConnection = this.socketIoService.onMessage()
      .pipe(filter((msg) => {
        return (msg['sender'] === this.currentUser.userId && msg['receiver'] === this.selectedUser._id) || (msg['receiver'] === this.currentUser.userId && msg['sender'] === this.selectedUser._id)
      }))
      .subscribe((message: ChatMessage) => {
        this.conversation.push(message);
      });

  }

  /**
   * @author mgharib
   * Fires when clicking on a user from the chat screen left side part
   */
  selectUser = function (user) {
    this.selectedUser = user;
    this.loadConversation();
  }

  /**
   * @author mgharib
   * Used for constructing the ChatMessage and sending it to Socket IO server then reset messageContent
   */
  public sendMessage(): void {
    if (!this.messageContent) {
      return;
    }

    const cm = new ChatMessage(this.currentUser.userId, "" + this.selectedUser._id, "en", new Date(), this.messageContent);

    this.socketIoService.send(cm);
    this.messageContent = null;
  }





}
