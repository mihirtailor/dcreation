import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  testimonials = [
    {
      image: 'assets/images/client1.jpg',
      quote:
        'The graphic design work was exceptional! They perfectly captured our brand essence.',
      name: 'John Smith',
      role: 'Marketing Director',
    },
    {
      image: 'assets/images/client2.jpg',
      quote:
        'Outstanding print quality and attention to detail. Highly recommended!',
      name: 'Sarah Johnson',
      role: 'Creative Lead',
    },
    {
      image: 'assets/images/client3.jpg',
      quote:
        'Their design expertise transformed our brand identity completely.',
      name: 'Michael Brown',
      role: 'CEO, Design Studio',
    },
    {
      image: 'assets/images/client4.jpg',
      quote:
        'Professional, creative, and always delivering beyond expectations.',
      name: 'Emma Davis',
      role: 'Art Director',
    },
  ];

  currentIndex = 0;
  visibleTestimonials = this.testimonials.slice(0, 3);

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.updateVisibleTestimonials();
  }

  previousSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
    this.updateVisibleTestimonials();
  }

  private updateVisibleTestimonials() {
    this.visibleTestimonials = [
      this.testimonials[this.currentIndex],
      this.testimonials[(this.currentIndex + 1) % this.testimonials.length],
      this.testimonials[(this.currentIndex + 2) % this.testimonials.length],
    ];
  }
}
