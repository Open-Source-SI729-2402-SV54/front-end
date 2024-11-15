import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Notifications} from '../../model/notifications.entity';
import { AuthService } from '../../services/auth.service';
import {ScheduleMeals} from "../../model/schedule-meals.entity";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [
    MatLabel,
    MatCardTitle,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notifications[] = [];
  userId: number = 0;

  newSchedule = {
    breakfastTime: '',
    lunchTime: '',
    dinnerTime: ''
  };

  breakfastMeals: ScheduleMeals[] = [];
  lunchMeals: ScheduleMeals[] = [];
  dinnerMeals: ScheduleMeals[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = +this.authService.getUserId()!;
    if (this.userId) {
      this.notificationsService.getNotifications(this.userId).subscribe({
        next: (data) => {
          if (Array.isArray(data) && data.length > 0) {
            this.notifications = data;
            this.breakfastMeals = this.notifications[0].schedule.filter(meal => meal.typeMealId === 1);
            this.lunchMeals = this.notifications[0].schedule.filter(meal => meal.typeMealId === 2);
            this.dinnerMeals = this.notifications[0].schedule.filter(meal => meal.typeMealId === 3);
          } else {
            console.log('No hay notificaciones para este usuario.');
          }
        },
        error: (err) => {
          console.error('Error al obtener notificaciones', err);
        }
      });
    } else {
      console.error('No se ha encontrado el userId');
    }
  }

  saveSchedule(): void {
    const schedule = [
      { typeMealId: 1, hour: this.newSchedule.breakfastTime, status: 'inactive' },
      { typeMealId: 2, hour: this.newSchedule.lunchTime, status: 'inactive' },
      { typeMealId: 3, hour: this.newSchedule.dinnerTime, status: 'inactive' }
    ];

    // Busca si ya existe una notificación para el usuario
    const existingNotification = this.notifications.find(
      (notification) => notification.userId === this.userId
    );

    // Si existe una notificación, la actualizamos
    if (existingNotification) {
      existingNotification.schedule = schedule;
      this.notificationsService.updateNotificationStatus(existingNotification).subscribe({
        next: (data) => {
          console.log('Notificación actualizada', data);
          this.notifications = this.notifications.map((notification) =>
            notification.id === data.id ? data : notification
          );
        },
        error: (err) => {
          console.error('Error al actualizar notificación', err);
        }
      });
    } else {
      // Si no existe, creamos una nueva notificación
      const newNotification: Notifications = {
        id: this.notifications.length + 1, // Genera un ID nuevo si no existe
        userId: this.userId,
        email: 'example@gmail.com',
        schedule: schedule
      };

      this.notificationsService.createNotification(newNotification).subscribe({
        next: (data) => {
          console.log('Notificación guardada', data);
          this.notifications.push(data);
        },
        error: (err) => {
          console.error('Error al guardar notificación', err);
        }
      });
    }
  }
  toggleStatus(schedule: ScheduleMeals): void {
    schedule.status = schedule.status === 'active' ? 'inactive' : 'active';
  }

  getMealType(typeMealId: number): string {
    switch (typeMealId) {
      case 1: return 'Desayuno';
      case 2: return 'Almuerzo';
      case 3: return 'Cena';
      default: return 'Desconocido';
    }
  }
}
