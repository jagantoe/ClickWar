import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MaterialModules } from './material.modules';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { GameGuard } from './game.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent
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
