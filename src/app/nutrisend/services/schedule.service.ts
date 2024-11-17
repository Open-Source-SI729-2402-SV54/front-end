import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Schedule} from "../model/schedule.entity";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends BaseService<Schedule> {
  constructor() {
    super();
    this.resourceEndPoint = '/schedules';
  }

  public getByUserId(userId: number): Observable<Schedule[]> {
    const filter = `?userId=${userId}`;
    return this.http.get<Schedule[]>(`${this.resourcePath()}${filter}`, this.httpOptions);
  }

  public createSchedule(schedule: Schedule): Observable<Schedule> {
    return this.create(schedule);
  }

  public updateSchedule(id: number, schedule: Schedule): Observable<Schedule> {
    return this.update(id, schedule);
  }

  public deleteSchedule(id: number): Observable<any> {
    return this.delete(id, null);
  }
}
