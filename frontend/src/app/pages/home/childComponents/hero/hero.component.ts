import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SliderService } from '../../../../services/slider.service';
import { CommonModule } from '@angular/common';
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

  constructor(private sliderService: SliderService) { }

  ngOnInit() {
    this.sliderService.getSlides().subscribe(
      (slides) => {
        this.sliderItems = slides;
        this.startImageRotation();
      },
      (error) => {
        console.error('Error loading slides:', error);
      }
    );
  }


  ngAfterViewInit() {
  }

  ngOnDestroy() {
    clearInterval(this.refreshInterval);
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
