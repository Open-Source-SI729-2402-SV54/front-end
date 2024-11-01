import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from "../model/order.entity";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBreakfasts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/order-breakfasts`);
  }

  getBreakfastById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/order-breakfasts/${id}`);
  }

  getLunches(): Observable<any> {
    return this.http.get(`${this.apiUrl}/order-lunches`);
  }

  getLunchById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/order-lunches/${id}`);
  }

  getDinners(): Observable<any> {
    return this.http.get(`${this.apiUrl}/order-dinners`);
  }

  getDinnerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/order-dinners/${id}`);
  }

  saveOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/food-orders`, order);
  }
}
