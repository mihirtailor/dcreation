import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class NavbarComponent {
  isScrolled = false;
  isCollapsed = true;
  activeLink = '#home';

  constructor(private router: Router) { }

  get isHomePage(): boolean {
    return this.router.url === '/home' || this.router.url === '/';
  }

  navItems = [
    { name: 'HOME', link: 'home' },
    { name: 'ABOUT', link: 'about' },
    { name: 'SERVICES', link: 'services' },
    { name: 'PORTFOLIO', link: 'portfolio' },
    { name: 'CONTACT', link: 'contact' }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.isHomePage) {
      this.isScrolled = window.scrollY > 50;
    } else {
      this.isScrolled = true;
    }
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
