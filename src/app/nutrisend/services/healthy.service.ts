import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { Healthy } from "../model/healthy.entity";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HealthyService extends BaseService<Healthy> {
  constructor() {
    super();
    this.resourceEndPoint = '/healthy';
  }

  public getAllHealthies(): Observable<Healthy[]> {
    return this.http.get<Healthy[]>(this.resourcePath(), this.httpOptions);
  }
}
