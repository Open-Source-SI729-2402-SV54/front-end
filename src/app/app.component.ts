import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor} from "@angular/material/button";
import {FooterComponent} from "./public/pages/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatAnchor, RouterLink, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';

  options = [
    { path: '/home', title: 'Home'},
    { path: '/plans', title: 'Plans'},
    { path: '/order', title: 'Order-Free'},
    { path: '/order-premium', title: 'Order-Premium'},
    { path: '/profile', title: 'Profile'},
    { path: '/sign-in', title: 'Sign In'},
    { path: '/sign-up', title: 'Sign Up'},
  ]

}
