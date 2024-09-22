// availability.service.ts

import { Injectable } from '@angular/core';
import { Availability } from '../model/availability.entity';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService extends BaseService<Availability> {
  constructor() {
    super();
    this.resourceEndPoint = '/availability';
  }

  public getAllAvailabilities(): Observable<Availability[]> {
    return this.http.get<Availability[]>(this.resourcePath(), this.httpOptions);
  }
}
