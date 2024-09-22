import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importar MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import { RouterModule } from '@angular/router';
import {AuthService} from "../../services/auth.service"; // Importar RouterModule

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  styleUrls: ['./sign-in.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule // Añadir los módulos de Angular Material y FormsModule
  ]
})
export class SignInComponent {
  title: string = 'Sign In';
  emailLabel: string = 'E-mail';
  passwordLabel: string = 'Password';
  registerText: string = "Don't have an account? Register here";

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSignIn(): void {
    const success = this.authService.signIn(this.email, this.password);
    if (success) {
      // Redirigir a una página protegida o al inicio
      console.log('Inicio de sesión exitoso');
    } else {
      // Mostrar mensaje de error
      console.log('Credenciales inválidas');
    }
  }
}
