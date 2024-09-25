import { Injectable } from '@angular/core';
import { Exercise } from "../model/exercise.entity";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ExercisefitService {
  private apiUrl = 'https://my-json-server.typicode.com/FatimaAP05/dbserver';

  constructor(private http: HttpClient) { }

  getExercisefit(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/exercise-fit`);
  }

}

