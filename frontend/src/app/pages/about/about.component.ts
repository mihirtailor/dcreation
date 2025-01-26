import { Component } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStep {
  title: string;
  icon: string;
  description: string;
}

interface Testimonial {
  quote: string;
  name: string;
  company: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatStepperModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('cardHover', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
          boxShadow: 'none',
        })
      ),
      state(
        'hovered',
        style({
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0,0,0,.2)',
        })
      ),
      transition('normal <=> hovered', animate('200ms ease-in')),
    ]),
  ],
})
export class AboutComponent {
  services: Service[] = [
    {
      icon: 'palette',
      title: 'Graphic Design',
      description:
        'Custom designs that capture your brand essence and message.',
    },
    {
      icon: 'print',
      title: 'Print Services',
      description:
        'Professional printing for business cards, brochures, banners, and more.',
    },
    {
      icon: 'brush',
      title: 'Brand Identity',
      description: 'Complete branding solutions from logos to style guides.',
    },
  ];

  designProcess: ProcessStep[] = [
    {
      title: 'Discovery',
      icon: 'search',
      description: 'Understanding your needs, goals, and vision',
    },
    {
      title: 'Concept',
      icon: 'lightbulb',
      description: 'Creating initial designs and concepts',
    },
    {
      title: 'Refine',
      icon: 'edit',
      description: 'Perfecting the design through feedback and revision',
    },
    {
      title: 'Deliver',
      icon: 'done_all',
      description: 'Final production and quality assurance',
    },
  ];

  testimonials: Testimonial[] = [
    {
      quote: 'The attention to detail and creativity exceeded my expectations!',
      name: 'Sarah Johnson',
      company: 'Local Cafe Owner',
    },
    {
      quote: 'Professional, timely, and excellent communication throughout.',
      name: 'Mike Williams',
      company: 'Real Estate Agency',
    },
    {
      quote: 'Transformed our brand identity completely. Highly recommended!',
      name: 'Lisa Chen',
      company: 'Tech Startup',
    },
  ];
}
