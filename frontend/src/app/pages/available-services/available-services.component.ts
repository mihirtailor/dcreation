import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  features: string[];
}

interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  services: Service[];
}

@Component({
  selector: 'app-available-services',
  standalone: true,
  imports: [CommonModule],
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
    title: 'Professional Print & Sign Solutions',
    subtitle: 'Quality Services for All Your Business Needs',
    imageUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc',
  };

  serviceCategories: Category[] = [
    {
      id: 1,
      name: 'Design Services',
      icon: 'fas fa-pencil-ruler',
      description: 'Professional design solutions for your brand',
      services: [
        {
          id: 'design-1',
          name: 'Logo Design',
          description: 'Custom logo design with unlimited revisions',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $299',
          features: ['Multiple Concepts', 'Vector Files', 'Brand Guidelines'],
        },
      ],
    },
    {
      id: 2,
      name: 'Business Cards',
      icon: 'fas fa-id-card',
      description: 'Premium quality business cards',
      services: [
        {
          id: 'bc-1',
          name: 'Silk Laminated Business Cards',
          description: 'Premium silk finish business cards with luxurious feel',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $49',
          features: [
            'Luxurious finish',
            'Durable coating',
            'Professional look',
          ],
        },
        {
          id: 'bc-2',
          name: 'Spot UV Business Cards',
          description: 'Business cards with glossy UV coating highlights',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $59',
          features: ['Glossy highlights', 'Custom patterns', 'Premium finish'],
        },
        {
          id: 'bc-3',
          name: 'Suede Business Cards',
          description: 'Soft-touch business cards with elegant feel',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $69',
          features: ['Soft touch finish', 'Elegant look', 'Unique texture'],
        },
        {
          id: 'bc-4',
          name: 'Folded Business Cards',
          description: 'Double-sided folded business cards',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $79',
          features: ['Extra space', 'Multiple designs', 'Custom sizes'],
        },
        {
          id: 'bc-5',
          name: 'Foil Business Cards',
          description: 'Premium foil-stamped business cards',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $89',
          features: ['Metallic finish', 'Premium look', 'Multiple foil colors'],
        },
      ],
    },
    {
      id: 3,
      name: 'Marketing Materials',
      icon: 'fas fa-print',
      description: 'Essential marketing collateral',
      services: [
        {
          id: 'm-1',
          name: 'Brochures',
          description: 'Professional brochures for your business',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $149',
          features: ['Multiple folds', 'Various paper stocks', 'Full color'],
        },
        {
          id: 'm-2',
          name: 'Booklets',
          description: 'Custom booklets for any purpose',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $199',
          features: [
            'Various binding options',
            'Custom sizes',
            'Multiple pages',
          ],
        },
        {
          id: 'm-3',
          name: 'Flyers',
          description: 'Eye-catching promotional flyers',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $79',
          features: ['Quick turnaround', 'Multiple sizes', 'Bulk pricing'],
        },
      ],
    },
    {
      id: 4,
      name: 'Signs & Banners',
      icon: 'fas fa-sign',
      description: 'Professional signage solutions',
      services: [
        {
          id: 'sign-1',
          name: 'A Frame Signs',
          description: 'Durable A-frame sidewalk signs',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $199',
          features: ['Weather-resistant', 'Double-sided', 'Easy setup'],
        },
        {
          id: 'sign-2',
          name: 'Banner Signs',
          description: 'Custom banner signs for any occasion',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $129',
          features: ['Indoor/Outdoor use', 'Multiple sizes', 'Full color'],
        },
        {
          id: 'sign-3',
          name: 'Car Magnets',
          description: 'Removable car door magnets',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $49',
          features: ['Strong magnetic', 'Weather-resistant', 'Easy to remove'],
        },
        {
          id: 'sign-4',
          name: 'Window Lettering Decals',
          description: 'Professional window graphics',
          imageUrl:
            'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
          price: 'Starting from $89',
          features: ['Easy application', 'Custom sizes', 'Professional finish'],
        },
      ],
    },
  ];

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
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'Creative Design Studio',
      comment:
        'The quality of their prints and signs is exceptional. Great customer service!',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      id: 3,
      name: 'Michael Brown',
      company: 'Local Restaurant Chain',
      comment:
        'Their menu printing service is fantastic. Quick turnaround and great prices.',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
  ];

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {}

  scrollToCategory(categoryId: number): void {
    this.viewportScroller.scrollToAnchor(`category-${categoryId}`);
  }

  requestQuote(serviceId: string): void {
    this.router.navigate(['/contact'], { queryParams: { service: serviceId } });
  }
}
