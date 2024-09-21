import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent {
  userEmail: string = 'luisecajamune@gmail.com';
  constructor(private router: Router) {}
  finish() {
    this.router.navigate(['/']);  // Redirige a la página principal u otra de tu elección
  }
  goToHome() {
    this.router.navigate(['/order']);
  }
}
