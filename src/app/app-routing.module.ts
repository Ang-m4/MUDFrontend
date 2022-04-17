import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Admin/admin/admin.component';
import { DecoItemDesignComponent } from './DecorativeItem/deco-item-design/deco-item-design.component';
import { DesignComponent } from './Design/design/design.component';
import { HomeComponent } from './Home/home/home.component';
import { ItemDesignComponent } from './Item/item-design/item-design.component';
import { ItemShowComponent } from './Item/item-show/item-show.component';
import { MonsterDesignComponent } from './Monster/monster-design/monster-design.component';
import { MonsterShowComponent } from './Monster/monster-show/monster-show.component';
import { RoomDesignComponent } from './Room/room-design/room-design.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'design',
    component: DesignComponent,
    children: [
      {path:'monster',component: MonsterDesignComponent},
      {path:'item',component: ItemDesignComponent},
      {path:'decoItem',component: DecoItemDesignComponent},
      {path:'room',component: RoomDesignComponent},
    ]
  },

  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
