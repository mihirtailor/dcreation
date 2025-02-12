import { Component, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-preview.component.html',
  styleUrl: './services-preview.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ]
})
export class ServicesPreviewComponent implements AfterViewInit {
  @ViewChild('animatedSection') animatedSection!: ElementRef;
  isVisible = false;

  serviceCards = [
    {
      id: 1,
      icon: 'fas fa-layer-group',
      title: 'Professional Printing',
      description: 'High-quality printing services for all your business needs',
      link: '/services#printing'
    },
    {
      id: 2,
      icon: 'fas fa-vector-square',
      title: 'Sign Solutions',
      description: 'Custom signage and displays for maximum impact',
      link: '/services#signs'
    },
    {
      id: 3,
      icon: 'fas fa-bezier-curve',
      title: 'Graphic Design',
      description: 'Creative solutions for your brand identity',
      link: '/services#design'
    },
    {
      id: 4,
      icon: 'fas fa-palette',
      title: 'Custom Branding',
      description: 'Comprehensive branding solutions for your business',
      link: '/services#branding'
    },
    {
      id: 5,
      icon: 'fas fa-cube',
      title: 'Packaging Design',
      description: 'Innovative packaging solutions that stand out',
      link: '/services#packaging'
    },
    {
      id: 6,
      icon: 'fas fa-laptop-code',
      title: 'Digital Services',
      description: 'Modern digital solutions for the digital age',
      link: '/services#digital'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

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

  getAnimationDelay(index: number): { delay: number } {
    return { delay: 100 * index };
  }
}
