import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAppleAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  constructor(library: FaIconLibrary , private router: Router) {
    library.addIcons(faAppleAlt, faUtensils);
  }

  navigateToFood(): void {
    this.router.navigate(['/food']);
  }
  navigateToFitFood(): void {
    this.router.navigate(['/food-fit']);
  }
}
