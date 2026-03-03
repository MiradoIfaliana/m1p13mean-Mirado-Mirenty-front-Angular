import { Location } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientStore } from '../../store/client.store';

@Component({
  selector: 'app-promotion-details.component',
  imports: [],
  templateUrl: './promotion-details.component.html',
  styleUrl: './promotion-details.component.scss',
})
export class PromotionDetailsComponent {
  promotion=computed(()=> this.clientStore.promotionDetails());
  loadingDetails =computed(()=>this.clientStore.loadingPromotionDetails());
  
// signal({
// "_id": "65bb1200abc9990011223344",
// "boutiqueId": "65ab1200abc4560099887766",
// "nomBoutique": "Fashion Store",
// "titre": "Soldes été",
// "taux": 30,
// "prixInitial": null,
// "prixReduit": 70000,
// "description": "Réduction spéciale été",
// "imageUrl": "https://pic.clubic.com/942c97791807948/1200x675/smart/soldes_summer_2020.jpg",
// "dateDebut": "2026-02-01",
// "dateFin": "2026-02-10",
// "vues": 150,
// "createdAt": "2026-01-25T10:00:00Z"
// });

  constructor(private route:ActivatedRoute, private router:Router,private location: Location,private clientStore: ClientStore){}
  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.clientStore.loadPromotionById(id);
    }
  }
  toBoutiqueDetail(id?: string|null,titre:string='') {
    if(id){
      this.router.navigate(
        ['client/boutiques', id],
        { queryParams: { titre } }
      );
    }
  }
  back(){
    this.location.back();
  }
}
