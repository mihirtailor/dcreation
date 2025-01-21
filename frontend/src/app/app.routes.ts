import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { adminGuard } from './guards/admin.guard';
import { AvailableServicesComponent } from './pages/available-services/available-services.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: AvailableServicesComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
  },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: '**', redirectTo: 'home' }, // Wildcard route for 404
];
