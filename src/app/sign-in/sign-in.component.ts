import { Component } from '@angular/core';
import { AuthService } from '../../../../OPEN  PROJECT/menu/src/app/auth.service'; // Asegúrate de tener este servicio
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { FormsModule } from '@angular/forms';
import {MatFormField} from "@angular/material/form-field"; // Importar FormsModule para ngModel

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  styleUrls: ['./sign-in.component.css'],
  imports: [RouterModule, FormsModule, MatFormField] // Añadir RouterModule y FormsModule a los imports
})
export class SignInComponent {
  title: string = 'Sign In';
  emailLabel: string = 'E-mail';
  passwordLabel: string = 'Contraseña';
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
