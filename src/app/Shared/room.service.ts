import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../model/room';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }


  findAll(): Observable<Room[]>{
    
    console.log("called FindAll service")
    return this.http.get<Room[]>("http://localhost:8080/room/list");
    
  }

  findById(id: number):Observable<Room>{

    return this.http.get<Room>("http://localhost:8080/room/"+id+"/get");

  }

  delete(id: number): Observable<number> {

    return this.http.get<number>("http://localhost:8080/room/"+id+"/delete")

  }

  save(room: Room): Observable<Room>{

    return this.http.post<Room>("http://localhost:8080/room/save",room);

  }
}
