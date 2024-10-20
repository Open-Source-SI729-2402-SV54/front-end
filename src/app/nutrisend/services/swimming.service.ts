import { Injectable } from '@angular/core';
import { Meal} from "../model/meal.entity";
import {BaseService} from "../../shared/services/base.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class SwimmingService{
  private apiUrl= 'http://localhost:3000';
  constructor( private http: HttpClient) { }

  getBreakfast(): Observable<Meal[]>{
    return this.http.get<Meal[]>(`${this.apiUrl}/breakfast-swimming`);
  }
  getLunch(): Observable<Meal[]>{
    return this.http.get<Meal[]>(`${this.apiUrl}/lunch-swimming`);
  }
  getDinner(): Observable<Meal[]>{
    return this.http.get<Meal[]>(`${this.apiUrl}/dinner-swimming`);
  }
}
