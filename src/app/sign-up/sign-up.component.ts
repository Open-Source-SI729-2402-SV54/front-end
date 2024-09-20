import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
  styleUrls: ['./sign-up.component.css'],
  imports: [RouterModule, FormsModule] // Añadir RouterModule y FormsModule a los imports
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


