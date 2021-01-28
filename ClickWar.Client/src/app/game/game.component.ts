import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { SignalrService } from '../signalr.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {

  constructor(private signalrService: SignalrService) { }

  gameState$ = this.signalrService.gameState$.pipe(
    map(state => ({
      redCastle: state.redCastle,
      redFighters: state.fighters.filter(fighter => fighter.team == "red"),
      blueCastle: state.blueCastle,
      blueFighters: state.fighters.filter(fighter => fighter.team == "blue")
    }))
  )

  ngOnInit(): void {
  }

  attack() {
    this.signalrService.attack();
  }
}
