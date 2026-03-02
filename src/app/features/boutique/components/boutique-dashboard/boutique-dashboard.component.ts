import { Component, computed, DOCUMENT, effect, Inject, OnInit, Renderer2, signal } from '@angular/core';
import { CreatePromotionComponent } from "../create-promotion/create-promotion.component";
import { BoutiqueStore } from '../../store/boutique.store';
import { PromotionCreate } from '../../services/boutique.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-boutique-dashboard',
  imports: [CreatePromotionComponent],
  templateUrl: './boutique-dashboard.component.html',
  styleUrl: './boutique-dashboard.component.scss',
})
export class BoutiqueDashboardComponent implements OnInit {
  stats = computed(()=>this.boutiqueStore.stats());
  //signal({ vues: 230, promoClics: 85 });

  promotions = computed(()=>this.boutiqueStore.promotions());
  loadingPromotions = computed(()=>this.boutiqueStore.loadingPromotions());

//   signal([
//   {_id: "65b3009abc5550011228899",titre: "Promo rentrée",taux: 20,prixInitial: null,prixReduit: null,description: "Réduction spéciale rentrée scolaire sur les articles sélectionnés.",imageUrl: "https://www.leparisien.fr/resizer/P_q6RyucrN6vkhItGoxD2Qy0tp0=/1400x0/cloudfront-eu-central-1.images.arcpublishing.com/lpguideshopping/VSHV74MDORF5DGGG5F3GQDUTZE.jpg",dateDebut: "2026-02-01",dateFin: "2026-02-15",status: "VALIDEE",vues: 180,createdAt: "2026-01-28T10:00:00Z"
//   },
//   {_id: "65b3009abc5550011228801",titre: "Black Friday",taux: 40,prixInitial: 500000,prixReduit: 300000,description: "Offre exceptionnelle Black Friday sur toute la boutique.",imageUrl: "https://img.freepik.com/vecteurs-libre/banniere-horizontale-black-friday-sale-ballons-pour-publicite-depliants_354956-968.jpg?semt=ais_hybrid&w=740&q=80",dateDebut: "2026-11-25",dateFin: "2026-11-30",status: "EN_ATTENTE",vues: 95,createdAt: "2026-11-01T09:30:00Z"
//   },
//   {_id: "65b3009abc5550011228802",titre: "Soldes d'été",taux: 30,prixInitial: 150000,prixReduit: 105000,description: "Profitez des soldes d'été sur une large sélection de produits.",imageUrl: "https://pic.clubic.com/942c97791807948/1200x675/smart/soldes_summer_2020.jpg",dateDebut: "2026-06-01",dateFin: "2026-06-30",status: "VALIDEE",vues: 420,createdAt: "2026-05-28T14:15:00Z"
//   },
//   {_id: "65b3009abc5550011228803",titre: "Déstockage spécial",taux: 50,prixInitial: 0,prixReduit: 0,description: "Grande opération déstockage jusqu'à épuisement du stock.",imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQypktMQEiz33yWw6qCSav_Ir7_RsQqSb1Z4A&s",dateDebut: "2025-12-01",dateFin: "2025-12-10",status: "REFUSEE",vues: 60,createdAt: "2025-11-28T08:00:00Z"
//   }
// ]);

  produits = computed(()=>this.boutiqueStore.products());
  loadingProducts = computed(()=>this.boutiqueStore.loadingProducts());
// signal([
//   { _id: 'p1', nom: 'Laptop Dell XPS 15', prix: 3200000, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSODZjsUrOL8fy-5sldAOSc9UMOULHN07yqFg&s', description: 'Intel Core i7 13e Gen • 16GB RAM • SSD 512GB • Full HD'},
//   { _id: 'p2', nom: 'Souris Gamer Logitech', prix: 150000, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_vXaJ1GH7Nllo4_K8FZDFA1mlBjbCEy50g&s', description: 'RGB • 16000 DPI • Ultra légère • USB'},
//   { _id: 'p3', nom: 'Clavier Mécanique RGB', prix: 450000, imageUrl: 'https://www.zoma.mg/23883-large_default/the-g-lab-keyz-rubidium-clavier-mu00c9canique-red-switch-et-rgb-completement-personnalisable-avec-repose-poignet-azerty.jpg', description: 'Switch Blue • Anti-ghosting • Rétroéclairage RGB'},
//   { _id: 'p4', nom: 'Écran Gaming 24"', prix: 950000, imageUrl: 'https://m.media-amazon.com/images/I/71tWkJm067L._AC_UF1000,1000_QL80_.jpg', description: '144Hz • 1ms • Full HD • HDMI/DisplayPort'},
//   { _id: 'p5', nom: 'Casque Gamer Pro', prix: 280000, imageUrl: 'https://www.cdiscount.com/pdt2/7/5/4/1/700x700/spi1412211048754/rw/casque-gamer-pro-h3-pour-xbox-one-series-x-s.jpg', description: 'Son Surround 7.1 • Micro antibruit • LED RGB'},
//   { _id: 'p6', nom: 'Disque SSD NVMe 1TB', prix: 600000, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRMarluaEABMsdTiL17gqvOPsS42FHkxg-g&s', description: 'PCIe 4.0 • 7000MB/s • Haute performance'},
//   { _id: 'p7', nom: 'Chaise Gaming Ergonomique', prix: 1200000, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcrvXFXkYldGBIu7RgbOWs5MS4JYRK2IectA&s', description: 'Cuir premium • Réglable • Support lombaire'},
//   { _id: 'p8', nom: 'Webcam HD 1080p', prix: 180000, imageUrl: 'https://play-lh.googleusercontent.com/QxpQbQUOn2XuaGDhwqyPP7XLWDxAWlNBX5uYZkRPTX6HC-oUR2jpkJ57Ia4lZzy_TUu2', description: 'Full HD • Micro intégré • Idéal streaming'}
// ]);

  annonces = computed(()=>this.boutiqueStore.annonces());
  loadingAnnonces = computed(()=>this.boutiqueStore.loadingAnnonces());
//   signal([
//   {_id: "65b4100abc1230099887766",title: "Ouverture exceptionnelle",content: "Le centre sera ouvert jusqu’à 22h ce samedi pour faciliter vos achats.",createdAt: "2026-02-02T14:00:00Z"
//   },
//   {_id: "65b4100abc1230099887701",title: "Nouvelle boutique disponible",content: "Une nouvelle boutique high-tech ouvre ses portes au niveau 2 dès lundi.",createdAt: "2026-02-05T09:00:00Z"
//   },
//   {_id: "65b4100abc1230099887702",title: "Maintenance programmée",content: "Une maintenance du système est prévue ce dimanche entre 01h et 03h.",createdAt: "2026-02-10T18:30:00Z"
//   },
//   {_id: "65b4100abc1230099887703",title: "Événement spécial Saint-Valentin",content: "Des animations spéciales et réductions exclusives seront proposées ce 14 février.",createdAt: "2026-02-12T11:15:00Z"
//   }
// ]);
isAddModalOpen = signal(false);


  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private boutiqueStore: BoutiqueStore, private notificationService: NotificationService) {
    //surveille le signal : desactive l'overflow de l'arriere plan quand le sidebar est activé
    effect(() => {
      const open = this.isAddModalOpen();
      if (open) {
        this.renderer.addClass(this.document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(this.document.body, 'overflow-hidden');
      }
      if(this.boutiqueStore.successAddPromotion()){
        this.notificationService.showSuccess("Promotion créée avec succès");
        this.boutiqueStore.resetAddPromotionStatus();
        this.isAddModalOpen.set(false);
      }
      if(this.boutiqueStore.errorAddPromotion()){
        this.notificationService.showError(this.boutiqueStore.errorAddPromotion()!);
        this.boutiqueStore.resetAddPromotionStatus();
      }
    });
  }
  ngOnInit(): void {
      this.boutiqueStore.loadPromotions();
      this.boutiqueStore.loadProducts();
      this.boutiqueStore.loadAnnonces();
      this.boutiqueStore.loadStats();
  }
  handleCreatePromo(newPromo: {promotion:PromotionCreate,image?:File|null}) {
    // Simulation d'ajout (En production, ceci attendrait le retour de l'API)
    this.boutiqueStore.addPromotion(newPromo.promotion,newPromo.image);
  }
  // Fonction de scroll générique pour les carrousels
  scroll(id: string, distance: number) {
    const el = document.getElementById(id);
    if (el) el.scrollBy({ left: distance, behavior: 'smooth' });
  }
}
