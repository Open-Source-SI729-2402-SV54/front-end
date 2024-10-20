import { Injectable } from '@angular/core';
import { FoodFit } from '../model/food-fit.entity';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodFitService extends BaseService<FoodFit> {
  constructor() {
    super();
    this.resourceEndPoint = '/food-fit';
  }

  public getAllFoodFities(): Observable<FoodFit[]> {
    return this.http.get<FoodFit[]>(this.resourcePath(), this.httpOptions);
  }
}

