import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Monster } from 'src/app/model/monster';
import { MonsterService } from 'src/app/Shared/monster.service';

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.css']
})
export class MonsterListComponent implements OnInit {

  monsters:Monster[] = [];
  design: boolean = false;

  constructor(private monsterService: MonsterService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    if(this.router.url == '/design/monster/create'){
      this.design = true;
    }

    this.loadMonsters()

    this.monsterService.updateSignal.subscribe(signal => this.loadMonsters());

  } 
  
  delete(id: number) {
    this.monsterService.delete(id).subscribe(a => this.loadMonsters())
  };

  loadMonsters(){
    this.monsterService.findAll().subscribe((received)=> {this.monsters = received});
    
  }

  add(monster:Monster){
    this.monsterService.sendMonster(monster)
  }

 

}
