import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isServiceProvider = false;
  name: string | undefined;
  constructor() {
    if (localStorage.getItem('isServiceProvider') == 'true') {
      this.isServiceProvider = true;
    }
    const name = sessionStorage.getItem('name');
    name ? (this.name = name) : (this.name = '');
  }
}
