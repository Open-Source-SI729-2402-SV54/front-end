import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { Profile } from "../../model/profile.entity";
import { ProfileService } from "../../services/profile.service";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatButton,
    RouterLink
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null; // Inicializa como null o como un nuevo objeto de tipo Profile
  profileId = '';

  constructor(private router: Router, private profileApi: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId(); // Asegúrate de que esta línea esté correcta.
    if (userId) { // Verifica que el userId no sea null
      this.profileApi.getAllProfiles().subscribe({
        next: (data) => {
          console.log('Datos de la API:', data);
          // Asegúrate de convertir userId a número para la comparación
          this.profile = data.find(user => user.id === Number(userId)) || null;
          console.log(this.profile);
          if (!this.profile) {
            console.error('Perfil no encontrado para el usuario', userId);
            this.router.navigate(['sign-in']); // Redirige si no se encuentra el perfil
          }
        },
        error: (err) => {
          console.error('Error al obtener el perfil', err);
          this.router.navigate(['sign-in']); // Redirige en caso de error
        }
      });
    } else {
      console.error('Usuario no autenticado, redirigiendo a inicio de sesión');
      this.router.navigate(['sign-in']); // Redirige si no hay ID de usuario
    }
  }

  navigateToSupport() {
    this.router.navigate(['support']);
  }

  navigateToNotifications() {
    this.router.navigate(['notifications']);
  }

  navigateToSchedule() {
    this.router.navigate(['schedule']);
  }

  navigateToLogOut() {
    this.authService.logOut();
    this.router.navigate(['sign-in']);
  }
}
