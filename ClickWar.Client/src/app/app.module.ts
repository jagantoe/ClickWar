import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MaterialModules } from './material.modules';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { GameGuard } from './game.guard';
import { ChatComponent } from './chat/chat.component';
import { MeetingComponent } from './meeting/meeting.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    ChatComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModules
  ],
  providers: [GameGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
