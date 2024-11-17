// app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor } from '@angular/material/button';
import { FooterComponent } from "./public/pages/footer/footer.component";
import { AuthService } from "./nutrisend/services/auth.service";
import {NgForOf, NgIf} from "@angular/common";
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatAnchor, RouterLink, FooterComponent, NgForOf, MatIconModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-end';

  // Opciones iniciales para no autenticados
  options = [
    { path: '/home', title: 'Home' },
    { path: '/sign-in', title: 'Sign In' },
    { path: '/sign-up', title: 'Sign Up' },
  ];

  navOptions: { path: string; title: string }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.updateNavOptions();
    console.log('navOptions después de la inicialización:', this.navOptions);
  }

  updateNavOptions(): void {
    const userId = this.authService.getUserId();
    const userPlan = this.authService.getUserPlan();
    console.log('ID de usuario:', userId);
    console.log('Plan de usuario:', userPlan);

    // Comienza con las opciones por defecto
    this.navOptions = [...this.options];

    if (userId) {
      // Agrega opciones basadas en el plan
      const additionalOptions: { path: string; title: string }[] = [];

      if (userPlan === 'premium') {
        additionalOptions.push(
          { path: '/order-premium', title: 'Order' },
          { path: '/plans', title: 'Plans' },
          { path: '/profile', title: 'Profile' }
        );
      } else if (userPlan === 'basic') {
        additionalOptions.push(
          { path: '/food-fit', title: 'Order' },
          { path: '/plans', title: 'Plans' },
          { path: '/profile', title: 'Profile' }
        );
      }

      // Actualiza las opciones de navegación
      this.navOptions = [
        ...this.options.filter(opt => opt.path !== '/sign-in' && opt.path !== '/sign-up'),
        ...additionalOptions
      ];

      console.log('navOptions actualizadas:', this.navOptions);
    }
  }
}
