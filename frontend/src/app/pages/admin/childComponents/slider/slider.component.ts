import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Slide, SliderService } from '../../../../services/slider.service';

@Component({
  selector: 'app-slider',
  imports: [CommonModule, FormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements OnInit {
  router: Router = inject(Router);
  sliderService = inject(SliderService);

  slides: Slide[] = [];
  selectedFile: File | null = null;
  isLoading = false;

  newSlide = {
    title: '',
    description: '',
  };

  ngOnInit() {
    this.loadSlides();
  }

  loadSlides() {
    this.sliderService.getSlides().subscribe((data) => {
      console.log('Raw slides data:', data);
      data.forEach((slide: any) => {
        console.log('Individual slide:', {
          id: slide.id,
          imageUrl: slide.image_url,
          title: slide.title,
          description: slide.description,
        });
      });
      this.slides = data;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.isValidImageFile(file)) {
      this.selectedFile = file;
    } else {
      alert('Please select a valid image file (JPG, PNG, or GIF)');
      event.target.value = '';
    }
  }

  uploadSlide() {
    if (this.selectedFile && this.isValidForm()) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('title', this.newSlide.title);
      formData.append('description', this.newSlide.description);

      this.sliderService.uploadSlide(formData).subscribe({
        next: () => {
          this.loadSlides();
          this.resetForm();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error uploading slide:', error);
          this.isLoading = false;
        },
      });
    }
  }

  deleteSlide(id: number) {
    if (confirm('Are you sure you want to delete this slide?')) {
      this.isLoading = true;
      this.sliderService.deleteSlide(id).subscribe({
        next: () => {
          this.loadSlides();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting slide:', error);
          this.isLoading = false;
        },
      });
    }
  }

  // Add update slide method
  updateSlide(slide: Slide) {
    this.isLoading = true;
    this.sliderService
      .updateSlide(slide.id, {
        title: slide.title,
        description: slide.description,
      })
      .subscribe({
        next: () => {
          this.loadSlides();
          slide.isEditing = false;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating slide:', error);
          this.isLoading = false;
        },
      });
  }

  onUpdateImageSelected(event: any, slide: Slide) {
    const file = event.target.files[0];
    if (file && this.isValidImageFile(file)) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('image', file);

      this.sliderService.updateSlideImage(slide.id, formData).subscribe({
        next: (response: any) => {
          slide.image_url = response.url;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating image:', error);
          this.isLoading = false;
        }
      });
    }
  }


  private isValidImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(file.type);
  }

  private isValidForm(): boolean {
    return (
      this.newSlide.title.trim() !== '' &&
      this.newSlide.description.trim() !== ''
    );
  }

  private resetForm() {
    this.selectedFile = null;
    this.newSlide = { title: '', description: '' };
  }
}
