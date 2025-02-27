import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  AvailableService,
  Category,
  Service,
} from '../../services/availabe-service.service';
import { ContactCtaComponent } from "../../components/contact-cta/contact-cta.component";

@Component({
  selector: 'app-available-services',
  standalone: true,
  imports: [CommonModule, ContactCtaComponent],
  templateUrl: './available-services.component.html',
  styleUrls: ['./available-services.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(40px)', opacity: 0 }),
        animate(
          '600ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class AvailableServicesComponent implements OnInit {
  serviceHero = {
    title: '',
    subtitle: '',
    imageUrl: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1740625229/service_offer_zgzwgd.jpg',
  };

  serviceCategories: (Category & { services: Service[] })[] = [];

  testimonials = [
    {
      id: 1,
      name: 'John Smith',
      company: 'Tech Solutions Inc.',
      comment:
        'Outstanding quality and service. Highly recommended for all printing needs.',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    // ... other testimonials remain the same
  ];

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private availableService: AvailableService
  ) { }

  ngOnInit(): void {
    this.loadCategoriesAndServices();
  }

  loadCategoriesAndServices(): void {
    this.availableService.getCategories().subscribe((categories) => {
      this.availableService.getServices().subscribe((services) => {
        this.serviceCategories = categories.map((category) => ({
          ...category,
          services: services.filter(
            (service) => service.categoryId === category.id
          ),
        }));
      });
    });
  }

  scrollToCategory(categoryId: number): void {
    this.viewportScroller.scrollToAnchor(`category-${categoryId}`);
  }

  requestQuote(serviceId: number): void {
    this.router.navigate(['/contact'], {
      queryParams: { service: serviceId }
    }).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
