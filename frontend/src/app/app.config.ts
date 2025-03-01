import { ApplicationConfig, importProvidersFrom, PLATFORM_ID, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { routes } from './app.routes';
import { JwtModule } from '@auth0/angular-jwt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';

export function tokenGetter() {
  // Check if running in browser before accessing localStorage
  if (isPlatformBrowser(inject(PLATFORM_ID))) {
    return localStorage.getItem('token');
  }
  // Return null when running on the server
  return null;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
        },
      })
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideAnimations(),
    provideClientHydration(),
  ],
};
