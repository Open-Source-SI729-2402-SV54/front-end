import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Profile} from "../../model/profile.entity";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatLabel,
    MatFormField,
    MatDialogContent,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.css'
})
export class EditProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile,
    private profileService: ProfileService
  ) {}
  onSave(): void {
    this.profileService.updateProfile(this.data).subscribe({
      next: () => {
        this.dialogRef.close(this.data);
      },
      error: (err) => {
        console.error('Error al actualizar el perfil', err);
      }
    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
