import {Component, OnInit} from '@angular/core';
import { FoodFitService } from "../../services/food-fit.service";
import { ExerciseFit } from "../../model/exercise-fit.entity";
import { ExerciseFitService } from "../../services/exercise-fit.service";
import {Router} from "@angular/router";
import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faAppleAlt, faUtensils} from "@fortawesome/free-solid-svg-icons";
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Meals} from "../../model/meals.entity";
import {Order, OrderItem} from "../../model/order.entity";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-food-fit',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatButton,
    NgIf,
    MatIcon
  ],
  templateUrl: './food-fit.component.html',
  styleUrls: ['./food-fit.component.css']
})
export class FoodFitComponent implements OnInit {
  foodFit: Meals[] = [];
  breakfastMeals: Meals[] = [];
  lunchMeals: Meals[] = [];
  dinnerMeals: Meals[] = [];

  exerciseFit: ExerciseFit[] = [];
  currentOrder: Order = new Order(); // Pedido actual

  constructor(library: FaIconLibrary, private router: Router, private exercisesFitApi: ExerciseFitService, private foodFitApi: FoodFitService) {
    library.addIcons(faAppleAlt, faUtensils);
  }

  ngOnInit(): void {
    this.foodFitApi.getAllFoodFiT().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.foodFit = data;
          this.breakfastMeals = this.foodFit.filter(meal => meal.categoryID === 6 && meal.typeID === 2);
          this.lunchMeals = this.foodFit.filter(meal => meal.categoryID === 6 && meal.typeID === 1);
          this.dinnerMeals = this.foodFit.filter(meal => meal.categoryID === 6 && meal.typeID === 3);
        }
      },
      error: (err) => {
        console.error('Error al obtener disponibilidades', err);
      }
    });

    // Carga de ejercicios
    this.exercisesFitApi.getAllExerciseFities().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.exerciseFit = data;
        }
      },
      error: (err) => {
        console.error('Error al obtener ejercicios', err);
      }
    });
  }

  navigateToFitFood(): void {
    this.router.navigate(['/food-fit']);
  }

  navigateToFood(): void {
    this.router.navigate(['/food']);
  }

  navigateToPay() {
    this.router.navigate(['/order']); // Redirige a la página de "order"
  }

  addToOrder(item: Meals | ExerciseFit) {
    if ('typeID' in item) { // Verifica si es un objeto Meals
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

      const existingItemIndex = this.currentOrder.items.findIndex(orderItem => orderItem.name === item.name && orderItem.category === category);

      if (existingItemIndex > -1) {
        // Si ya existe, solo incrementa la cantidad
        this.currentOrder.items[existingItemIndex].quantity += 1;
        this.currentOrder.total += item.price; // Incrementa el total
      } else {
        // Si no existe, verifica si hay un plato seleccionado en esa categoría
        const selectedItemIndex = this.currentOrder.items.findIndex(orderItem => orderItem.category === category);

        if (selectedItemIndex > -1) {
          // Si hay un plato seleccionado en esa categoría, actualiza su precio y nombre
          const existingItem = this.currentOrder.items[selectedItemIndex];
          this.currentOrder.total -= existingItem.price * existingItem.quantity; // Resta el costo anterior
          existingItem.name = item.name; // Actualiza el nombre
          existingItem.price = item.price; // Actualiza el precio
          existingItem.quantity = 1; // Reinicia la cantidad a 1
          this.currentOrder.total += item.price; // Suma el nuevo precio
        } else {
          // Si no hay plato seleccionado en esa categoría, agrega uno nuevo
          const orderItem = new OrderItem(item.name, item.price, category);
          this.currentOrder.items.push(orderItem);
          this.currentOrder.total += item.price; // Suma al total
        }
      }
    } else {
      console.log('Ejercicio agregado:', item.name);
      // Aquí puedes agregar lógica adicional si deseas incluir ejercicios en el pedido.
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
