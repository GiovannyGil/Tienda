import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

// interface de autenticacion -> tipo y respuesta
interface AuthResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // url del backend
  private URL = 'http://localhost:3000/auth'; // /login, /logout
  // palabra secreta
  private tokenKey = 'SECRET_KEY';

  constructor(private http: HttpClient, private router: Router) { }

  // metodo de login
  login(nombreUsuario: string, clave: string) {
    return this.http.post<AuthResponse>(`${this.URL}/login`, { nombreUsuario, clave }).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token) // guardar token en local storage
        this.programarCierreSesion() // programar cierre de sesion
      })
    )
  }

  // metodo para cerrar session
  logout(): void {
    localStorage.removeItem(this.tokenKey)
    this.router.navigate(['/'])
  }

  // metodo para obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // metodo para obtener fecha/tiempo de expiracion del token
  private obtenerFechaExpiracionToken(): number | null {
    const token = this.getToken(); // obtener token del local storage
    if (!token) { return null } // si no hay token, retornar null

    try {
      const payload = JSON.parse(atob(token.split('.')[1])) // decodificar token
      return payload.exp ? payload.exp * 1000 : null // retornar fecha de expiracion -> multiplicar por 1000 para convertir a milisegundos
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  // metodo para programar cierre de sesion automaticamente
  private programarCierreSesion(): void {
    const fechaExpiracion = this.obtenerFechaExpiracionToken() // obtener fecha de expiracion
    if (!fechaExpiracion) { return } // si no hay fecha de expiracion, salir

    const timepoRestante = fechaExpiracion - Date.now() // calcular tiempo restante
    // si hay tiempo restante, programar cierre de sesion
    if (timepoRestante > 0) {
      setTimeout(() => {
        alert('Sesion expirada') // alerta de sesion expirada
        this.logout() // cerrar sesion
      }, timepoRestante) // tiempo restante
    }
  }

  // metodo para verificar si esta logeodo
  isLoggedIn(): boolean {
    // verificar si hay token y si no esta expirado -> verificar si el token es valido
    const fechaExpiracion = this.obtenerFechaExpiracionToken()
    // retornar la fecha de expiracion si es valida -> si no, retornar false
    return fechaExpiracion ? Date.now() < fechaExpiracion : false
  }

}
