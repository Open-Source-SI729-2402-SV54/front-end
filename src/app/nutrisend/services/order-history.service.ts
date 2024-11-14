import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Order} from "../model/order.entity";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private apiUrl = 'http://localhost:3000'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {
  }

  getOrderHistory(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/order-history?userId=${userId}`).pipe(
      map(orders => {
        return orders || [];
      })
    );
  }
}

