import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import {
  trigger,
  state,
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
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('navItemHover', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'hovered',
        style({
          transform: 'scale(1.1)',
        })
      ),
      transition('normal <=> hovered', animate('200ms ease-in-out')),
    ]),
  ],
})
export class NavbarComponent {
  isScrolled = false;
  isCollapsed = true;
  activeLink = '#home';

  navItems = [
    { name: 'HOME', link: '#home' },
    { name: 'ABOUT', link: '#about' },
    { name: 'SERVICES', link: '#services' },
    { name: 'PORTFOLIO', link: '#portfolio' },
    { name: 'CONTACT', link: '#contact' },
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
