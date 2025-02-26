import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  gallery: string[];
  description: string;
  client: string;
  completionDate: string;
  tags: string[];
  public_id: string;
}

export interface PortfolioCategory {
  id: number;
  name: string;
  icon: string;
  description: string;
  order_number: number;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Existing Portfolio Methods
  getAllPortfolios(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(`${this.apiUrl}/portfolios`);
  }

  createPortfolio(formData: FormData): Observable<PortfolioItem> {
    return this.http.post<PortfolioItem>(`${this.apiUrl}/portfolios`, formData);
  }

  updatePortfolio(id: number, formData: FormData): Observable<PortfolioItem> {
    return this.http.put<PortfolioItem>(`${this.apiUrl}/portfolios/${id}`, formData);
  }

  deletePortfolio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/portfolios/${id}`);
  }

  // New Category Methods
  getCategories(): Observable<PortfolioCategory[]> {
    return this.http.get<PortfolioCategory[]>(`${this.apiUrl}/categories`);
  }

  createCategory(category: Partial<PortfolioCategory>): Observable<PortfolioCategory> {
    return this.http.post<PortfolioCategory>(`${this.apiUrl}/categories`, category);
  }

  updateCategory(id: number, category: Partial<PortfolioCategory>): Observable<PortfolioCategory> {
    return this.http.put<PortfolioCategory>(`${this.apiUrl}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }
}
