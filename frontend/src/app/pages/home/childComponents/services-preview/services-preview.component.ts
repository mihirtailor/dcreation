import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(20px)' })
        ),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate(
          '800ms 200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(40px)' })
        ),
      ]),
    ]),
  ],
})
export class ServicesPreviewComponent implements AfterViewInit {
  @ViewChild('animatedSection') animatedSection!: ElementRef;
  isVisible = false;

  serviceCards = [
    {
      icon: 'fas fa-pencil-ruler',
      title: 'Graphic Design',
      description:
        'Creative solutions for your brand identity, logos, and visual materials',
      image: 'assets/images/hero/slide1.jpg',
    },
    {
      icon: 'fas fa-print',
      title: 'Print Design',
      description:
        'Professional brochures, business cards, and marketing materials',
      image: 'assets/images/hero/slide2.jpg',
    },
    {
      icon: 'fas fa-desktop',
      title: 'Digital Design',
      description:
        'Eye-catching social media graphics and digital marketing assets',
      image: 'assets/images/hero/slide3.jpg',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
}
