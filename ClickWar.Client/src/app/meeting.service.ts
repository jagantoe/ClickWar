import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private hubConnection: HubConnection = new HubConnectionBuilder().withUrl('/hubs/meeting').build();

  constructor() {
    this.startConnection();
    this.addListeners();
  }

  private meetingStateSubject = new Subject<Meeting>();
  meetingState$ = this.meetingStateSubject.asObservable();

  private startConnection() {
    this.hubConnection.start()
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    this.hubConnection.on("GetMeetingState", (meeting) => {
      this.meetingStateSubject.next(meeting);
    });
  }

  joinMeeting(meetingId: number, role: number, device: number) {
    this.hubConnection.invoke("JoinMeeting", meetingId, role, device)
      .catch((err) => console.log('failed to join meeting: ' + err));
  }


  addText(text: string) {
    this.hubConnection.invoke("AddText", text)
      .catch((err) => console.log('failed to add text: ' + err));
  }
}

interface Meeting {
  id: number;
  text: string;
}

