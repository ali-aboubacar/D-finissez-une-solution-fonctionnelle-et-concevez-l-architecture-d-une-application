import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.servicec';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
    messages: any[] = [];
    message = '';
    sender = 'User';
  
    constructor(private chatService: ChatService) {}
  
    ngOnInit() {
      this.chatService.getMessages().subscribe((msg) => this.messages.push(msg));
    }
  
    send() {
      this.chatService.sendMessage(this.sender, this.message);
      this.message = '';
    }
}