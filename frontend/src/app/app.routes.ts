import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { adminGuard } from './guards/admin.guard';
import { AvailableServicesComponent } from './pages/available-services/available-services.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/childComponents/dashboard/dashboard.component';
import { SliderComponent } from './pages/admin/childComponents/slider/slider.component';
import { PortfolioComponent } from './pages/admin/childComponents/portfolio/portfolio.component';
import { RequestsComponent } from './pages/admin/childComponents/requests/requests.component';
import { ServicesComponent } from './pages/admin/childComponents/services/services.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: AvailableServicesComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'login', component: AdminLoginComponent },
      {
        path: '',
        component: AdminComponent,
        canActivate: [adminGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'slider', component: SliderComponent },
          { path: 'portfolio', component: PortfolioComponent },
          { path: 'requests', component: RequestsComponent },
          { path: 'services', component: ServicesComponent },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
