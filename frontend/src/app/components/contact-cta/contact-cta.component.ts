import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact-cta.component.html',
  styleUrl: './contact-cta.component.scss'
})
export class ContactCtaComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  makePhoneCall() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = 'tel:+919925830109';
    }
  }
}
