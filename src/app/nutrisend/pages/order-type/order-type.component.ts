import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-type',
  standalone: true,
  imports: [],
  templateUrl: './order-type.component.html',
  styleUrl: './order-type.component.css'
})
export class OrderTypeComponent {
  sportsTitle: string = 'Sports';
  healthyTitle: string = 'Healthy';
  availabilityTitle: string = 'Availability';

  sportsDescription: string = 'We help you with your sports regimen, offering you options rich in protein\n' +
    'and carbohydrates according to the sport you practice.';
  healthyDescription: string = 'We help you with fat reduction routines, offering low-calorie meals. Exercises to improve cardiovascular performance; if you want to gain muscle mass, higher protein menus.';
  availabilityDescription: string = 'We will display which foods are currently available so the user can view them.';

  constructor(private router: Router) {}

  navigateToHealthy(): void {
    this.router.navigate(['/healthy']);
  }
  navigateToAvailability(): void {
    this.router.navigate(['/availability']);
  }

  navigateToSports(): void {
    this.router.navigate(['/sports']);
  }
}
