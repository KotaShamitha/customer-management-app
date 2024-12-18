import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  constructor(private router: Router) {}

  login(email: string, password: string) {
    if (email === 'admin@email.com' && password === 'password') {
      this.user = {
        email,
        password,
        role: 'admin',
      };
    } else if (email === 'user' && password === 'password') {
      this.user = {
        email,
        password,
        role: 'user',
      };
    }
    this.router.navigate(['/home']);
  }

  isUserLoggedIn() {
    return this.user !== null;
  }

  getRole() {
    return this.user?.role;
  }
}
