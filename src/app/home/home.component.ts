import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importar RouterModule

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css'],
  imports: [RouterModule] // Añadir RouterModule a los imports
})
export class HomeComponent {
  title: string = '¡ Welcome to NutriSend !';
  subtitle: string = '"Healthy meals and workouts, ready for your lifestyle"';
}
