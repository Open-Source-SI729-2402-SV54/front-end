import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router'; // Importar Router
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importar MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
  styleUrls: ['./sign-up.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule
  ] // Añadir módulos de Angular Material y FormsModule
})
export class SignUpComponent {
  title: string = 'Sign Up';
  nameLabel: string = 'Name';
  surnameLabel: string = 'Surname';
  emailLabel: string = 'E-mail';
  passwordLabel: string = 'Password';
  loginText: string = "Already have an account? Log in";

  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onSignUp(): void {
    // Implementar lógica de registro aquí

    // Después de registrar, navegar a Register-Congrats
    this.router.navigate(['/register-congrats']);
  }
}
