import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { Subject } from 'rxjs';
import { GameState } from './interfaces/gamestate';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: HubConnection = new HubConnectionBuilder().withUrl('/game').build();

  constructor(private router: Router) {
    this.startConnection();
    this.addListeners();
  }

  getConnectionid() {
    return this.hubConnection.connectionId;
  }

  private gameStateSubject = new Subject<GameState>();
  gameState$ = this.gameStateSubject.asObservable();

  private startConnection() {
    this.hubConnection.start()
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    this.hubConnection.on("GetReady", () => {
      this.router.navigate(["/battlefield"]);
    });
    this.hubConnection.on("GetGameState", (gameState) => {
      this.gameStateSubject.next(gameState);
    });
  }

  joinTeam(name: string, team: string) {
    this.hubConnection.invoke("JoinTeam", name, team)
      .catch((err) => console.log('failed to join team: ' + err));
  }

  attack() {
    this.hubConnection.invoke("Attack")
      .catch((err) => console.log('attack failed: ' + err));
  }
}
