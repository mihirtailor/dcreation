import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service'; // Assuming you have an AuthService for JWT handling
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject the AuthService that handles JWT logic
  const router = inject(Router); // Inject Router to navigate to login page if not authenticated
  const jwtHelper = inject(JwtHelperService); // Inject JWT helper to decode token

  // Check if token exists in localStorage or cookies
  const token = localStorage.getItem('token');

  if (!token) {
    // No token means the user is not logged in, redirect to login page
    router.navigate(['/admin/login']);
    return false;
  }

  // Decode the token and check if it's expired
  const decodedToken = jwtHelper.decodeToken(token);

  if (jwtHelper.isTokenExpired(token)) {
    // Token is expired, redirect to login page
    router.navigate(['/admin/login']);
    return false;
  }

  // Check if the user has an 'admin' role from the token
  if (decodedToken?.role !== 'admin') {
    // Not an admin, redirect to home page or another page
    router.navigate(['/']);
    return false;
  }

  // If token is valid and the user is an admin, allow access
  return true;
};
