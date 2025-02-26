import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'shared-contact-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-cta.component.html',
  styleUrls: ['./contact-cta.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(40px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('bounce', [
      state('*', style({ transform: 'translateY(0)' })),
      transition('* => *', [
        animate('300ms ease-in', style({ transform: 'translateY(-10px)' })),
        animate('300ms ease-out', style({ transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ContactCtaComponent {
  constructor(private router: Router) { }

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
