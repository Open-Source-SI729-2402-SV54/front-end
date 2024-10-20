import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title: string = '¡ Welcome to NutriSend !';
  subtitle: string = '"Healthy meals and workouts, ready for your lifestyle"';

}
