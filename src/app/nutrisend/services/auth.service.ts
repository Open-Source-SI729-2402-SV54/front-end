import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private apiUrl = 'http://localhost:3000'; // Cambia según tu API base
  private userType: string = ''; // Variable para almacenar el tipo de usuario

  constructor(private http: HttpClient) {}

  // Método de inicio de sesión que determina si es usuario free o premium
  signIn(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users-free?email=${email}&password=${password}`).pipe(
      switchMap((freeUsers) => {
        if (freeUsers.length > 0) {
          this.isLoggedIn = true;
          this.userType = 'free'; // Usuario free encontrado
          return of(freeUsers); // Devolver los datos de usuarios free
        } else {
          // Si no es usuario free, buscar en los usuarios premium
          return this.http.get<any[]>(`${this.apiUrl}/users-premium?email=${email}&password=${password}`).pipe(
            tap((premiumUsers) => {
              if (premiumUsers.length > 0) {
                this.isLoggedIn = true;
                this.userType = 'premium'; // Usuario premium encontrado
              }
            })
          );
        }
      }),
      tap((users) => {
        if (users.length === 0) {
          console.log('Credenciales inválidas');
        }
      }),
      catchError((error) => {
        console.error('Error al iniciar sesión', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }

  // Método para obtener el tipo de usuario
  getUserType(): string {
    return this.userType;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Método para cerrar sesión
  signOut(): void {
    this.isLoggedIn = false;
    this.userType = ''; // Limpiamos el tipo de usuario
  }
}
