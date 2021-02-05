import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { shareReplay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: HubConnection = new HubConnectionBuilder().withUrl('/chat').build();

  constructor() {
    this.startConnection();
    this.addListeners();
  }

  private chatMessagesSubject = new Subject<ChatMessage[]>()
  chatMessages$ = this.chatMessagesSubject.asObservable().pipe(
    shareReplay(1)
  );

  private startConnection() {
    this.hubConnection.start()
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    this.hubConnection.on("AllMessages", (messages) => {
      this.chatMessagesSubject.next(messages);
    });
    this.hubConnection.on("NewMessage", (message) => {
      this.chatMessages$.pipe(
        take(1),
      ).subscribe({
        next: (messages) => this.chatMessagesSubject.next([...messages, message])
      });
    });
  }

  sendMessage(name: string, message: string) {
    this.hubConnection.invoke("Message", name, message)
      .catch((err) => console.log('failed to join team: ' + err));
  }
}

interface ChatMessage {
  name: string;
  message: string;
}