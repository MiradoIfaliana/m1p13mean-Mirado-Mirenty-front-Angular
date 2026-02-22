import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorsChartComponent } from '../visitors-chart.component/visitors-chart.component';

export interface Boutique {
  _id: string;
  nom: string;
}

export interface VisitorData {
  date: string;
  count: number;
}

export interface DashboardStats {
  nbBoutiqueActive: number;
  nbPromotionEnCours: number;
  nbUserClient: number;
  topBoutique: Boutique[];
  visitors: {
    type: string;
    from: string;
    to: string;
    data: VisitorData[];
  };
}

@Component({
  selector: 'app-dashboard-admin',
  imports: [VisitorsChartComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
})
export class DashboardAdminComponent {
  public data: DashboardStats = {
    nbBoutiqueActive: 25,
    nbPromotionEnCours: 12,
    nbUserClient: 340,
    topBoutique: [
      { _id: "b1", nom: "Shop Fashion" },
      { _id: "b2", nom: "Tech Store" }
    ],
    visitors: {
      type: "daily",
      from: "2026-01-29",
      to: "2026-02-04 ",
      data: [
        { date: "2026-01-29", count: 120 },
        { date: "2026-01-30", count: 135 },
        { date: "2026-01-31", count: 98 },
        { date: "2026-02-01", count: 150 },
        { date: "2026-02-02", count: 170 },
        { date: "2026-02-03", count: 200 },
        { date: "2026-02-04", count: 180 }
      ]
    }
  };
}
/*
for (int i=0 ; i<100; i++){
  system
}
*/
