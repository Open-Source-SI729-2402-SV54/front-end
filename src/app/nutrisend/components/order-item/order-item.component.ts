import { Component, OnInit } from '@angular/core';
import { OrderItem, Order } from "../../model/order.entity";
import { OrderService } from "../../services/order.service";
import { NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatToolbar } from "@angular/material/toolbar";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatToolbar,
    MatLabel,
    MatInput,
    MatButton,
    MatIcon,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  breakfasts: any[] = [];
  lunches: any[] = [];
  dinners: any[] = [];
  selectedBreakfast: any;
  selectedLunch: any;
  selectedDinner: any;
  breakfastCount: number = 1;
  lunchCount: number = 1;
  dinnerCount: number = 1;

  availableTimes: string[] = [
    '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
    '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
    '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00',
  ];

  selectedTime!: string;

  currentOrder!: Order;
  showOrderForm: boolean = false;
  orderIdCounter: number = this.getNextId();

  currentUser = { id: 1, name: "Camila", surname: "Espinoza" }; // Ejemplo de usuario

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadBreakfasts();
    this.loadLunches();
    this.loadDinners();

    const orderData = localStorage.getItem('currentOrder');
    if (orderData) {
      this.currentOrder = JSON.parse(orderData);
      this.orderIdCounter = this.currentOrder.id + 1;
      this.showOrderForm = false;
    } else {
      this.currentOrder = new Order();
      this.currentOrder.id = this.orderIdCounter;
      this.showOrderForm = true;
    }
  }

  getNextId(): number {
    const currentId = localStorage.getItem('orderIdCounter');
    const newId = currentId ? Number(currentId) + 1 : 1;
    localStorage.setItem('orderIdCounter', newId.toString());
    return newId;
  }

  newOrder(): void {
    this.selectedBreakfast = null;
    this.selectedLunch = null;
    this.selectedDinner = null;

    this.breakfastCount = 1;
    this.lunchCount = 1;
    this.dinnerCount = 1;

    this.currentOrder.items = [];
    this.currentOrder.total = 0;

    localStorage.removeItem('currentOrder');

    this.currentOrder.id = this.orderIdCounter++;

    this.selectedTime = '';

    this.showOrderForm = true;
  }

  pay(): void {
    this.currentOrder.total = this.getTotal();

    if (this.currentOrder.items.length > 0 && this.currentOrder.total > 0) {
      console.log(`Processing payment for total amount: $${this.currentOrder.total}`);
      alert(`¡Pago de $${this.currentOrder.total} ha sido procesado!`);

      this.saveOrder();
      // No es necesario llamar a newOrder() aquí si rediriges inmediatamente.

    } else {
      alert('Por favor selecciona al menos un artículo para pagar.');
    }
  }

  addItemToOrder(item: OrderItem): void {
    const existingItem = this.currentOrder.items.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Incrementar cantidad si ya existe
    } else {
      this.currentOrder.items.push(item); // Agregar nuevo artículo
    }
  }

  saveOrder() {
    const orderToSave = {
      id: this.currentOrder.id,
      userId: this.currentUser.id, // ID del usuario actual
      items: this.currentOrder.items.map(item => ({
        name: item.name,
        price: item.price,
        category: item.category,
        quantity: item.quantity
      })),
      total: this.currentOrder.total,
      deliveryTime: this.selectedTime
    };

    console.log('Datos a guardar:', orderToSave);

    if (!orderToSave.items.length) {
      console.error('No items to save.');
      alert('No hay artículos para guardar.');
      return;
    }

    this.orderService.saveOrder(orderToSave).subscribe(
      response => {
        console.log('Orden guardada:', response);
        // Mostrar alerta de pago exitoso
        alert('Your payment has been processed successfully!'); // Mensaje en inglés
        // Redirigir a la pestaña "profile"
        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Error al guardar la orden:', error);
        alert('Error al guardar la orden. Por favor, verifica la consola para más detalles.');
      }
    );
  }

  loadBreakfasts(): void {
    this.orderService.getBreakfasts().subscribe(
      (data) => {
        this.breakfasts = data;
      },
      (error) => {
        console.error('Error fetching breakfasts', error);
      }
    );
  }

  loadLunches(): void {
    this.orderService.getLunches().subscribe(
      (data) => {
        this.lunches = data;
      },
      (error) => {
        console.error('Error fetching lunches', error);
      }
    );
  }

  loadDinners(): void {
    this.orderService.getDinners().subscribe(
      (data) => {
        this.dinners = data;
      },
      (error) => {
        console.error('Error fetching dinners', error);
      }
    );
  }

  onBreakfastSelect(id: string): void {
    if (id) {
      this.orderService.getBreakfastById(+id).subscribe(
        (data) => {
          const newItem = new OrderItem(data.name, data.price, 'breakfast');
          newItem.quantity = this.breakfastCount; // Asignar cantidad
          this.addItemToOrder(newItem); // Agregar artículo a la orden
          this.selectedBreakfast = data; // Asegúrate de que esto esté correctamente asignado
        },
        (error) => {
          console.error('Error fetching breakfast by ID', error);
        }
      );
    } else {
      this.selectedBreakfast = null;
    }
  }

  onLunchSelect(id: string): void {
    if (id) {
      this.orderService.getLunchById(+id).subscribe(
        (data) => {
          const newItem = new OrderItem(data.name, data.price, 'lunch');
          newItem.quantity = this.lunchCount; // Asignar cantidad
          this.addItemToOrder(newItem); // Agregar artículo a la orden
          this.selectedLunch = data; // Asegúrate de que esto esté correctamente asignado
        },
        (error) => {
          console.error('Error fetching lunch by ID', error);
        }
      );
    } else {
      this.selectedLunch = null;
    }
  }

  onDinnerSelect(id: string): void {
    if (id) {
      this.orderService.getDinnerById(+id).subscribe(
        (data) => {
          const newItem = new OrderItem(data.name, data.price, 'dinner');
          newItem.quantity = this.dinnerCount; // Asignar cantidad
          this.addItemToOrder(newItem); // Agregar artículo a la orden
          this.selectedDinner = data; // Asegúrate de que esto esté correctamente asignado
        },
        (error) => {
          console.error('Error fetching dinner by ID', error);
        }
      );
    } else {
      this.selectedDinner = null;
    }
  }

  getTotal(): number {
    return this.currentOrder.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
