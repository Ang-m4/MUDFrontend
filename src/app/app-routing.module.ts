import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignComponent } from './Design/design/design.component';
import { GameViewComponent } from './Game/game-view/game-view.component';
import { HomeComponent } from './Home/home/home.component';
import { ItemCreateComponent } from './Item/item-create/item-create.component';
import { ItemDesignComponent } from './Item/item-design/item-design.component';
import { ItemShowComponent } from './Item/item-show/item-show.component';
import { MonsterCreateComponent } from './Monster/monster-create/monster-create.component';
import { MonsterDesignComponent } from './Monster/monster-design/monster-design.component';
import { MonsterShowComponent } from './Monster/monster-show/monster-show.component';
import { PlayerCreateComponent } from './Player/player-create/player-create.component';
import { PlayerDesignComponent } from './Player/player-design/player-design.component';
import { PlayerShowComponent } from './Player/player-show/player-show.component';
import { RoomCreateComponent } from './Room/room-create/room-create.component';
import { RoomDesignComponent } from './Room/room-design/room-design.component';
import { RoomShowComponent } from './Room/room-show/room-show.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'design', component: DesignComponent, children: [
      {
        path: 'monster', component: MonsterDesignComponent, children: [
          { path: 'show/:id', component: MonsterShowComponent },
          { path: 'create', component: MonsterCreateComponent }
        ]
      },
      {
        path: 'item', component: ItemDesignComponent, children: [
          { path: 'show/:id', component: ItemShowComponent },
          { path: 'create', component: ItemCreateComponent }
        ]
      },

      {
        path: 'room', component: RoomDesignComponent, children: [
          { path: 'show/:id', component: RoomShowComponent },
          { path: 'create', component: RoomCreateComponent }
        ]
      },
    ]
  },
  {
    path: 'admin', component: PlayerDesignComponent, children: [
      { path: 'show/:id', component: PlayerShowComponent },
      { path: 'create', component: PlayerCreateComponent }
    ]
  },
  {
    path: 'game', component: GameViewComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
