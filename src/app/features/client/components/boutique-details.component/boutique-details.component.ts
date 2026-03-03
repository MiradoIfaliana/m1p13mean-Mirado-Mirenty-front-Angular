import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { Categorie, Horaires, MeBoutique, Zone } from '../../../boutique/services/boutique.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ClientStore } from '../../store/client.store';

@Component({
  selector: 'app-boutique-details.component',
  imports: [],
  templateUrl: './boutique-details.component.html',
  styleUrl: './boutique-details.component.scss',
})
export class BoutiqueDetailsComponent implements OnInit {
  boutique = computed(()=>this.clientStore.boutiqueDetails());
  loadingDetails =computed(()=>this.clientStore.loadingBoutiqueDetails());
  // signal({
  //   "_id": "65ab1200abc4560099887766",
  //   "nom": "Fashion Store",
  //   "description": "Boutique spécialisée en vêtements tendance",
  //   "logoUrl": "https://cdn.app/logos/fashion.png",
  //   "categorie": {
  //   "nom": "Mode",
  //   "iconClass": "fa-solid fa-shirt"
  //   },
  //   "zone": {
  //   "etage": "1er étage",
  //   "bloc": "Bloc B",
  //   "box": "A12",
  //   "description": "À côté de l’escalator"
  //   },
  //   "horaires": {"jours":"Lun-Sam", "heures":"08h00 - 18h00"},
  //   "contacts": {
  //   "telephoneBoutique": "+261 34 00 000 00",
  //   "email": "fashion@mail.com"
  //   },
  //   "vues": 420,
  //   "createdAt": "2025-11-15T08:00:00Z"
  //   });

    titre = signal<string|null>(null);

    contactLink = computed(() => {
      const email = this.boutique()?.contacts?.email;
      if (!email) return null;

      const subject = encodeURIComponent(`Demande d'information : ${this.titre() || 'Boutique'}`);
      const body = encodeURIComponent(`Bonjour,\n\nJe souhaite avoir plus d'informations concernant l'article : ${this.titre()||'Dernière article'}.\n\nMerci.`);

      return `mailto:${email}?subject=${subject}&body=${body}`;
    });



    phoneLink = computed(() => {
      const phone = this.boutique()?.contacts?.telephoneBoutique;
      if (!phone) return null;

      // Nettoie le numéro : garde uniquement les chiffres et le '+' au début
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      return `tel:${cleanPhone}`;
    });

    constructor(private route:ActivatedRoute,private location: Location, private clientStore: ClientStore){
    }
    ngOnInit(): void {
      const id=this.route.snapshot.paramMap.get('id');
      if(id){
        this.clientStore.loadBoutiqueById(id);
      }
      const titre = this.route.snapshot.queryParamMap.get('titre');
      if(titre){
        this.titre.set(titre);
      }
    }
    back(){
      this.location.back();
    }



}

