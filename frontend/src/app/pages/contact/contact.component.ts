import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OfficeLocationComponent } from '../../components/office-location/office-location.component';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute } from '@angular/router';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OfficeLocationComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  showForm = true;
  contactForm!: FormGroup;
  contactService: ContactService = inject(ContactService);
  services: any[] = [];
  private fb: FormBuilder = inject(FormBuilder);
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    this.loadServices();
    this.initForm();
    this.setupFormValidation();
    this.handleQueryParams();
  }

  private loadServices(): void {
    this.contactService.getServices().subscribe(services => {
      this.services = services;
    });
  }

  private handleQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        this.contactForm.patchValue({
          service: params['service']
        });
      }
    });
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      company: [''],
      service: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  private setupFormValidation(): void {
    const controls = ['name', 'email', 'phone', 'service', 'message'];

    controls.forEach((control) => {
      this.contactForm
        .get(control)
        ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
        .subscribe(() => {
          this.contactForm.get(control)?.markAsTouched();
        });
    });
  }

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get company() {
    return this.contactForm.get('company');
  }
  get service() {
    return this.contactForm.get('service');
  }
  get message() {
    return this.contactForm.get('message');
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.submitContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          this.showForm = false;
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        },
      });
    }
  }
}
