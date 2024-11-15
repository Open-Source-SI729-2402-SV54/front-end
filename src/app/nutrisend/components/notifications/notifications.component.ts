import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { AuthService } from '../../services/auth.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {Notification} from "../../model/notification.entity";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

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
    NgIf,
    MatProgressSpinner
  ],
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.isLoading = true;
      this.notificationsService.getNotificationsByUserId(userId).subscribe({
        next: (data) => {
          console.log('Datos de la API:', data);
          if (Array.isArray(data) && data.length > 0) {
            this.notifications = data;
          } else {
            this.createDefaultNotifications(userId);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar las notificaciones:', err);
          this.isLoading = false;
          this.errorMessage = 'No se pudieron cargar las notificaciones. Intenta de nuevo más tarde.';
        }
      });
    } else {
      this.errorMessage = 'Usuario no autenticado. Por favor, inicia sesión.';
      this.router.navigate(['sign-in']);
    }
  }

  typeMeals = [
    { id: 1, name: 'Lunch' },
    { id: 2, name: 'Breakfast' },
    { id: 3, name: 'Dinner' }
  ];

  getMealName(typeID: number): string {
    const meal = this.typeMeals.find(m => m.id === typeID);
    return meal ? meal.name : 'Desconocido';
  }

  defaultNotifications: Notification[] = [
    { id: 0, userId: 0, email: "", message: 'It\'s time for your breakfast! Don\'t forget to check your meal plan.', timestamp: '08:00:00', typeID: 2, active: true },
    { id: 0, userId: 0, email: "", message: 'It\'s time for your lunch. Enjoy your meal!', timestamp: '12:00:00', typeID: 1, active: true },
    { id: 0, userId: 0, email: "", message: 'Don\'t forget your healthy dinner to finish the day.', timestamp: '19:00:00', typeID: 3, active: true }
  ];

  createDefaultNotifications(userId: string): void {
    const numericUserId = parseInt(userId, 10);
    const userEmail = this.authService.getUserEmail(); // Asegúrate de que este método exista.

    this.defaultNotifications.forEach((notification) => {
      notification.userId = numericUserId;
      notification.email = userEmail; // Asigna el email del usuario.
      this.notificationsService.createNotification(notification).subscribe({
        next: (newNotification) => {
          console.log('Notificación creada:', newNotification);
          this.notifications.push(newNotification);
        },
        error: (err) => console.error('Error al crear notificación:', err)
      });
    });
  }

  updateNotification(notification: Notification): void {
    this.notificationsService.updateNotification(notification).subscribe({
      next: (updatedNotification) => {
        console.log('Notificación actualizada:', updatedNotification);
      },
      error: (err) => console.error('Error al actualizar la notificación:', err)
    });
  }

  toggleNotification(notification: Notification): void {
    notification.active = !notification.active;
    this.updateNotification(notification);
  }
}
