import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Monster } from '../model/monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
 
  constructor() {}

  private monsterDB: {[key:number]: Monster} ={

    1: new Monster(1,"Molanisk","",0,0,0,0,"",""),
    2: new Monster(2,"Quack","",0,0,0,0,"",""),
    3: new Monster(3,"Getto","",0,0,0,0,"",""),
    4: new Monster(4,"Lucile","",0,0,0,0,"",""),
    5: new Monster(5,"Bob","",0,0,0,0,"",""),

  }

  findAll(): Observable<Monster[]>{
    
    console.log(Object.values(this.monsterDB));
    return of(Object.values(this.monsterDB));
  }

  findById(id: number):Monster{

    return this.monsterDB[id];

  }

  delete(id: number){

    console.log("Trying to delete "+ id);

  }

}
