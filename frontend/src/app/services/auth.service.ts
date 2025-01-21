import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  jwt: JwtHelperService = inject(JwtHelperService);
  private baseUrl = 'http://localhost:5000/api'; // Updated to match backend routes

  constructor() {}

  signIn(data: {}) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !this.jwt.isTokenExpired(token);
  }
}
