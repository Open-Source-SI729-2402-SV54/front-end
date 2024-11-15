import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';
import { Notification } from '../model/notification.entity';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends BaseService<Notification> {
  constructor() {
    super();
    this.resourceEndPoint = '/notifications';
  }
  public getNotificationsByUserId(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.resourcePath()}//?userId=${userId}`, this.httpOptions);
  }
  public updateNotification(notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.resourcePath()}/${notification.id}`, notification, this.httpOptions);
  }

  public createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.resourcePath(), notification, this.httpOptions);
  }
}
