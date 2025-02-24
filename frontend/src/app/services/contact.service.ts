import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:5000/api';

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
