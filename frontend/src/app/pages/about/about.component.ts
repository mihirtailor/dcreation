import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '600ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '600ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
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
    trigger('bounce', [
      state('*', style({ transform: 'translateY(0)' })),
      transition('* => *', [
        animate('300ms ease-in', style({ transform: 'translateY(-10px)' })),
        animate('300ms ease-out', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  ownerName: string = 'John Doe';
  ownerBio: string =
    "With over 15 years of experience in graphic design and printing, I've helped countless businesses bring their creative visions to life. My passion for design and commitment to quality drives every project we undertake.";

  yearsInBusiness: number = 15;
  completedProjects: number = 1000;
  satisfiedClients: number = 500;

  services = [
    {
      icon: 'fas fa-pencil-ruler',
      title: 'Graphic Design',
      description:
        'Custom designs tailored to your brand identity and business needs.',
    },
    {
      icon: 'fas fa-print',
      title: 'Professional Printing',
      description:
        'High-quality printing services for all your marketing materials.',
    },
    {
      icon: 'fas fa-palette',
      title: 'Brand Identity',
      description:
        'Comprehensive branding solutions to make your business stand out.',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }
}
