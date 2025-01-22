import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderService } from '../../services/slider.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  router: Router = inject(Router);
  sliderService = inject(SliderService);

  slides: any[] = [];
  selectedFile: File | null = null;

  newSlide = {
    title: '',
    description: '',
  };

  ngOnInit() {
    this.loadSlides();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }

  loadSlides() {
    this.sliderService.getSlides().subscribe((data) => {
      this.slides = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadSlide() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('title', this.newSlide.title);
      formData.append('description', this.newSlide.description);

      this.sliderService.uploadSlide(formData).subscribe(() => {
        this.loadSlides();
        this.selectedFile = null;
        this.newSlide = { title: '', description: '' };
      });
    }
  }

  deleteSlide(id: number) {
    this.sliderService.deleteSlide(id).subscribe(() => {
      this.loadSlides();
    });
  }
}
