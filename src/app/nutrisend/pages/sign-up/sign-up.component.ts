import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router'; // Importar Router
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importar MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/user.entity"; // Importar FormsModule para ngModel

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
    FormsModule,
    ReactiveFormsModule
  ] // Añadir módulos de Angular Material y FormsModule
})
export class SignUpComponent {
  /*title: string = 'Sign Up';
  nameLabel: string = 'Name';
  surnameLabel: string = 'Surname';
  emailLabel: string = 'E-mail';
  passwordLabel: string = 'Password';
  loginText: string = "Already have an account? Log in";*/

  /*name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';*/

  signUpForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(){
    if(this.signUpForm.valid) {
      const user: User = this.signUpForm.value; // Obtener datos del formulario
      this.authService.signUp(user).subscribe(
        (response) =>{
          console.log('Usuario Registrado', response);
          this.router.navigate(['/sign-in']);
        },
        (error) =>{
          console.error('Error de registro', error);
        }
      );
    }
  }
  /*onSignUp(): void {
    // Implementar lógica de registro aquí

    // Después de registrar, navegar a Register-Congrats
    this.router.navigate(['/register-congrats']);
  }*/
}
