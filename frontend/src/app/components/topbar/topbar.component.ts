import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  email: String = 'info@dcreation.com';
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const topbar = document.querySelector('.top-bar');
    if (window.scrollY > 50) {
      topbar?.classList.add('scrolled');
    } else {
      topbar?.classList.remove('scrolled');
    }
  }
}
