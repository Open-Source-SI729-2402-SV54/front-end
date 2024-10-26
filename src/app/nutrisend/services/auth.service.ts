// auth.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { User } from "../model/user.entity";
import { catchError, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<User> {
  constructor() {
    super();
    this.resourceEndPoint = '/users';
  }

  signUp(user: User): Observable<User> {
    return this.create(user);
  }

  signIn(email: string, password: string): Observable<User[]> {
    const filter = `?email=${email}&password=${password}`;
    return this.http.get<User[]>(`${this.resourcePath()}${filter}`, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        tap(users => {
          if (users.length > 0) {
            const loggedUser = users[0];
            if (loggedUser.id !== undefined) {
              localStorage.setItem('userId', loggedUser.id.toString());

              // Verifica que loggedUser.plan no sea undefined antes de almacenarlo
              const userPlan = loggedUser.plan ?? 'basic'; // Asigna 'basic' si es undefined
              localStorage.setItem('userPlan', userPlan); // Almacena el plan
              console.log(`User logged in with ID: ${loggedUser.id}, Plan: ${userPlan}`);
            } else {
              console.error('Error: User ID is undefined.');
            }
          } else {
            console.warn('No user was found with the provided credentials.');
          }
        })
      );
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUserPlan(): string | null {
    return localStorage.getItem('userPlan');
  }

  logOut(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userPlan'); // Limpiar el plan al cerrar sesión
  }
}
