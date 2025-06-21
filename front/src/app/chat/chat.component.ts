import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.servicec';
import { IChatMessage } from '../_interfaces/chat';
import { UserService } from '../_services/user.service';
import { IUser } from '../_interfaces/users';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnDestroy{
    defaultUser: string = 'support@chat.com';
    selectedUser: string = ''; // the user we're chatting with
    message = '';
    messages: IChatMessage[] = [];
    currentUser!: IUser;
    users: IUser[] = [];
  
    constructor(private chatService: ChatService, private userService: UserService) {}
  
    ngOnInit(): void {
      this.userService.getCurrentUser().subscribe({
        next: (res) => {
          this.currentUser = res
          this.loadMessagesWith(this.selectedUser);
        },
      });
      
      this.chatService.connect();
  
      this.chatService.onMessage((msg) => {
        this.loadMessagesWith(this.selectedUser)
        if (
          (msg.sender === this.currentUser.email && msg.recipient === this.selectedUser) ||
          (msg.sender === this.selectedUser && msg.recipient === this.currentUser.email)
        ) {
          this.messages.push(msg);
        }
      });
  
      this.userService.getAllUsers().subscribe({
        next: (res) => this.users = res,
      });
    }
  
    send() {
      if (!this.message) return;
      if(this.currentUser.email == this.defaultUser) {
        this.chatService.sendMessage(this.selectedUser, this.message);
      } else {
        this.chatService.sendMessage(this.defaultUser, this.message);
      }
      this.message = '';
    }
  
    loadMessagesWith(user: string) {
      if ( this.currentUser.email != this.defaultUser) {
        this.selectedUser = user;
        this.chatService.getMessagesBetween(this.currentUser.email, this.defaultUser).subscribe({
          next: (msgs) => this.messages = msgs
        });
      } else {
        this.selectedUser = user;
        this.chatService.getMessagesBetween(this.currentUser.email, this.selectedUser).subscribe({
          next: (msgs) => this.messages = msgs
        });
      }
    }
  
    ngOnDestroy(): void {
      this.chatService.disconnect();
    }
}