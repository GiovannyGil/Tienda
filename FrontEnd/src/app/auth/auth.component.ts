import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  // datos login
  nombreUsuario: string = ''
  correo: string = ''
  clave: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.nombreUsuario, this.clave).subscribe(
      () => {
        console.log('Usuario logeado')
        this.router.navigate(['/dash']) // redireccionar al dashboard
      },
      (error) => {
        console.log('Error al logear usuario')
        console.error(error)
      }
    )
  }
}
