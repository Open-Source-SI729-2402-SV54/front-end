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
    this.resourceEndPoint = '/schedule';
  }

  getScheduleByUserId(userId: number) : Observable<Schedule[]>{
    const filter = `?id=${userId}`;
    return this.http.get<Schedule[]>(`${this.resourcePath()}${filter}`, this.httpOptions);
  }

  updateSchedule(schedule: Schedule): Observable<Schedule>{
    return this.update(schedule.scheduleId, schedule);
  }
}
