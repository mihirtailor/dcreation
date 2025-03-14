import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  order_number: number;
  isEditing?: boolean;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
  features: string[];
  categoryId: number;
  order_number: number;
  isEditing?: boolean;
  newImage?: File | null;
  previewUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AvailableService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Service methods
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`);
  }

  createService(formData: FormData): Observable<Service> {
    return this.http.post<Service>(`${this.apiUrl}/services`, formData);
  }

  updateService(id: number, formData: FormData) {
    return this.http.put<Service>(`${this.apiUrl}/services/${id}`, formData);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/services/${id}`);
  }

  // Category methods for services
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/service-categories`);
  }

  createCategory(data: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/service-categories`, data);
  }

  updateCategory(id: number, data: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/service-categories/${id}`, data);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/service-categories/${id}`);
  }

}
