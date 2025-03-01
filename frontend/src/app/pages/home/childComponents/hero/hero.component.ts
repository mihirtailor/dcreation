import { AfterViewInit, Component, OnDestroy, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SliderService } from '../../../../services/slider.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  active = 0;
  sliderItems: any[] = [];
  private refreshInterval: any;
  isDataLoaded = false;

  constructor(
    private sliderService: SliderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    // Data fetching is safe on both server and browser
    this.sliderService.getSlides().subscribe(
      (slides) => {
        this.sliderItems = slides;

        // Only start image rotation in browser context
        if (isPlatformBrowser(this.platformId)) {
          this.startImageRotation();
        }
      },
      (error) => {
        console.error('Error loading slides:', error);
      }
    );
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    // Safe cleanup regardless of platform
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadSlides() {
    this.sliderService.getSlides().subscribe((slides) => {
      this.sliderItems = slides;
    });
  }

  private startImageRotation() {
    this.refreshInterval = setInterval(() => {
      this.active = (this.active + 1) % this.sliderItems.length;
    }, 5000);
  }
}
