import { Injectable } from "@angular/core";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class ChatService {
    private client: Client;
    private messageSubject = new Subject<any>();
  
    constructor() {
      this.client = new Client({
        brokerURL: 'ws://localhost:3002/ws', // Raw WebSocket URL
        reconnectDelay: 5000,
        onConnect: () => {
          console.log('Connected!');
          this.client.subscribe('/topic/messages', (msg: IMessage) => {
            const body = JSON.parse(msg.body);
            this.messageSubject.next(body);
          });
        },
        onStompError: (frame) => {
          console.error('STOMP error: ' + frame.body);
        }
      });
  
      this.client.activate(); // Connects automatically
    }
  
    sendMessage(sender: string, content: string) {
      const message = { sender, content, timestamp: '' };
  
      this.client.publish({
        destination: '/api/chat',
        body: JSON.stringify(message)
      });
    }
  
    getMessages() {
      return this.messageSubject.asObservable();
    }
}