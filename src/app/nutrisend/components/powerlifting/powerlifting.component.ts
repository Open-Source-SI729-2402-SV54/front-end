import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage } from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import { Meals } from "../../model/meals.entity";
import { PowerLiftingService } from "../../services/power-lifting.service";
import { Order, OrderItem } from "../../model/order.entity";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-powerlifting',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardImage,
    MatCardHeader,
    MatCardContent,
    MatButton,
    NgIf,
    MatCardActions,
    TitleCasePipe,
    RouterLink,
    MatIcon,
    MatToolbar,
    MatIconButton
  ],
  templateUrl: './powerlifting.component.html',
  styleUrls: ['./powerlifting.component.css']
})
export class PowerliftingComponent implements OnInit {
  powerlifting: Meals[] = [];
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];
  currentOrder: Order = new Order();

  selectedBreakfast: Meals | null = null;
  selectedLunch: Meals | null = null;
  selectedDinner: Meals | null = null;

  showCart: boolean = false;

  constructor(private router: Router, private powerliftingApi: PowerLiftingService) {}

  ngOnInit(): void {
    this.powerliftingApi.getAllPowerLifting().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.powerlifting = data;

          this.breakfastMeals = this.powerlifting.filter(meal => meal.categoryID === 3 && meal.typeID === 2);
          this.lunchMeals = this.powerlifting.filter(meal => meal.categoryID === 3 && meal.typeID === 1);
          this.dinnerMeals = this.powerlifting.filter(meal => meal.categoryID === 3 && meal.typeID === 3);
        }
      },
      error: (err) => {
        console.error('Error al obtener disponibilidades', err);
      }
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  addToOrder(meal: Meals) {
    let category = '';

    switch (meal.typeID) {
      case 1:
        category = 'Lunch';
        this.selectedLunch = meal; // Selecciona el almuerzo
        break;
      case 2:
        category = 'Breakfast';
        this.selectedBreakfast = meal; // Selecciona el desayuno
        break;
      case 3:
        category = 'Dinner';
        this.selectedDinner = meal; // Selecciona la cena
        break;
      default:
        category = 'Unknown';
    }

    const existingItemIndex = this.currentOrder.items.findIndex(item => item.name === meal.name && item.category === category);

    if (existingItemIndex > -1) {
      // Si ya existe, solo incrementa la cantidad
      this.currentOrder.items[existingItemIndex].quantity += 1;
      this.currentOrder.total += meal.price; // Incrementa el total
    } else {
      const orderItem = new OrderItem(meal.name, meal.price, category);
      orderItem.quantity = 1; // Inicializa la cantidad a uno
      this.currentOrder.items.push(orderItem);
      this.currentOrder.total += meal.price; // Suma al total
    }

    console.log('Orden actual:', this.currentOrder);
  }

  removeFromOrder(item: OrderItem) {
    const index = this.currentOrder.items.indexOf(item);
    if (index > -1) {
      this.currentOrder.total -= item.price * item.quantity; // Resta el total
      this.currentOrder.items.splice(index, 1); // Elimina el artículo
      console.log('Item eliminado de la orden:', item);
      console.log('Orden actual:', this.currentOrder);
    }
  }

  saveOrder() {
    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
  }
}
