import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import {
  AvailableService,
  Category,
  Service,
} from '../../../../services/availabe-service.service';

@Component({
  selector: 'app-services-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  categories: Category[] = [];
  selectedFile: File | null = null;
  isLoading = false;
  categoryForm!: FormGroup;
  serviceForm!: FormGroup;

  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor(
    private availableServices: AvailableService,
    private fb: FormBuilder
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    this.loadServices();
    this.loadCategories();
  }

  private initializeForms() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.serviceForm = this.fb.group({
      categoryId: [0, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['Starting from ₹', Validators.required],
      features: this.fb.array([this.fb.control('')]),
    });
  }

  get features() {
    return this.serviceForm.get('features') as FormArray;
  }

  loadServices() {
    this.availableServices.getServices().subscribe((services) => {
      this.services = services;
    });
  }

  loadCategories() {
    this.availableServices.getCategories().subscribe((categories) => {
      this.categories = categories;
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

  addFeatureField() {
    this.features.push(this.fb.control(''));
  }

  removeFeatureField(index: number) {
    this.features.removeAt(index);
  }

  createCategory() {
    if (this.categoryForm.valid) {
      this.isLoading = true;
      this.availableServices.createCategory(this.categoryForm.value).subscribe({
        next: () => {
          this.loadCategories();
          this.categoryForm.reset();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating category:', error);
          this.isLoading = false;
        },
      });
    }
  }

  uploadService() {
    if (this.selectedFile && this.serviceForm.valid) {
      this.isLoading = true;
      const formData = new FormData();

      formData.append('image', this.selectedFile);
      formData.append('name', this.serviceForm.get('name')?.value);
      formData.append(
        'description',
        this.serviceForm.get('description')?.value
      );
      formData.append('price', this.serviceForm.get('price')?.value);
      formData.append('categoryId', this.serviceForm.get('categoryId')?.value);
      formData.append('features', JSON.stringify(this.features.value));

      this.availableServices.createService(formData).subscribe({
        next: () => {
          this.snackBar.open('Service created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.loadServices();
          this.resetForms();
          this.isLoading = false;
        },
        error: (error) => {
          this.snackBar.open('Error creating service', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
          console.error('Error uploading service:', error);
          this.isLoading = false;
        },
      });
    }
  }

  deleteService(id: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.isLoading = true;
      this.availableServices.deleteService(id).subscribe({
        next: () => {
          this.loadServices();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting service:', error);
          this.isLoading = false;
        },
      });
    }
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.isLoading = true;
      this.availableServices.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          this.isLoading = false;
        },
      });
    }
  }

  updateService(service: Service) {
    this.isLoading = true;
    this.availableServices.updateService(service.id, service).subscribe({
      next: () => {
        this.loadServices();
        service.isEditing = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating service:', error);
        this.isLoading = false;
      },
    });
  }

  updateCategory(category: Category) {
    this.isLoading = true;
    this.availableServices.updateCategory(category.id, category).subscribe({
      next: () => {
        this.loadCategories();
        category.isEditing = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating category:', error);
        this.isLoading = false;
      },
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  }

  private isValidImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(file.type);
  }

  getServicesByCategory(categoryId: number): any[] {
    return this.services.filter((service) => service.categoryId === categoryId);
  }

  private resetForms() {
    this.selectedFile = null;
    this.serviceForm.reset({
      categoryId: 0,
      name: '',
      description: '',
      price: 'Starting from ₹',
      features: [''],
    });
    this.categoryForm.reset();
  }
}
