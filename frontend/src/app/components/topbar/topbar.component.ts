import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  isScrolled = false;
  email = 'info@dcreation.com';

  constructor(private router: Router) { }

  get isHomePage(): boolean {
    return this.router.url === '/home' || this.router.url === '/';
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.isHomePage) {
      this.isScrolled = window.scrollY > 50;
    } else {
      this.isScrolled = true;
    }
  }
}
