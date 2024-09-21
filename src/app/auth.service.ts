import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor() { }

  signIn(email: string, password: string): boolean {
    // Implementar lógica de autenticación real aquí
    if (email && password) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  signOut(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
