import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Slide {
  id: number;
  image_url: string;
  title: string;
  description: string;
  isEditing?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  uploadSlide(formData: FormData): Observable<Slide> {
    return this.http.post<Slide>(`${this.apiUrl}/upload`, formData);
  }

  getSlides(): Observable<Slide[]> {
    return this.http.get<Slide[]>(`${this.apiUrl}/slider`);
  }

  updateSlide(id: number, data: Partial<Slide>): Observable<Slide> {
    return this.http.put<Slide>(`${this.apiUrl}/slider/${id}`, data);
  }

  deleteSlide(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/slider/${id}`);
  }
}
