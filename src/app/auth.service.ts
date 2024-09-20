import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private apiUrl = 'http://localhost:3000/users';
  private http: HttpClient | undefined;

  constructor() {
    http: HttpClient }

  //signIn(email: string, password: string): boolean {
    // Implementar lógica de autenticación real aquí
    //if (email && password) {
      //this.isLoggedIn = true;
      //return true;
   // }
   // return false;
  //}

  signIn(email: string, password: string): Observable<any> {
    // @ts-ignore
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  signUp(user: any): Observable<any> {


    // @ts-ignore
    return this.http.post<any>(this.apiUrl, user);
  }

  signOut(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}

