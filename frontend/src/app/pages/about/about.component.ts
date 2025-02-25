import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ContactCtaComponent } from "../../components/contact-cta/contact-cta.component";
import { CountUpModule } from 'ngx-countup';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    ContactCtaComponent,
    CountUpModule,
    NgbCarouselModule
  ],
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
        animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(40px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
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
  ownerName: string = 'PARIXIT TOPIWALA';
  approach: string = 'I believe in a personalized approach, working closely with each client to understand their unique needs and deliver solutions that exceed expectations.';
  promise: string = 'Every project receives my dedicated attention and commitment to excellence, ensuring the highest quality results for your business.';

  statistics = [
    { icon: 'fas fa-project-diagram', count: 1000, title: 'Projects Completed', duration: 2 },
    { icon: 'fas fa-users', count: 500, title: 'Happy Clients', duration: 2 },
    { icon: 'fas fa-calendar-alt', count: 30, title: 'Years Experience', duration: 2 }
  ];

  testimonials = [
    {
      id: 1,
      title: 'Excellent Communication and Design Skills',
      text: 'Parixit Topiwala was amazing to work with. They listened carefully to my ideas and provided multiple options to choose from.',
      name: 'Nayan Choksi',
      company: 'MaxMedia Photo Studio'
    },
    {
      id: 2,
      title: 'Outstanding Creativity and Professionalism',
      text: 'Parixit Topiwala is a true professional. They delivered a high-quality product on time and within budget.',
      name: 'Haarsha Yaadav',
      company: "Hershe's Family Salon"
    },
    {
      id: 3,
      title: 'Top-Notch Service and Attention to Detail',
      text: "The branding materials created by D'Creation were stunning. Their attention to detail and commitment to excellence are unmatched.",
      name: 'Dr. Dinesh Shah',
      company: "NOMARK Clinic"
    }
  ];

  featuredProjects = [
    {
      image: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1740450804/mobile_place_collase_col2x3.jpg',
      title: 'Corporate Rebranding',
      category: 'Brand Identity'
    },
    {
      image: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1740451080/Birdland_jpeg_fjatbj.jpg',
      title: 'Marketing Collateral',
      category: 'Print Design'
    },
    {
      image: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1740451099/portfolio_background_vuwu15.jpg',
      title: 'Creative Portfolio',
      category: 'Brochure Design'
    }
  ];

  services = [
    {
      icon: 'fas fa-pencil-ruler',
      title: 'Graphic Design',
      description: 'Custom designs tailored to your brand identity and business needs.',
    },
    {
      icon: 'fas fa-print',
      title: 'Professional Printing',
      description: 'High-quality printing services for all your marketing materials.',
    },
    {
      icon: 'fas fa-ad',
      title: 'Advertising Media',
      description: 'Strategic advertising solutions across multiple media channels.',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }
}
