import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
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

  private gameStateSubject = new Subject<GameState>();
  gameState$ = this.gameStateSubject.asObservable();


  private startConnection() {
    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    this.hubConnection.on("GetReady", () => {
      console.log("You have joined the battle");
      this.router.navigate(["/game"]);
    })
    this.hubConnection.on("GetGameState", (gameState) => {
      console.log("Game state", gameState)
      this.gameStateSubject.next(gameState);
    })
    this.hubConnection.on("GameOver", _ => {
      console.log("Game is over.", _)
    })
  }

  joinTeam(name: string, team: string) {
    this.hubConnection.invoke("JoinTeam", name, team)
      .then(() => { console.log('join team success'); })
      .catch((err) => console.log('failed to join team: ' + err));
  }

  attack() {
    this.hubConnection.invoke("Attack")
      .then(() => { console.log('attack success'); })
      .catch((err) => console.log('attack failed: ' + err));
  }
}
