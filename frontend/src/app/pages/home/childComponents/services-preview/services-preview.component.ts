import { Component, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AvailableService } from '../../../../services/availabe-service.service';


@Component({
  selector: 'app-services-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-preview.component.html',
  styleUrl: './services-preview.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out')
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('800ms ease-out')
      ])
    ])
  ]
})
export class ServicesPreviewComponent implements AfterViewInit, OnInit {
  @ViewChild('animatedSection') animatedSection!: ElementRef;
  isVisible = false;
  serviceCards: {
    id: number;
    icon: string;
    title: string;
    description: string;
    link: string;
  }[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private availableService: AvailableService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadServices();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.isVisible = entry.isIntersecting;
        },
        {
          threshold: 0.1,
          rootMargin: '-50px',
        }
      );
      observer.observe(this.animatedSection.nativeElement);
    }
  }

  loadServices() {
    this.availableService.getCategories().subscribe(categories => {
      this.availableService.getServices().subscribe(services => {
        const previewServices = categories.slice(0, 4).map(category => {
          return {
            id: category.id,
            icon: category.icon.includes('fas') ? category.icon : `fas ${category.icon}`,
            title: category.name,
            description: category.description,
            link: `category-${category.id}` // Remove the /services prefix
          };
        });
        this.serviceCards = previewServices;
      });
    });
  }


  navigateToService(categoryId: number) {
    const elementId = `category-${categoryId}`;
    this.router.navigate(['/services']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    });
  }

  getAnimationDelay(index: number): { delay: number } {
    return { delay: 100 * index };
  }
}
