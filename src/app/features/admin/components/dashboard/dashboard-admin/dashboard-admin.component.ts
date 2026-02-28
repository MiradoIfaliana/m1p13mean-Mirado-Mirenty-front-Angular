import { Component, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorsChartComponent } from '../visitors-chart.component/visitors-chart.component';
import { AdminStore } from '../../../store/admin.store';
import { NotificationService } from '../../../../../shared/services/notification.service';

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
export class DashboardAdminComponent implements OnInit {
  //  data: DashboardStats = {
  //    nbBoutiqueActive: 0,
  //    nbPromotionEnCours: 0,
  //    nbUserClient: 0,
  //    topBoutique: [],
  //    visitors: {
  //      type: '',
  //      from: '',
  //      to: '',
  //      data: []
  //    }
  //  };
   data = computed(()=>this.adminStore.dashboard());
  constructor(private adminStore:AdminStore, private notificationService:NotificationService){
    effect(() => {
      if (this.adminStore.errorStat()) {
        this.notificationService.showError(this.adminStore.errorStat()!);
        this.adminStore.resetStatusStat();
      }
    });
  }

  ngOnInit() {
    this.adminStore.statistics(7);
  }
}
/*
for (int i=0 ; i<100; i++){
  system
}
*/
