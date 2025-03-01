import { Component, OnDestroy, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private autoSlideInterval: any;
  testimonials = [
    {
      image: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1740614422/11_rscmpw.jpg',
      quote:
        'The graphic design work was exceptional! They perfectly captured our brand essence.',
      name: 'Rohan Patel',
      role: 'Delicacy Amul Parlour',
    },
    {
      image: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1740614485/17_waiojb.jpg',
      quote:
        'Outstanding print quality and attention to detail. Highly recommended!',
      name: 'Hiren Bhatt',
      role: 'Fabrico Garments',
    },
    {
      image: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1740614513/20_saejnq.jpg',
      quote:
        'Their design expertise transformed our brand identity completely.',
      name: 'Mahesh Desai',
      role: 'Farm A Sea Bistro',
    },
    {
      image: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1740614557/08_hsf0eg.jpg',
      quote:
        'The creative solutions provided were exactly what our brand needed.',
      name: 'Hemant Gangani',
      role: 'Clay Photo Studio',
    },
    {
      image: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1740614530/10_y8locs.jpg',
      quote:
        'Their design expertise and collaborative approach made the entire process seamless.',
      name: 'Nirav Doshi',
      role: 'Dot To Infinity',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  private startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  private stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  currentIndex = 0;
  visibleTestimonials = this.testimonials.slice(0, 3);

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.updateVisibleTestimonials();
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoSlide();
      this.startAutoSlide();
    }
  }

  previousSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
    this.updateVisibleTestimonials();
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoSlide();
      this.startAutoSlide();
    }
  }

  private updateVisibleTestimonials() {
    this.visibleTestimonials = [
      this.testimonials[this.currentIndex],
      this.testimonials[(this.currentIndex + 1) % this.testimonials.length],
      this.testimonials[(this.currentIndex + 2) % this.testimonials.length],
    ];
  }
}
