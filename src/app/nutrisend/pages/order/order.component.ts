import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { MatOption } from "@angular/material/core";
import { MatFormField, MatLabel, MatSelect } from "@angular/material/select";
import { MatButton } from "@angular/material/button";
import { MatCardContent, MatCardHeader, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { HttpClient } from '@angular/common/http';
import {Order} from "../../model/order.entity";
import {environment} from "../../../../environments/environment.development";
interface OrderData {
  order: {
    breakfast: Array<{ name: string; price: number }>;
    lunch: Array<{ name: string; price: number }>;
    dinner: Array<{ name: string; price: number }>;
    address: string;
  };
}

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
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  desayunoQuantity: number = 0;
  almuerzoQuantity: number = 0;
  cenaQuantity: number = 0;
  totalAmount: number = 0.00;
  selectedTime: string = '15:00 - 16:00';
  availableTimes: string[] = [
    '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00',
    '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00',
    '18:00 - 19:00', '19:00 - 20:00'
  ];

  orderData!: Order; // Propiedad para almacenar los datos del pedido

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.loadOrderData(); // Cargar los datos al iniciar
  }

  loadOrderData() {
    this.http.get<Order>(`${environment.serverBasePath}/db.json`).subscribe(
      data => {
        console.log('Datos recibidos:', data);
        if (data) {
          this.orderData = data; // Asegúrate de que esto esté bien
          this.calculateTotal(); // Calcular el total inicial si es necesario
        }
      },
      error => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

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
    let desayunoPrice = 0;
    let almuerzoPrice = 0;
    let cenaPrice = 0;

    if (this.orderData.breakfast.length > 0) {
      desayunoPrice = parseFloat(String(this.orderData.breakfast[0].price)) * this.desayunoQuantity;
    }

    if (this.orderData.lunch.length > 0) {
      almuerzoPrice = parseFloat(String(this.orderData.lunch[0].price)) * this.almuerzoQuantity;
    }

    if (this.orderData.dinner.length > 0) {
      cenaPrice = parseFloat(String(this.orderData.dinner[0].price)) * this.cenaQuantity;
    }

    this.totalAmount = desayunoPrice + almuerzoPrice + cenaPrice;
  }

  payNow() {
    this.router.navigate(['/pay']);
  }

  goToSchedule() {
    this.router.navigate(['/schedule']);
  }
}
