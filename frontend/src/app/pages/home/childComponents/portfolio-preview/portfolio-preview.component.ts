import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { PortfolioService } from '../../../../services/portfolio.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  gallery: string[];
  description: string;
  client: string;
  completionDate: string;
  tags: string[];
}

@Component({
  selector: 'app-portfolio-preview',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule],
  templateUrl: './portfolio-preview.component.html',
  styleUrl: './portfolio-preview.component.scss'
})
export class PortfolioPreviewComponent implements OnInit {
  portfolioItems: PortfolioItem[] = [];
  selectedItem!: PortfolioItem;
  portfolioCategories: any[] = [];
  private portfolioService = inject(PortfolioService);
  private modalService = inject(NgbModal);

  ngOnInit() {
    this.loadFeaturedPortfolioItems();
    this.loadCategories();
  }

  loadFeaturedPortfolioItems() {
    this.portfolioService.getAllPortfolios().subscribe({
      next: (items) => {
        this.portfolioItems = items.slice(0, 3);
      },
      error: (error) => {
        console.error('Error loading featured portfolio items:', error);
      }
    });
  }

  viewProject(project: PortfolioItem, content: any) {
    this.selectedItem = project;
    this.modalService.open(content, {
      size: 'xl',
      centered: true,
      windowClass: 'portfolio-modal',
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  getCategoryName(categoryId: string): string {
    const category = this.portfolioCategories.find(c => c.id.toString() === categoryId?.toString());
    return category ? category.name : categoryId;
  }

  loadCategories() {
    this.portfolioService.getCategories().subscribe({
      next: (categories) => {
        this.portfolioCategories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }
}
