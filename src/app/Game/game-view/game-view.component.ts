import { MonsterService } from 'src/app/Shared/monster.service';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/Shared/room.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {


  roomSelected: Room = new Room(-1,"");

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {

    if(this.roomSelected.id == -1){
      this.pickRoom()
    }

    console.log(this.roomSelected.name);

  }

  pickRoom(){

    this.roomService.findAll().subscribe(list => {
      this.roomSelected = list[this.getRandom(list.length)]
    });

  }

   getRandom(max: number){
    return Math.floor(Math.random() * Math.floor(max))
  }

}
