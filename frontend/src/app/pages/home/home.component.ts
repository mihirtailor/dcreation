import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sliderList') sliderList!: ElementRef;

  isPaused = false;
  private lengthItems: number = 2;
  active = 0;
  private refreshInterval: any;
  isBrowser: boolean;
  private isAnimating = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startSliderInterval();
      this.updateActiveClass();
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.reloadSlider();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      clearInterval(this.refreshInterval);
    }
  }

  next() {
    if (this.isAnimating) return;

    const isLastToFirst = this.active + 1 > this.lengthItems;
    this.active = isLastToFirst ? 0 : this.active + 1;

    if (isLastToFirst) {
      this.isAnimating = true;
      const firstSlide =
        this.sliderList.nativeElement.children[0].cloneNode(true);
      this.sliderList.nativeElement.appendChild(firstSlide);

      this.sliderList.nativeElement.style.transition = 'left 1s ease';
      const lastItemOffset =
        this.sliderList.nativeElement.children[this.lengthItems].offsetLeft;
      this.sliderList.nativeElement.style.left = `-${lastItemOffset}px`;

      setTimeout(() => {
        this.sliderList.nativeElement.style.transition = 'none';
        this.sliderList.nativeElement.style.left = '0';
        this.sliderList.nativeElement.removeChild(
          this.sliderList.nativeElement.lastChild
        );
        this.isAnimating = false;
      }, 500);
    } else {
      this.reloadSlider();
    }
    this.updateActiveClass();
    this.updateDots();
  }

  prev() {
    if (this.isAnimating) return;

    const isFirstToLast = this.active - 1 < 0;
    this.active = isFirstToLast ? this.lengthItems : this.active - 1;

    if (isFirstToLast) {
      this.isAnimating = true;
      const lastSlide =
        this.sliderList.nativeElement.children[this.lengthItems].cloneNode(
          true
        );
      this.sliderList.nativeElement.insertBefore(
        lastSlide,
        this.sliderList.nativeElement.firstChild
      );

      this.sliderList.nativeElement.style.transition = 'none';
      const firstItemOffset =
        this.sliderList.nativeElement.children[0].offsetLeft;
      this.sliderList.nativeElement.style.left = `-${firstItemOffset}px`;

      setTimeout(() => {
        this.sliderList.nativeElement.style.transition = 'left 1s ease';
        this.sliderList.nativeElement.style.left = '0';

        setTimeout(() => {
          this.sliderList.nativeElement.removeChild(
            this.sliderList.nativeElement.firstChild
          );
          this.isAnimating = false;
        }, 500);
      }, 50);
    } else {
      this.reloadSlider();
    }
    this.updateActiveClass();
    this.updateDots();
  }

  setActive(index: number) {
    this.active = index;
    this.reloadSlider();
    this.updateActiveClass();
  }

  private updateActiveClass() {
    if (this.isBrowser) {
      const items = document.querySelectorAll('.slider .list .item');
      items.forEach((item, index) => {
        if (index === this.active) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  private reloadSlider() {
    if (this.isBrowser && this.sliderList?.nativeElement) {
      const items =
        this.sliderList.nativeElement.getElementsByClassName('item');
      if (items[this.active]) {
        this.sliderList.nativeElement.style.transition = 'left 1s ease';
        this.sliderList.nativeElement.style.left = `-${
          items[this.active].offsetLeft
        }px`;
        this.updateDots();
        this.startSliderInterval();
      }
    }
  }

  private updateDots() {
    const dots = document.querySelectorAll('.slider .dots li');
    const lastActiveDot = document.querySelector('.slider .dots li.active');
    if (lastActiveDot && dots[this.active]) {
      lastActiveDot.classList.remove('active');
      dots[this.active].classList.add('active');
    }
  }

  onSliderMouseEnter() {
    this.isPaused = true;
    clearInterval(this.refreshInterval);
  }

  onSliderMouseLeave() {
    this.isPaused = false;
    this.startSliderInterval();
  }

  private startSliderInterval() {
    if (!this.isPaused) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = setInterval(() => this.next(), 5000);
    }
  }
}
