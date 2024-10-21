import { Injectable } from '@angular/core';
import { ExerciseFit } from '../model/exercise-fit.entity';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseFitService extends BaseService<ExerciseFit> {
  constructor() {
    super();
    this.resourceEndPoint = '/exercise-fit';
  }

  public getAllExerciseFities(): Observable<ExerciseFit[]> {
    return this.http.get<ExerciseFit[]>(this.resourcePath(), this.httpOptions);
  }
}
