// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { RouterModule } from '@angular/router'; // Importar RouterModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
  imports: [RouterModule]
})
export class AppComponent {
  title = 'mi-app';

  constructor(private router: Router) { }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  navigateToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  navigateToPlans(): void {
    this.router.navigate(['/plans']);
  }
}

