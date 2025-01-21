import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  router: Router = inject(Router);

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }
}
