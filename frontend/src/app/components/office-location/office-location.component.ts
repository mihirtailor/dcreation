import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  inject,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-office-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './office-location.component.html',
  styleUrl: './office-location.component.scss',
})
export class OfficeLocationComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private map: any;

  constructor() {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.map) {
      this.loadMap();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private async loadMap(): Promise<void> {
    const L = await import('leaflet');

    this.map = L.map('map').setView([21.186, 72.8219], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    const marker = L.marker([21.186, 72.8219])
      .addTo(this.map)
      .bindPopup(
        `
        <strong>DCreation</strong><br>
        Jash Point Complex<br>
        Kshetrapal Dada Marg, Surat
        `
      )
      .openPopup();

    this.map.zoomControl.setPosition('bottomright');
    L.control.scale().addTo(this.map);

    // Add check for map existence
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 300);
  }

  officeImages = [
    {
      src: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1737688313/bricks-2181920_1920_wnnpns.jpg',
      alt: 'Modern Reception Area',
    },
    {
      src: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1737688313/office-730681_1920_ivct8d.jpg',
      alt: 'Collaborative Workspace',
    },
    {
      src: 'https://res.cloudinary.com/dqfwg0the/image/upload/v1737688313/chairs-2181951_1920_dg8tj9.jpg',
      alt: 'Conference Room',
    },
  ];

  directions = [
    {
      icon: 'bi-geo-alt-fill',
      text: 'DCreation, Jash Point Complex, Kshetrapal Dada Marg, Surat, Gujarat 395001',
    },
    {
      icon: 'bi-train',
      text: 'Surat Railway Station: 2.5 km',
    },
  ];
}
