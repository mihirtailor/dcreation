import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { PortfolioService } from '../../../../services/portfolio.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-portfolio-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, FormsModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '200ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ transform: 'translateY(-100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class PortfolioAdminComponent implements OnInit {
  portfolioItems: any[] = [];
  portfolioForm!: FormGroup;
  selectedFile: File | null = null;
  tempGalleryImage: File | null = null;
  tempGalleryImages: { file: File; preview: string }[] = [];
  isLoading = false;

  constructor(
    private portfolioService: PortfolioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.loadPortfolioItems();
  }

  private initializeForm() {
    this.portfolioForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      client: ['', [Validators.required]],
      completionDate: ['', [Validators.required]],
      tags: ['', [Validators.required]],
    });
  }

  loadPortfolioItems() {
    this.portfolioService.getAllPortfolios().subscribe({
      next: (items) => {
        this.portfolioItems = items;
      },
      error: (error) => {
        this.snackBar.open('Error loading portfolio items', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.isValidImageFile(file)) {
      this.selectedFile = file;
    } else {
      this.snackBar.open(
        'Please select a valid image file (JPG, PNG, or GIF)',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
      event.target.value = '';
    }
  }

  onSingleGalleryImageSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.isValidImageFile(file)) {
      this.tempGalleryImage = file;
    } else {
      this.snackBar.open(
        'Please select a valid image file (JPG, PNG, or GIF)',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
      event.target.value = '';
    }
  }

  addToGalleryQueue() {
    if (this.tempGalleryImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempGalleryImages.push({
          file: this.tempGalleryImage!,
          preview: e.target.result,
        });
        this.tempGalleryImage = null;
      };
      reader.readAsDataURL(this.tempGalleryImage);
    }
  }

  removeTempImage(index: number) {
    this.tempGalleryImages.splice(index, 1);
  }

  removeGalleryImage(item: any, index: number) {
    const updatedGallery = [...item.gallery];
    updatedGallery.splice(index, 1);

    const formData = new FormData();
    formData.append('gallery', JSON.stringify(updatedGallery));

    this.portfolioService.updatePortfolio(item.id, formData).subscribe({
      next: () => {
        item.gallery = updatedGallery;
        this.snackBar.open('Image removed from gallery', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.snackBar.open('Error removing image', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  uploadPortfolio() {
    if (this.portfolioForm.valid && this.selectedFile) {
      this.isLoading = true;
      const formData = new FormData();

      formData.append('image', this.selectedFile);
      this.tempGalleryImages.forEach((image) => {
        formData.append('gallery', image.file);
      });

      Object.keys(this.portfolioForm.value).forEach((key) => {
        formData.append(key, this.portfolioForm.get(key)?.value);
      });

      this.portfolioService.createPortfolio(formData).subscribe({
        next: () => {
          this.snackBar.open('Portfolio item created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.loadPortfolioItems();
          this.resetForm();
        },
        error: (error) => {
          this.snackBar.open('Error creating portfolio item', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  updatePortfolio(portfolio: any) {
    if (portfolio.isEditing) {
      this.isLoading = true;
      const formData = new FormData();

      // Handle tags if they're a string
      const tags =
        typeof portfolio.tags === 'string'
          ? portfolio.tags.split(',').map((tag: string) => tag.trim())
          : portfolio.tags;

      // Basic portfolio data
      formData.append('title', portfolio.title);
      formData.append('category', portfolio.category);
      formData.append('description', portfolio.description);
      formData.append('client', portfolio.client);
      formData.append('completionDate', portfolio.completionDate);
      formData.append('tags', JSON.stringify(tags));

      // Handle gallery images
      if (this.tempGalleryImages.length > 0) {
        this.tempGalleryImages.forEach((image) => {
          formData.append('gallery', image.file);
        });
      }

      if (portfolio.gallery?.length > 0) {
        formData.append('existingGallery', JSON.stringify(portfolio.gallery));
      }

      this.portfolioService.updatePortfolio(portfolio.id, formData).subscribe({
        next: () => {
          this.loadPortfolioItems();
          portfolio.isEditing = false;
          this.tempGalleryImages = [];
          this.isLoading = false;

          this.snackBar.open('Portfolio updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
        },
        error: (error) => {
          console.error('Update error:', error);
          this.snackBar.open('Error updating portfolio item', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
          this.isLoading = false;
        },
      });
    }
  }

  deletePortfolio(id: number) {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      this.isLoading = true;
      this.portfolioService.deletePortfolio(id).subscribe({
        next: () => {
          this.loadPortfolioItems();
          this.snackBar.open('Portfolio item deleted successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        error: (error) => {
          this.snackBar.open('Error deleting portfolio item', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  private isValidImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(file.type);
  }

  private resetForm() {
    this.portfolioForm.reset();
    this.selectedFile = null;
    this.tempGalleryImages = [];
  }
}
