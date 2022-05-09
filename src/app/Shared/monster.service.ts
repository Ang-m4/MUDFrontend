import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, of, Subject } from 'rxjs';
import { Monster } from '../model/monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  private monsterSource = new BehaviorSubject<Monster>( new Monster(-1,"","",0,0,0,0,"",""))
  private upSignalSource = new BehaviorSubject<Boolean>(true);

  monsterSelected = this.monsterSource.asObservable()
  updateSignal = this.upSignalSource.asObservable()

  sendMonster(monster: Monster){
    this.monsterSource.next(monster);
  }

  updateList(){
    this.upSignalSource.next(true)
  }

  constructor(private http: HttpClient) {}

  findAll(): Observable<Monster[]>{
    
    return this.http.get<Monster[]>("http://localhost:8080/monster/list");

  }

  findById(id: number):Observable<Monster>{

    return this.http.get<Monster>("http://localhost:8080/monster/"+id+"/get");

  }

  delete(id: number): Observable<number> {

    return this.http.get<number>("http://localhost:8080/monster/"+id+"/delete")

  }

  save(monster: Monster): Observable<Monster>{

    return this.http.post<Monster>("http://localhost:8080/monster/save",monster);

  }
 
}
