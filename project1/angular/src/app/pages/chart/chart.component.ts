import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  public ChartData: any;
  public ChartOptions: any;
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.ChartData = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Completed',
          data: [65, 59, 80, 81, 56, 55, 10, 23, 33, 44, 5, 66],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
        },
        {
          label: 'In Progress',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          yAxisID: 'y',
          tension: 0.4,
          data: [32, 45, 54, 56, 56, 23, 19, 45, 74, 12, 6, 78],
        },
      ],
    };

    this.ChartOptions = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          type: 'linear',
          position: 'left',
          display: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        // y1: {
        //   type: 'linear',
        //   display: true,
        //   position: 'right',
        //   ticks: {
        //     color: textColorSecondary,
        //   },
        //   grid: {
        //     drawOnChartArea: false,
        //     color: surfaceBorder,
        //   },
        // },
      },
    };
  }
}
