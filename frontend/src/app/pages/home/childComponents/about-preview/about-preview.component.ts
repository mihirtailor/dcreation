import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about-preview.component.html',
  styleUrl: './about-preview.component.scss',
  animations: [
    trigger('imageStack', [
      transition(':enter', [
        query('.main-image, .accent-image', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(200, [
            animate(
              '800ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
        ]),
      ]),
    ]),
    trigger('badge', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate(
          '600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
    trigger('content', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(150, [
            animate(
              '600ms ease',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
        ]),
      ]),
    ]),
    trigger('cards', [
      transition(':enter', [
        query('.card', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(200, [
            animate(
              '600ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class AboutPreviewComponent implements AfterViewInit {
  @ViewChild('animatedSection') animatedSection!: ElementRef;
  isVisible = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.cdr.detectChanges();
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );
      observer.observe(this.animatedSection.nativeElement);
    } else {
      this.isVisible = true;
      this.cdr.detectChanges();
    }
  }
}
