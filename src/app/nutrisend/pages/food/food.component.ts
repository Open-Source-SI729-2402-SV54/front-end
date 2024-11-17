import {Component, OnInit} from '@angular/core';
import { FoodService } from "../../services/food.service";
import {Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatButton} from "@angular/material/button";
import {Meals} from "../../model/meals.entity";
import {Order, OrderItem} from "../../model/order.entity";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    NgForOf,
    FaIconComponent,
    MatButton,
    MatIcon,
    NgIf
  ],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  food: Meals[] = [];
  selectedFood: any;
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];

  currentOrder: Order = new Order(); // Pedido actual

  constructor(private router: Router, private foodApi: FoodService) {}

  ngOnInit(): void {
    this.foodApi.getAllFoodies().subscribe({
      next: (data) => {
        console.log('Datos de la API Powerlifting:', data);
        if (Array.isArray(data)) {
          this.food = data;
          this.selectedFood = this.food.length > 0 ? this.food[0] : null;

          this.breakfastMeals = this.food.filter(meal => meal.categoryID === 5 && meal.typeID === 2);
          this.lunchMeals = this.food.filter(meal => meal.categoryID === 5 && meal.typeID === 1);
          this.dinnerMeals = this.food.filter(meal => meal.categoryID === 5 && meal.typeID === 3);

          console.log('Comidas saludables:', this.food);
          console.log('Desayunos:', this.breakfastMeals);
          console.log('Almuerzos:', this.lunchMeals);
          console.log('Cenas:', this.dinnerMeals);
        } else {
          console.error('Datos de la API no válidos:', data);
        }
      },
      error: (err) => {
        console.error('Error al obtener disponibilidades', err);
      }
    });
  }

  navigateToFood(): void {
    this.router.navigate(['/food']);
  }

  navigateToFitFood(): void {
    this.router.navigate(['/food-fit']);
  }

  navigateToPay() {
    this.router.navigate(['/order']); // Redirige a la página de "order"
  }

  addToOrder(meal: Meals) {
    let category = '';

    switch (meal.typeID) {
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

    const existingItemIndex = this.currentOrder.items.findIndex(orderItem => orderItem.name === meal.name && orderItem.category === category);

    if (existingItemIndex > -1) {
      // Si ya existe, solo incrementa la cantidad
      this.currentOrder.items[existingItemIndex].quantity += 1;
      this.currentOrder.total += meal.price; // Incrementa el total
    } else {
      // Si no existe, verifica si hay un plato seleccionado en esa categoría
      const selectedItemIndex = this.currentOrder.items.findIndex(orderItem => orderItem.category === category);

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
}
