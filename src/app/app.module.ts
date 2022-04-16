import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonsterShowComponent } from './Monster/monster-show/monster-show.component';
import { MonsterListComponent } from './Monster/monster-list/monster-list.component';
import { ItemShowComponent } from './Item/item-show/item-show.component';
import { PlayerShowComponent } from './Player/player-show/player-show.component';
import { PlayerListComponent } from './Player/player-list/player-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MonsterShowComponent,
    MonsterListComponent,
    ItemShowComponent,
    PlayerShowComponent,
    PlayerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
