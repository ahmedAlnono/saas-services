import { Routes } from '@angular/router';
import { ChartComponent } from './pages/chart/chart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { FilesComponent } from './pages/files/files.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
export const routes: Routes = [
  {
    path: 'chart',
    component: ChartComponent,
  },
  {
    path: 'files',
    component: FilesComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'dashboard',
    redirectTo: () => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        return 'user/dashboard';
      } else {
        return '/login';
      }
    },
  },
  {
    path: 'user/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
