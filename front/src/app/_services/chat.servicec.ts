import { Injectable } from "@angular/core";
import { Client, IMessage, Stomp, StompSubscription } from "@stomp/stompjs";
import { Observable, Subject } from "rxjs";
import { TokenService } from "./token.service";
import { io, Socket } from "socket.io-client";
import { IChatMessage } from "../_interfaces/chat";
import { HttpClient } from "@angular/common/http";



@Injectable({
    providedIn: 'root'
})

export class ChatService {

  private socket!: WebSocket;
  private listeners: ((msg: IChatMessage) => void)[] = [];
  private token = this.tokenService.getToken();
  url = "http://localhost:3002";

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  connect() {
    this.socket = new WebSocket(`ws://localhost:3002/ws/chat?token=${this.token}`);
    this.socket.onmessage = (e) => {
      const msg: IChatMessage = JSON.parse(e.data);
      this.listeners.forEach(fn => fn(msg));
    };
  }

  sendMessage(recipient: string, content: string) {
    const payload = JSON.stringify({ recipient, content });
    this.socket.send(payload);
  }

  onMessage(callback: (msg: IChatMessage) => void) {
    this.listeners.push(callback);
  }

  disconnect() {
    this.socket?.close();
  }

  parseJwt(): string {
    const payload = this.token!.split('.')[1];
    console.log(JSON.parse(atob(payload)));
    return JSON.parse(atob(payload)).sub;
  }

  getMessagesBetween(user1: string, user2: string): Observable<IChatMessage[]> {
    return this.http.get<IChatMessage[]>(`${this.url}/api/chat/messages?sender=${user1}&recipient=${user2}`);
  }
}