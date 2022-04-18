import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Monster } from 'src/app/model/monster';
import { MonsterService } from 'src/app/Shared/monster.service';

@Component({
  selector: 'app-monster-show',
  templateUrl: './monster-show.component.html',
  styleUrls: ['./monster-show.component.css']
})
export class MonsterShowComponent implements OnInit {

  monster: Monster = new Monster(0,"","",0,0,0,0,"","");

  constructor(
    private monsterService: MonsterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {

      let id =  +params.get("id")!;
      this.monsterService.findById(id).subscribe((received)=>{

        console.log(received);
        this.monster = received;

      });

    });

  }

  delete(id: number){
    this.monsterService.delete(id);
  }

}
