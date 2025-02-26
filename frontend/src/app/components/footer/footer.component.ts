import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate(
          '0.4s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  email = '';

  contactInfo = {
    address: "D'Creation, Jash Point Complex, Sagrampura, Surat, Gujarat, India 395001",
    phone: '+91 9925830109',
    email: 'info@dcreation.com',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
  };

  socialLinks = [
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/parixittopiwala/', label: 'Instagram' },
    { icon: 'fab fa-facebook', url: 'https://www.facebook.com/parixit.topiwala.50/', label: 'Facebook' },
  ];

  services = [
    'Graphic Design',
    'Web Development',
    'Brand Identity',
    'Digital Marketing',
    'UI/UX Design',
    'Print Design',
  ];
}
