import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/admin/login']);
    return false;
  }

  const decodedToken = jwtHelper.decodeToken(token);

  if (jwtHelper.isTokenExpired(token)) {
    router.navigate(['/admin/login']);
    return false;
  }

  if (decodedToken?.role !== 'admin') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
