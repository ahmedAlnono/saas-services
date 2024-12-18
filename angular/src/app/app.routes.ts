import { Routes } from '@angular/router';
import { ChartComponent } from './pages/chart/chart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
export const routes: Routes = [
  {
    path: 'chart',
    component: ChartComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'settings',
    redirectTo: () => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        return 'user/settings';
      } else {
        return '/login';
      }
    },
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
    path: 'user/settings',
    component: SettingsComponent,
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
