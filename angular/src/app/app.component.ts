import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarHeadless } from './components/sidepar/sidepar.component';
import { HeaderComponent } from './components/header/header.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarHeadless, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  id = signal(0);
  email = signal('');
  name = signal('');
  photo = signal('');
  constructor(private userService: UserService) {
    const token = localStorage.getItem('access_token');
    if (token) {
      const user = userService.getUser(token);
      user.subscribe((res) => {
        this.id.set(res.id);
        this.email.set(res.email);
        this.name.set(res.name);
        this.photo.set(res.photo);
        sessionStorage.setItem('id', res.id);
        sessionStorage.setItem('name', res.name);
        sessionStorage.setItem('email', res.email);
        sessionStorage.setItem('user-photo', res.photo);
      });
    }
  }
}

// title = 'project1';
// cities: any;

// selectedCity: any;
// basicData: any;

// basicOptions: any;
// ngOnInit() {
//   const documentStyle = getComputedStyle(document.documentElement);
//   const textColor = documentStyle.getPropertyValue('--text-color');
//   const textColorSecondary = documentStyle.getPropertyValue(
//     '--text-color-secondary'
//   );
//   const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

//   this.basicData = {
//     labels: [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'october',
//     ],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [65, 59, 80, 81, 56, 55, 10, 23],
//         fill: false,
//         borderColor: documentStyle.getPropertyValue('--blue-500'),
//       },
//       {
//         label: 'test',
//         fill: false,
//         borderColor: documentStyle.getPropertyValue('--blue-500'),
//         yAxisID: 'y',
//         tension: 0.4,
//         data: [32, 45, 54, 56, 56, 23, 19],
//       },
//     ],
//   };

//   this.basicOptions = {
//     stacked: false,
//     maintainAspectRatio: false,
//     aspectRatio: 0.6,
//     plugins: {
//       legend: {
//         labels: {
//           color: textColor,
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: textColorSecondary,
//         },
//         grid: {
//           color: surfaceBorder,
//           drawBorder: false,
//         },
//       },
//       y: {
//         type: 'linear',
//         position: 'left',
//         display: true,
//         ticks: {
//           color: textColorSecondary,
//         },
//         grid: {
//           color: surfaceBorder,
//         },
//       },
//       // y1: {
//       //   type: 'linear',
//       //   display: true,
//       //   position: 'right',
//       //   ticks: {
//       //     color: textColorSecondary,
//       //   },
//       //   grid: {
//       //     drawOnChartArea: false,
//       //     color: surfaceBorder,
//       //   },
//       // },
//     },
//   };
// }
