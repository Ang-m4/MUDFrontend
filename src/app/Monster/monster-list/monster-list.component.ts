import { Component, OnInit } from '@angular/core';
import { Monster } from 'src/app/model/monster';
import { MonsterService } from 'src/app/Shared/monster.service';

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.css']
})
export class MonsterListComponent implements OnInit {

  monsters:Monster[] = [];
  constructor(private monsterService: MonsterService) { }

  ngOnInit(): void {

    this.monsterService.findAll().subscribe((received)=> {this.monsters = received});
  } 

  delete(id: number) {

    this.ngOnInit()
    this.monsterService.delete(id).subscribe()
    this.ngOnInit()
  };

}
