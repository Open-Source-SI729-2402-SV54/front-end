import { Component, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import { FootballService } from "../../services/football.service";
import {Router, RouterLink} from "@angular/router";
import { Meals } from "../../model/meals.entity";
import { Order, OrderItem } from "../../model/order.entity";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-football',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    NgForOf,
    TitleCasePipe,
    MatIcon,
    MatIconButton,
    MatToolbar,
    NgIf,
    RouterLink
  ],
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent implements OnInit {
  football: Meals[] = [];
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];
  currentOrder: Order = new Order();

  // Mantener un registro de las selecciones
  selectedBreakfast: Meals | null = null;
  selectedLunch: Meals | null = null;
  selectedDinner: Meals | null = null;

  showCart: boolean = false;

  toggleCart() {
    this.showCart = !this.showCart;
  }

  constructor(private router: Router, private footballApi: FootballService) {
  }

  ngOnInit(): void {
    this.footballApi.getAllFootball().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.football = data;

          this.breakfastMeals = this.football.filter(meal => meal.categoryID === 2 && meal.typeID === 2);
          this.lunchMeals = this.football.filter(meal => meal.categoryID === 2 && meal.typeID === 1);
          this.dinnerMeals = this.football.filter(meal => meal.categoryID === 2 && meal.typeID === 3);
        }
      },
      error: (err) => {
        console.error('Error al obtener disponibilidades', err);
      }
    });
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

  addToOrder(meal: Meals) {
    let category = '';

    switch (meal.typeID) {
      case 1:
        category = 'Lunch';
        this.selectedLunch = meal;
        break;
      case 2:
        category = 'Breakfast';
        this.selectedBreakfast = meal;
        break;
      case 3:
        category = 'Dinner';
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
      // Si no existe, verifica si hay un plato seleccionado en esa categoría
      const selectedItemIndex = this.currentOrder.items.findIndex(item => item.category === category);

      if (selectedItemIndex > -1) {
        // Si hay un plato seleccionado en esa categoría, actualiza su precio y nombre
        const existingItem = this.currentOrder.items[selectedItemIndex];
        this.currentOrder.total -= existingItem.price * existingItem.quantity; // Resta el costo anterior
        existingItem.name = meal.name; // Actualiza el nombre
        existingItem.price = meal.price; // Actualiza el precio
        existingItem.quantity = 1; // Reinicia la cantidad a 1
        this.currentOrder.total += meal.price; // Suma el nuevo precio
      } else {
        // Si no hay plato seleccionado en esa categoría, agrega uno nuevo
        const orderItem = new OrderItem(meal.name, meal.price, category);
        this.currentOrder.items.push(orderItem);
        this.currentOrder.total += meal.price; // Suma al total
      }
    }

    console.log('Orden actual:', this.currentOrder);
  }

  saveOrder() {
    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
  }
}
