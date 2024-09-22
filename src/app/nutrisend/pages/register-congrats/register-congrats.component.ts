import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { RouterModule } from '@angular/router'; // Importar RouterModule

@Component({
  selector: 'app-register-congrats',
  templateUrl: './register-congrats.component.html',
  standalone: true,
  styleUrls: ['./register-congrats.component.css'],
  imports: [RouterModule] // Añadir RouterModule a los imports
})
export class RegisterCongratsComponent {
  welcomeMessage: string = 'Welcome to NutriSend';
  successMessage: string = 'Se ha Registrado Correctamente';
  buttonText: string = 'Listo';

  constructor(private router: Router) { }

  goToPlans(): void {
    this.router.navigate(['/plans']);
  }
}
