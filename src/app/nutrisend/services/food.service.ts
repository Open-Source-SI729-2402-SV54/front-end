import { Injectable } from '@angular/core';
import { Food } from '../model/food.entity';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService extends BaseService<Food> {
  constructor() {
    super();
    this.resourceEndPoint = '/food';
  }

  public getAllFoodies(): Observable<Food[]> {
    return this.http.get<Food[]>(this.resourcePath(), this.httpOptions);
  }
}
