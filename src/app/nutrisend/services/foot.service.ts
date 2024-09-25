import { Injectable } from '@angular/core';
import { Food } from "../model/foot.entity";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'https://my-json-server.typicode.com/FatimaAP05/dbserver';

  constructor(private http: HttpClient) { }

  getFoodfit(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}/fitFoodItems`);
  }

  getAlmuerzos(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}/almuerzosItems`);
  }

}
