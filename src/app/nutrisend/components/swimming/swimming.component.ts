import { Component, OnInit } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import { Meals } from "../../model/meals.entity";
import { SwimmingService } from "../../services/swimming.service";
import { Order, OrderItem } from "../../model/order.entity";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-swimming',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    NgForOf,
    NgIf,
    TitleCasePipe,
    RouterLink,
    MatToolbar,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './swimming.component.html',
  styleUrls: ['./swimming.component.css']
})
export class SwimmingComponent implements OnInit {
  swimming: Meals[] = [];
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];
  currentOrder: Order = new Order();

  selectedBreakfast: Meals | null = null;
  selectedLunch: Meals | null = null;
  selectedDinner: Meals | null = null;

  showCart: boolean = false;

  constructor(private router: Router, private swimmingApi: SwimmingService) {}

  ngOnInit(): void {
    this.swimmingApi.getAllSwimming().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.swimming = data;
          this.breakfastMeals = this.swimming.filter(meal => meal.categoryID === 7 && meal.typeID === 2);
          this.lunchMeals = this.swimming.filter(meal => meal.categoryID === 7 && meal.typeID === 1);
          this.dinnerMeals = this.swimming.filter(meal => meal.categoryID === 7 && meal.typeID === 3);
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
        // Seleccionar almuerzo
        this.selectedLunch = meal;
        break;
      case 2:
        category = 'Breakfast';
        // Seleccionar desayuno
        this.selectedBreakfast = meal;
        break;
      case 3:
        category = 'Dinner';
        // Seleccionar cena
        this.selectedDinner = meal;
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
