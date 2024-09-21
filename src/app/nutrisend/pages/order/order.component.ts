import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {MatOption} from "@angular/material/core";
import {MatFormField, MatLabel, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatOption,
    MatSelect,
    MatLabel,
    MatButton,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  desayunoQuantity: number = 0;
  almuerzoQuantity: number = 0;
  cenaQuantity: number = 0;
  totalAmount: number = 0.00;
  selectedTime: string = '15:00 - 16:00';
  availableTimes: string[] = [
    '08:00 - 09:00', '09:00 - 10:00','10:00 - 11:00','11:00 - 12:00','12:00 - 13:00',
    '13:00 - 14:00','14:00 - 15:00','15:00 - 16:00', '16:00 - 17:00','17:00 - 18:00',
    '18:00 - 19:00','19:00 - 20:00',];
  constructor(private router: Router) { }

  increaseQuantity(type: string) {
    if (type === 'desayuno') this.desayunoQuantity++;
    if (type === 'almuerzo') this.almuerzoQuantity++;
    if (type === 'cena') this.cenaQuantity++;
    this.calculateTotal();
  }

  decreaseQuantity(type: string) {
    if (type === 'desayuno' && this.desayunoQuantity > 0) this.desayunoQuantity--;
    if (type === 'almuerzo' && this.almuerzoQuantity > 0) this.almuerzoQuantity--;
    if (type === 'cena' && this.cenaQuantity > 0) this.cenaQuantity--;
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = (this.desayunoQuantity * 10) +
      (this.almuerzoQuantity * 25) +
      (this.cenaQuantity * 26);
  }

  payNow() {
    this.router.navigate(['/pay']);
  }

  goToSchedule() {
    this.router.navigate(['/schedule']);
  }
}
