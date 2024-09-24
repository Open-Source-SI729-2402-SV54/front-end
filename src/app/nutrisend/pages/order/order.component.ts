import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { MatOption } from "@angular/material/core";
import { MatFormField, MatLabel, MatSelect } from "@angular/material/select";
import { MatButton } from "@angular/material/button";
import { MatCardContent, MatCardHeader, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

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
  // Variable que almacena la sección actual
  currentSection: string = '';

  // Datos de los ítems para Fit Excercises 

  fitExerciseItems = [
    { id: 1, name: 'Pack ejercicio de fuerza en barra', description: 'Ejercicios en barra trabajando fuerza y resistencia de los brazos.', price: 5.90, quantity: 0, image: 'assets/fit-excercise1.jpeg' },
    { id: 2, name: 'Pack ejercicio "burpees"', description: 'Conjunto de ejercicios combinados de sentadillas, push-up y salto.', price: 5.90, quantity: 0, image: 'assets/fit-excercise2.jpeg' },
    { id: 3, name: 'Pack ejercicio "side plank"', description: 'Conjunto de ejercicios de fortalecimiento de los músculos del core, hombros y piernas.', price: 5.90, quantity: 0, image: 'assets/fit-excercise3.jpeg' },
    { id: 4, name: 'Pack ejercicios tren inferior', description: 'Conjunto de ejercicios pensados en el fortalecimiento del tren inferior como piernas, glúteos y core.', price: 5.90, quantity: 0, image: 'assets/fit-escercise4.jpg' }
  ];
  
  // Datos de los ítems para Fit Food
  fitFoodItems = [
    { id: 1, name: 'Ensalada de quinua y vegetales', calories: 300, protein: 10, fats: 12, price: 15.99, quantity: 0,  image: 'assets/fit-food1.jpg' },
    { id: 2, name: 'Salmón a la plancha con espárragos al vapor', calories: 350, protein: 30, fats: 20, price: 15.99, quantity: 0,  image: 'assets/fit-food2.jpg' },
    { id: 3, name: 'Wrap de pollo a la parrilla con aguacate y vegetales', calories: 400, protein: 25, fats: 18, price: 15.99, quantity: 0, image: 'assets/fit-food3.jpg' },
    { id: 4, name: 'Bowl de yogur griego con frutas y granola', calories: 250, protein: 15, fats: 8, price: 15.99, quantity: 0, image: 'assets/fit-food4.jpg' },
    { id: 5, name: 'Tortilla de claras de huevo con espinacas y champiñones', calories: 200, protein: 20, fats: 10, price: 15.99, quantity: 0, image: 'assets/fit-food5.jpg' },
    { id: 6, name: 'Pechuga de pollo a la plancha con brócoli al vapor', calories: 300, protein: 25, fats: 10,price: 15.99, quantity: 0,  image: 'assets/fit-food6.jpg' },
  ];

  // Datos de los ítems para Almuerzos
  almuerzosItems = [
    { id: 1, name: 'Puré con Asado', calories: 713, protein: 37.9, carbs: 52.0, fats: 36.0, price: 15.99, quantity: 0, image: 'pollo_asado.jpeg' },
    { id: 2, name: 'Lomo Saltado', calories: 838, protein: 42.8, carbs: 85.9, fats: 37.0, price: 15.99, quantity: 0, image: 'assets/fit-food2.jpg' },
    { id: 3, name: 'Arroz con Pollo', calories: 742, protein: 47.0, carbs: 101.7, fats: 16.8, price: 15.99, quantity: 0, image: 'assets/fit-food3.jpg' },
    { id: 4, name: 'Estofado', calories: 595, protein: 21.1, carbs: 17.7, fats: 48.9, price: 15.99, quantity: 0, image: 'assets/fit-food4.jpg' },
    { id: 5, name: 'Locro', calories: 346, protein: 12.6, carbs: 53.4, fats: 12.3, price: 15.99, quantity: 0, image: 'assets/fit-food5.jpg' },
    { id: 6, name: 'Ají de Gallina', calories: 680, protein: 37.9, carbs: 52.0, fats: 36.0, price: 15.99, quantity: 0, image: 'assets/fit-food6.jpg' },
    { id: 7, name: 'Seco de Pollo', calories: 513, protein: 42.8, carbs: 60.5, fats: 10.6, price: 15.99, quantity: 0, image: 'assets/fit-food7.jpg' },
    { id: 8, name: 'Pollo con Brócoli y Champiñones', calories: 329, protein: 38.9, carbs: 18.6, fats: 14.5, price: 15.99, quantity: 0, image: 'assets/fit-food8.jpg' },
    { id: 9, name: 'Tiradito de Pescado', calories: 680, protein: 37.9, carbs: 52.0, fats: 36.0, price: 15.99, quantity: 0, image: 'assets/fit-food9.jpg' },
    { id: 10, name: 'Pescado al Ajo', calories: 231, protein: 23.9, carbs: 12.8, fats: 12.3, price: 15.99, quantity: 0, image: 'assets/fit-food10.jpg' }
  ];

  // Método para alternar entre Fit Food y Almuerzos
  showSection(section: string) {
    this.currentSection = section;
  }
  
  // Total a pagar
  totalAmount: number = 0.00;

  constructor(private router: Router) { }


  // Método para aumentar la cantidad de un ítem
  increaseQuantity(id: number) {
    const item = this.getItemById(id);
    if (item) {
      item.quantity++;
      this.calculateTotal();
    }
  }

  // Método para disminuir la cantidad de un ítem
  decreaseQuantity(id: number) {
    const item = this.getItemById(id);
    if (item && item.quantity > 0) {
      item.quantity--;
      this.calculateTotal();
    }
  }

  // Método para obtener un ítem por ID
  getItemById(id: number) {
    return [...this.fitFoodItems, ...this.almuerzosItems].find(item => item.id === id);
  }

  // Método para calcular el total a pagar
  calculateTotal() {
    this.totalAmount = 0;
    [...this.fitFoodItems, ...this.almuerzosItems].forEach(item => {
      this.totalAmount += item.quantity * item.price;
    });
  }

  // Método para ir a la página de pago
  payNow() {
    this.router.navigate(['/pay']);
  }

  

}


