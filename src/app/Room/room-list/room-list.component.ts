import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/Shared/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms:Room[] =  []
  design:boolean = false;
  constructor(private roomService: RoomService,private router: Router) { }
  

  ngOnInit(): void {

    if(this.router.url.includes('/design/room/')){
      this.design = true;
    }

    this.loadRooms()

    this.roomService.updateSignal.subscribe(signal => this.loadRooms())
  }

  delete(id: number){
    this.roomService.delete(id).subscribe( a => this.loadRooms())
  }

  loadRooms(){
    this.roomService.findAll().subscribe(received=> this.rooms = received)
  }

  add(room:Room){
    this.roomService.sendRoom(room)
  }
}
