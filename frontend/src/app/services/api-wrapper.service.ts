import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { SsrService } from './ssr.service';

@Injectable({
    providedIn: 'root'
})
export class ApiWrapperService {
    constructor(
        private http: HttpClient,
        private ssrService: SsrService
    ) { }

    get<T>(url: string, mockData: T = [] as unknown as T): Observable<T> {
        // During SSR, return mock data instead of making API calls
        if (this.ssrService.isServer()) {
            console.log(`[SSR] Using mock data for ${url}`);
            return of(mockData);
        }

        // On client, make the actual API call with error handling
        return this.http.get<T>(url).pipe(
            timeout(5000),
            catchError(error => {
                console.error(`Error fetching ${url}:`, error);
                return of(mockData);
            })
        );
    }

    post<T>(url: string, body: any, mockData: T = {} as unknown as T): Observable<T> {
        if (this.ssrService.isServer()) {
            console.log(`[SSR] Using mock data for ${url}`);
            return of(mockData);
        }

        return this.http.post<T>(url, body).pipe(
            timeout(5000),
            catchError(error => {
                console.error(`Error posting to ${url}:`, error);
                return of(mockData);
            })
        );
    }
}
