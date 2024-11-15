import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';
import { Notifications } from '../model/notifications.entity';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends BaseService<Notifications> {
  constructor() {
    super();
    this.resourceEndPoint = '/notifications';
  }
  public getAllNotifications(): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(this.resourcePath(), this.httpOptions);
  }

  public getNotifications(userId: number): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(`${this.resourcePath()}/notifications?userId=${userId}`);
  }

  public getNotificationsByUserId(userId: number): Observable<Notifications> {
    return this.http.get<Notifications>(`${this.resourcePath()}/${userId}`, this.httpOptions);
  }

  public updateNotificationStatus(notification: Notifications): Observable<Notifications> {
    return this.http.put<Notifications>(`${this.resourcePath()}/${notification.id}`, notification, this.httpOptions);
  }

  public createNotification(notification: Notifications): Observable<Notifications> {
    return this.http.post<Notifications>(this.resourcePath(), notification, this.httpOptions);
  }

  public deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}/${id}`, this.httpOptions);
  }
}
