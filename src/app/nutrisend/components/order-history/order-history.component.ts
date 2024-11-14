import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from "../../services/order-history.service";
import {NgForOf, NgIf} from "@angular/common";
import { Order } from "../../model/order.entity";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardModule,
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string | null = null;
  noOrdersMessage: string | null = null;

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    const userId = 1; // Cambia esto según sea necesario
    this.loadOrderHistory(userId);
  }

  loadOrderHistory(userId: number): void {
    this.orderHistoryService.getOrderHistory(userId).subscribe(
      (data) => {
        console.log('Datos recibidos:', data); // Agrega este log para verificar los datos
        this.orders = data || [];
        this.errorMessage = null;
        this.noOrdersMessage = this.orders.length === 0 ? 'No tienes pedidos en tu historial.' : null;
      },
      (error) => {
        console.error('Error al cargar el historial de pedidos', error);
        this.errorMessage = 'No se pudieron cargar los pedidos. Por favor, inténtelo más tarde.';
      }
    );
  }

}
