import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioComponent } from '../../../portfolio/portfolio.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  animation: string;
}

@Component({
  selector: 'app-portfolio-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-preview.component.html',
  styleUrl: './portfolio-preview.component.scss',
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(100px)' }),
            stagger(100, [
              animate(
                '0.5s cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '0.8s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class PortfolioPreviewComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Brand Identity Design',
      category: 'Branding',
      imageUrl: 'assets/images/hero/slide1.jpg',
      description: 'Complete brand identity design for modern tech startup',
      animation: 'fade-right',
    },
    {
      id: 2,
      title: 'Print Campaign',
      category: 'Print Design',
      imageUrl: 'assets/images/hero/slide1.jpg',
      description: 'Multi-format print campaign for retail brand',
      animation: 'fade-up',
    },
    {
      id: 3,
      title: 'Magazine Layout',
      category: 'Editorial',
      imageUrl: 'assets/images/hero/slide1.jpg',
      description: 'Editorial design for lifestyle magazine',
      animation: 'fade-left',
    },
    {
      id: 4,
      title: 'Packaging Design',
      category: 'Product',
      imageUrl: 'assets/images/hero/slide1.jpg',
      description: 'Creative packaging solution for premium product line',
      animation: 'zoom-in',
    },
    {
      id: 5,
      title: 'Exhibition Graphics',
      category: 'Large Format',
      imageUrl: 'assets/images/hero/slide1.jpg',
      description: 'Complete exhibition design and graphics',
      animation: 'flip-left',
    },
    {
      id: 6,
      title: 'Annual Report',
      category: 'Corporate',
      imageUrl: 'assets/images/hero/slide1.jpg',
      description: 'Corporate annual report design',
      animation: 'flip-right',
    },
  ];

  ngOnInit(): void {}

  viewProject(project: PortfolioItem): void {
    const modalRef = this.modalService.open(PortfolioComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'project-modal',
    });
    modalRef.componentInstance.project = project;
  }
}
