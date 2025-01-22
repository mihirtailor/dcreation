import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  uploadSlide(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getSlides(): Observable<any> {
    return this.http.get(`${this.apiUrl}/slider`);
  }

  updateSlide(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/slider/${id}`, data);
  }

  deleteSlide(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/slider/${id}`);
  }
}
