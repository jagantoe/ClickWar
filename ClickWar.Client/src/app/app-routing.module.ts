import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { GameGuard } from './game.guard';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { MeetingComponent } from './meeting/meeting.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    canActivate: [GameGuard],
    path: "battlefield",
    component: GameComponent
  },
  {
    path: "chatroom",
    component: ChatComponent
  },
  {
    path: "meeting",
    component: MeetingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
