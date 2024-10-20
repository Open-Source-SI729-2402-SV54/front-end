import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Profile } from "../../model/profile.entity";
import { ProfileService } from "../../services/profile.service";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatButton
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null; // Inicializa como null o como un nuevo objeto de tipo Profile
  profileId = '';

  constructor(private router: Router, private profileApi: ProfileService) {}

  ngOnInit(): void {
    this.profileApi.getAllProfiles().subscribe({
      next: (data) => {
        console.log('Datos de la API:', data);
        const userId = 1;
        this.profile = data.find(user => user.id === userId) || null;
        console.log(this.profile);
      },
      error: (err) => {
        console.error('Error al obtener el perfil', err);
      }
    });
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
    this.router.navigate(['home']);
  }
}
