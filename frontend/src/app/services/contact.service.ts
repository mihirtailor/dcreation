import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  submitContactForm(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, formData);
  }

  getContactRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contact`);
  }

  getUnreadCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contact/unread`);
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/contact/${id}/read`, {});
  }

  getServices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/services`);
  }
}
