import { Component } from '@angular/core';
import { HeroComponent } from './childComponents/hero/hero.component';
import { AboutPreviewComponent } from './childComponents/about-preview/about-preview.component';
import { ServicesPreviewComponent } from './childComponents/services-preview/services-preview.component';
import { PortfolioPreviewComponent } from './childComponents/portfolio-preview/portfolio-preview.component';
import { TestimonialsComponent } from './childComponents/testimonials/testimonials.component';
import { ContactCtaComponent } from './childComponents/contact-cta/contact-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutPreviewComponent,
    ServicesPreviewComponent,
    PortfolioPreviewComponent,
    TestimonialsComponent,
    ContactCtaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
