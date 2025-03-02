import { ApplicationConfig, importProvidersFrom, PLATFORM_ID, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpResponse
} from '@angular/common/http';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { routes } from './app.routes';
import { JwtModule } from '@auth0/angular-jwt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { of } from 'rxjs';
import { withInterceptors } from '@angular/common/http';

// SSR Fallback Interceptor
export const ssrFallbackInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Check if we're running on the server
  if (isPlatformServer(inject(PLATFORM_ID))) {
    console.log(`[SSR] Bypassing API call to ${req.url}`);
    // Return empty responses based on the HTTP method
    if (req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: [] }));
    } else {
      return of(new HttpResponse({ status: 200, body: { success: true } }));
    }
  }
  return next(req);
};

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
    provideHttpClient(
      withInterceptors([ssrFallbackInterceptor]), // Add SSR interceptor
      withInterceptorsFromDi(),
      withFetch()
    ),
    provideAnimations(),
    provideClientHydration(),
  ],
};
