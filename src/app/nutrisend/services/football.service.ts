import { Injectable } from '@angular/core';
import { Meal} from "../model/meal.entity";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class FootballService{
  private apiUrl= 'http://localhost:3000';
  constructor( private http: HttpClient) { }

  getBreakfast(): Observable<Meal[]>{
    return this.http.get<Meal[]>(`${this.apiUrl}/breakfast-football`);
  }
  getLunch(): Observable<Meal[]>{
    return this.http.get<Meal[]>(`${this.apiUrl}/lunch-football`);
  }
  getDinner(): Observable<Meal[]>{
    return this.http.get<Meal[]>(`${this.apiUrl}/dinner-football`);
  }
}
