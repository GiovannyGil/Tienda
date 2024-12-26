import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL API LOGIN
  private loginUrl = 'http://localhost:3000/auth/login'

  constructor() { }
}
