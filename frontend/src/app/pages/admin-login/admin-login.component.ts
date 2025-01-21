import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword = false;

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  constructor() {}

  onSubmit(data: any) {
    if (data.form.valid) {
      this.authService.signIn(data.form.value).subscribe({
        next: (result: any) => {
          localStorage.setItem('token', result.token);
          this.router.navigate(['admin']);
        },
        error: (error) => {
          this.errorMessage = 'Invalid credentials. Please try again.';
        },
      });
    }
  }
}
