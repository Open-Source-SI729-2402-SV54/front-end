import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HealthyService } from "../../services/healthy.service";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatSlider } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";
import {Meals} from "../../model/meals.entity";
import {Order, OrderItem} from "../../model/order.entity";

@Component({
  selector: 'app-healthy',
  standalone: true,
  templateUrl: './healthy.component.html',
  styleUrls: ['./healthy.component.css'],
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButton,
    CommonModule,
    MatCardModule,
    MatSlider,
    FormsModule,
  ]
})

export class HealthyComponent implements OnInit {
  healthiness: Meals[] = [];
  selectedHealthy: any;
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];
  calorieLimit: number = 0;
  currentOrder: Order = new Order(); // Pedido actual

  constructor(private router: Router, private healthyApi: HealthyService) {}

  ngOnInit(): void {
    this.healthyApi.getAllHealthies().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.healthiness = data;
          this.selectedHealthy = this.healthiness.length > 0 ? this.healthiness[0] : null;

          this.breakfastMeals = this.healthiness.filter(meal => meal.categoryID === 4 && meal.typeID === 2);
          this.lunchMeals = this.healthiness.filter(meal => meal.categoryID === 4 && meal.typeID === 1);
          this.dinnerMeals = this.healthiness.filter(meal => meal.categoryID === 4 && meal.typeID === 3);
        }
      },
      error: (err) => {
        console.error('Error al obtener disponibilidades', err);
      }
    });
  }

  applyCalorieFilter(): void {
    this.breakfastMeals = this.healthiness.filter(
      meal => meal.categoryID === 4 && meal.typeID === 2 && meal.calories <= this.calorieLimit
    );
    this.lunchMeals = this.healthiness.filter(
      meal => meal.categoryID === 4 && meal.typeID === 1 && meal.calories <= this.calorieLimit
    );
    this.dinnerMeals = this.healthiness.filter(
      meal => meal.categoryID === 4 && meal.typeID === 3 && meal.calories <= this.calorieLimit
    );
  }

  addToOrder(item: Meals) {
    let category = '';

    switch (item.typeID) {
      case 1:
        category = 'Lunch';
        break;
      case 2:
        category = 'Breakfast';
        break;
      case 3:
        category = 'Dinner';
        break;
      default:
        category = 'Unknown';
    }

// Verificar si el artículo ya está en el pedido
    const existingItemIndex = this.currentOrder.items.findIndex(orderItem => orderItem.category === category);

    if (existingItemIndex > -1) {
      // Si ya existe un platillo en esa categoría, reemplazarlo
      const existingItem = this.currentOrder.items[existingItemIndex];
      this.currentOrder.total -= existingItem.price * existingItem.quantity; // Resta el costo anterior
      existingItem.name = item.name; // Actualiza el nombre del platillo
      existingItem.price = item.price; // Actualiza el precio del platillo
      existingItem.quantity = 1; // Reinicia la cantidad a uno
      this.currentOrder.total += item.price; // Suma el nuevo precio al total
    } else {
      // Si no existe, agrega uno nuevo al pedido
      const orderItem = new OrderItem(item.name, item.price, category);
      orderItem.quantity = 1; // Inicializa la cantidad a uno
      this.currentOrder.items.push(orderItem);
      this.currentOrder.total += item.price; // Suma al total
    }

    console.log('Orden actual:', this.currentOrder);
    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder)); // Guarda el pedido actualizado
  }

  removeFromOrder(item: OrderItem) {
    const index = this.currentOrder.items.findIndex(orderItem => orderItem.name === item.name && orderItem.category === item.category);

    if (index > -1) {
      const quantityToRemove = this.currentOrder.items[index].quantity;

      // Resta el precio total del artículo que se está eliminando
      this.currentOrder.total -= item.price * quantityToRemove;

      // Elimina el artículo del carrito
      this.currentOrder.items.splice(index, 1);

      console.log('Artículo eliminado:', item.name);
      console.log('Orden actual después de eliminar:', this.currentOrder);

      localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder)); // Guarda el pedido actualizado
    }
  }

  navigateToPay() {
    // Redirige a la página de "order"
    this.router.navigate(['/order']);
  }
}
