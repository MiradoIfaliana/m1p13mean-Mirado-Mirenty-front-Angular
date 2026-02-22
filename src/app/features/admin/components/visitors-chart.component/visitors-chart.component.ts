import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartOptions,
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);
@Component({
  selector: 'app-visitors-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './visitors-chart.component.html'
})
export class VisitorsChartComponent implements OnChanges {

  @Input() visitors!: {
    type: string;
    from: string;
    to: string;
    data: { date: string; count: number }[];
  };

  public lineChartType: 'line' = 'line';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visitors'] && this.visitors) {
      this.buildChart();
    }
  }

  private buildChart(): void {
    const labels = this.visitors.data.map(d =>
      new Date(d.date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short'
      })
    );

    const values = this.visitors.data.map(d => d.count);

    this.lineChartData = {
      labels,
      datasets: [
        {
          data: values,
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          backgroundColor: 'rgba(59,130,246,0.15)',
          borderColor: '#3b82f6',
          pointRadius: 4
        }
      ]
    };
  }
}
