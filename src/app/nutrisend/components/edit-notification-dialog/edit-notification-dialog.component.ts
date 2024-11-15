import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-edit-notification-dialog',
  standalone: true,
  imports: [],
  templateUrl: './edit-notification-dialog.component.html',
  styleUrl: './edit-notification-dialog.component.css'
})
export class EditNotificationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditNotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notification,
    private notificationService: NotificationsService
  ) {}

  onSave(): void {
    this.notificationService.updateNotification(this.data).subscribe({
      next: () => {
        this.dialogRef.close(this.data);
      },
      error: (err) => {
        console.error('Error al actualizar las notificaciones', err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
