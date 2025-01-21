import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  private scrollHandler: () => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.scrollHandler = () => {
      if (isPlatformBrowser(this.platformId)) {
        const scrolled = window.scrollY > window.innerHeight / 2;
        document.body.classList.toggle('scrolled', scrolled);
      }
    };
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.scrollHandler);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }
}
