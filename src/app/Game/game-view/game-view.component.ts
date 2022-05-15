import { MonsterService } from 'src/app/Shared/monster.service';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/Shared/room.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Player } from 'src/app/model/player';
import { Monster } from 'src/app/model/monster';
import { PlayerService } from 'src/app/Shared/player.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {

  player: Player = new Player(0, "", "", 0, 0, 0, 0, "", "", 0, 0);
  room: Room = new Room(-1,"");

  monsterHitpoints: number | undefined = 0;
  playerHitpoints: number = 0;

  constructor(private roomService: RoomService,private playerService: PlayerService) { }

  ngOnInit(): void {

    this.playerService.findById(30).subscribe(player => {
      this.player = player
      this.roomService.findById(player.location.id).subscribe(room => {
      this.room = room
      this.monsterHitpoints = room.monster?.hitpoints
      this.playerHitpoints = player.hitpoints;

    })

    });
    
  }

}
