import { Component, computed, OnInit } from '@angular/core';
import { BoutiqueStore } from '../../store/boutique.store';

@Component({
  selector: 'app-boutique-home',
  imports: [],
  templateUrl: './boutique-home.component.html',
  styleUrl: './boutique-home.component.scss',
})
export class BoutiqueHomeComponent implements OnInit{
  shop = computed(()=>this.boutiqueStore.profile())
  loadingProfile = computed(()=>this.boutiqueStore.loadingProfile());

  // {
  //   nom: "Tech Store",
  //   description: "Vente de matériels informatiques et accessoires",
  //   logoUrl: "https://www.creativefabrica.com/wp-content/uploads/2022/01/10/tech-store-minimalist-flat-logo-design-Graphics-23251175-1.jpg", // Logo réel pour le test
  //   categorie: { nom: "Électronique", iconClass: "fa-solid fa-laptop" },
  //   zone: { etage: "RDC", bloc: "Bloc A", box: "A12", description: "Zone principale proche entrée" },
  //   horaires: { jours: "Lun–Sam", heures: "08h00 - 18h00" },
  //   contacts: {
  //     telephoneProprio: "+261 34 12 345 67",
  //     telephoneBoutique: "+261 32 12 345 67",
  //     email: "techstore@gmail.com"
  //   },
  //   vues: 1240,
  //   createdAt: "2025-11-10T09:12:30Z"
  // };


  constructor(private boutiqueStore:BoutiqueStore){}
  ngOnInit(): void {
      this.boutiqueStore.loadProfile();
  }
}
