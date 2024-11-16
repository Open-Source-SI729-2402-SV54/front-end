import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { Observable } from "rxjs";
import {Meals} from "../model/meals.entity";

@Injectable({
  providedIn: 'root'
})
export class HealthyService extends BaseService<Meals> {
  constructor() {
    super();
    this.resourceEndPoint = '/meals';
  }

  public getAllHealthies(): Observable<Meals[]> {
    return this.http.get<Meals[]>(this.resourcePath(), this.httpOptions);
  }
  public getById(id: number): Observable<Meals[]> {
    return this.http.get<Meals[]>(`${this.resourcePath()}/${id}`, this.httpOptions);
  }
}
