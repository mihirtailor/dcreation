import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { PortfolioService } from '../../services/portfolio.service';
import {
  NgbModal,
  NgbModule,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ContactCtaComponent } from "../../components/contact-cta/contact-cta.component";


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
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, NgbModule, NgbCarouselModule, ContactCtaComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    trigger('staggerFade', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger('100ms', [
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => *', [
        query(
          '.masonry-item',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(60, [
              animate(
                '400ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class PortfolioComponent implements OnInit {
  selectedCategory: string = 'all';
  categories: string[] = ['all'];
  portfolioItems: PortfolioItem[] = [];
  filteredItems: PortfolioItem[] = [];
  selectedItem!: PortfolioItem;
  private modalService = inject(NgbModal);
  portfolioCategories: any[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.loadPortfolioItems();
    this.loadCategories();
  }

  loadCategories() {
    this.portfolioService.getCategories().subscribe({
      next: (categories) => {
        this.portfolioCategories = categories;
        // Add category names to the categories array
        this.categories = ['all', ...categories.map(cat => cat.id.toString())];
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }


  getCategoryName(categoryId: string): string {
    const category = this.portfolioCategories.find(c => c.id.toString() === categoryId?.toString());
    return category ? category.name : categoryId;
  }

  loadPortfolioItems() {
    this.portfolioService.getAllPortfolios().subscribe({
      next: (items) => {
        this.portfolioItems = items;
        this.filterItems(this.selectedCategory);
      },
      error: (error) => {
        console.error('Error loading portfolio items:', error);
      },
    });
  }

  filterItems(category: string): void {
    this.selectedCategory = category;
    this.filteredItems =
      category === 'all'
        ? this.portfolioItems
        : this.portfolioItems.filter((item) => item.category === category);
  }

  openLightbox(item: PortfolioItem, content: any) {
    this.selectedItem = item;
    this.modalService.open(content, {
      size: 'xl',
      centered: true,
      windowClass: 'portfolio-modal',
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
