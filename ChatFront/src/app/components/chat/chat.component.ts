import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import { ChatService } from '../../services/chat.service';
import { isArray } from 'util';
import { ChatMessage } from '../../models/chatMessage';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';
import { SocketIOService } from '../../services/socketio.service';
import { isDefined } from '@angular/compiler/src/util';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public searchText: String;
  public users;
  public conversation;
  public selectedUser;
  private msgSub: Subscription;
  private onlineuserSub: Subscription;
  private offlineuserSub: Subscription;
  public currentUser;
  public messageContent: String;

  constructor( private chatService: ChatService, private socketIoService: SocketIOService, private authService: AuthService, private router: Router) {
    this.currentUser = authService.getUserInfo();
  }

  /**
   * @author mgharib
   * Used for registering some logic after view check
   */
  ngAfterViewChecked() {
    // used for setting the message history scroll all the way dowm 
    //REF:https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style/45367387
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
    this.initIoConnection();
    this.loadChatScreenData();
  }

  /**
   * @author mgharib
   * destroy all subscription that may cause memoty leak
   */
  ngOnDestroy() {
    // this.socketIoService.goOffline();
    if (this.msgSub)
      this.msgSub.unsubscribe();
    if (this.onlineuserSub)
      this.onlineuserSub.unsubscribe();
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
        this.setupOnlineUserSubscribtion();
        // this.setupOfflineUserSubscribtion();
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
  private loadConversation() {
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
    this.setupMessageSubscribtion();
    this.socketIoService.goOnline();
  }

  /**
   * @author mgharib
   * @param message 
   * 
   * update unreaded
   */
  private updateNotificationCount(message: ChatMessage): void {
    if (message['receiver'] === this.currentUser.userId && message['sender'] != this.selectedUser._id) {
      const userIndex = this.users.findIndex(x => x._id === message['sender']);
      if (this.users[userIndex].notificationCount) {
        this.users[userIndex].notificationCount++;
      } else {
        this.users[userIndex].notificationCount = 1;
      }
    }

  }

  /**
   * @author mgharib
   * Fires when clicking on a user from the chat screen left side part
   */
  selectUser = function (user) {
    delete user.notificationCount;
    this.selectedUser = user;
    this.loadConversation();
  }

  /**
   * @author mgharib
   * Used for constructing the ChatMessage and sending it to Socket IO server then reset messageContent
   */
  public sendMessage(): void {
    if (this.messageContent) {
      const cm = new ChatMessage(this.currentUser.userId, "" + this.selectedUser._id, this.currentUser.pref_lang, new Date(), this.messageContent);
      this.socketIoService.send(cm);
      this.messageContent = null;
      // this.socketIoService.goOffline();
    }
  }

  /**
  * @author mgharib
  * Used for establishing a subscribtion on onlineuser event
  */
  private setupOnlineUserSubscribtion() {
    this.onlineuserSub = this.socketIoService.onOnlineStatusChange()
      .pipe(filter((onlineStatus) => {
        // execlude events for currentUser
        return (onlineStatus && onlineStatus.userId && onlineStatus.userId !== this.currentUser.userId)
      }))
      .subscribe((onlineStatus) => {
        const userIndex = this.users.findIndex(x => x._id === onlineStatus.userId);
        if (isDefined(userIndex) && userIndex > -1 && this.users[userIndex])
          this.users[userIndex].online = onlineStatus.status;
      });
  }

  /**
   * @author mgharib
   * Used for establishing a subscribtion on message
   */
  private setupMessageSubscribtion() {
    // filter the subscription and push messages only related to the current logged in user and the selected one
    this.msgSub = this.socketIoService.onMessage()
      .pipe(filter((msg) => {
        return (msg['receiver'] === this.currentUser.userId || msg['sender'] === this.currentUser.userId)
      }))
      .subscribe((message: ChatMessage) => {
        if ((message['sender'] === this.selectedUser._id && message['receiver'] === this.currentUser.userId)
          || (message['receiver'] === this.selectedUser._id && message['sender'] === this.currentUser.userId)) {
          this.conversation.push(message);
        }
        if (message['receiver'] === this.currentUser.userId && message['sender'] !== this.selectedUser._id) {
          this.updateNotificationCount(message);
        }

      });
  }


  logout() {
    this.socketIoService.goOffline();
    window.localStorage.removeItem('token');

    this.router.navigate(['login']);

  }








}
