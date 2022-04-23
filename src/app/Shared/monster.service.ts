import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { Monster } from '../model/monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
 
  constructor(private http: HttpClient) {}

  
  findAll(): Observable<Monster[]>{
    
    return this.http.get<Monster[]>("http://localhost:8080/monster/list");

  }

  findById(id: number):Observable<Monster>{

    return this.http.get<Monster>("http://localhost:8080/monster/"+id+"/get");

  }

  delete(id: number){

    console.log("Trying to delete "+ id);

  }

}
