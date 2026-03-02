import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environement';

@Injectable({ providedIn: 'root' })
export class BoutiqueHttpClient {
  private API_URL = environment.apiUrl;

  // --- BASE DE DONNÉES SIMULÉE ---
  private myBoutique = {
    _id: "65b1a9f0abc4560011223344",
    nom: "Tech Store",
    description: "Vente de matériels informatiques et accessoires",
    logoUrl: "https://www.creativefabrica.com/wp-content/uploads/2022/01/10/tech-store-minimalist-flat-logo-design-Graphics-23251175-1.jpg", // Logo réel pour le test
    categorie: { nom: "Électronique", iconClass: "fa-solid fa-laptop" },
    zone: { etage: "RDC", bloc: "Bloc A", box: "A12", description: "Zone principale proche entrée" },
    horaires: { jours: "Lun–Sam", heures: "08h00 - 18h00" },
    contacts: {
      telephoneProprio: "+261 34 12 345 67",
      telephoneBoutique: "+261 32 12 345 67",
      email: "techstore@gmail.com"
    },
    vues: 1240,
    createdAt: "2025-11-10T09:12:30Z"
  };

  private produits = [
  { _id: 'p1', nom: 'Laptop Dell XPS 15', prix: 3200000, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSODZjsUrOL8fy-5sldAOSc9UMOULHN07yqFg&s', description: 'Intel Core i7 13e Gen • 16GB RAM • SSD 512GB • Full HD'},
  { _id: 'p2', nom: 'Souris Gamer Logitech', prix: 150000, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_vXaJ1GH7Nllo4_K8FZDFA1mlBjbCEy50g&s', description: 'RGB • 16000 DPI • Ultra légère • USB'},
  { _id: 'p3', nom: 'Clavier Mécanique RGB', prix: 450000, imageUrl: 'https://www.zoma.mg/23883-large_default/the-g-lab-keyz-rubidium-clavier-mu00c9canique-red-switch-et-rgb-completement-personnalisable-avec-repose-poignet-azerty.jpg', description: 'Switch Blue • Anti-ghosting • Rétroéclairage RGB'},
  { _id: 'p4', nom: 'Écran Gaming 24"', prix: 950000, imageUrl: 'https://m.media-amazon.com/images/I/71tWkJm067L._AC_UF1000,1000_QL80_.jpg', description: '144Hz • 1ms • Full HD • HDMI/DisplayPort'},
  { _id: 'p5', nom: 'Casque Gamer Pro', prix: 280000, imageUrl: 'https://www.cdiscount.com/pdt2/7/5/4/1/700x700/spi1412211048754/rw/casque-gamer-pro-h3-pour-xbox-one-series-x-s.jpg', description: 'Son Surround 7.1 • Micro antibruit • LED RGB'},
  { _id: 'p6', nom: 'Disque SSD NVMe 1TB', prix: 600000, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRMarluaEABMsdTiL17gqvOPsS42FHkxg-g&s', description: 'PCIe 4.0 • 7000MB/s • Haute performance'},
  { _id: 'p7', nom: 'Chaise Gaming Ergonomique', prix: 1200000, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcrvXFXkYldGBIu7RgbOWs5MS4JYRK2IectA&s', description: 'Cuir premium • Réglable • Support lombaire'},
  { _id: 'p8', nom: 'Webcam HD 1080p', prix: 180000, imageUrl: 'https://play-lh.googleusercontent.com/QxpQbQUOn2XuaGDhwqyPP7XLWDxAWlNBX5uYZkRPTX6HC-oUR2jpkJ57Ia4lZzy_TUu2', description: 'Full HD • Micro intégré • Idéal streaming'}
  ];

  private promotions = [
    {_id: "65b3009abc5550011228899",titre: "Promo rentrée",taux: 20,prixInitial: null,prixReduit: null,description: "Réduction spéciale rentrée scolaire sur les articles sélectionnés.",imageUrl: "https://www.leparisien.fr/resizer/P_q6RyucrN6vkhItGoxD2Qy0tp0=/1400x0/cloudfront-eu-central-1.images.arcpublishing.com/lpguideshopping/VSHV74MDORF5DGGG5F3GQDUTZE.jpg",dateDebut: "2026-02-01",dateFin: "2026-02-15",status: "VALIDEE",vues: 180,createdAt: "2026-01-28T10:00:00Z"
    },
    {_id: "65b3009abc5550011228801",titre: "Black Friday",taux: 40,prixInitial: 500000,prixReduit: 300000,description: "Offre exceptionnelle Black Friday sur toute la boutique.",imageUrl: "https://img.freepik.com/vecteurs-libre/banniere-horizontale-black-friday-sale-ballons-pour-publicite-depliants_354956-968.jpg?semt=ais_hybrid&w=740&q=80",dateDebut: "2026-11-25",dateFin: "2026-11-30",status: "EN_ATTENTE",vues: 95,createdAt: "2026-11-01T09:30:00Z"
    },
    {_id: "65b3009abc5550011228802",titre: "Soldes d'été",taux: 30,prixInitial: 150000,prixReduit: 105000,description: "Profitez des soldes d'été sur une large sélection de produits.",imageUrl: "https://pic.clubic.com/942c97791807948/1200x675/smart/soldes_summer_2020.jpg",dateDebut: "2026-06-01",dateFin: "2026-06-30",status: "VALIDEE",vues: 420,createdAt: "2026-05-28T14:15:00Z"
    },
    {_id: "65b3009abc5550011228803",titre: "Déstockage spécial",taux: 50,prixInitial: 0,prixReduit: 0,description: "Grande opération déstockage jusqu'à épuisement du stock.",imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQypktMQEiz33yWw6qCSav_Ir7_RsQqSb1Z4A&s",dateDebut: "2025-12-01",dateFin: "2025-12-10",status: "REFUSEE",vues: 60,createdAt: "2025-11-28T08:00:00Z"
    }
  ];
  private annonces = [
  {_id: "65b4100abc1230099887766",title: "Ouverture exceptionnelle",content: "Le centre sera ouvert jusqu’à 22h ce samedi pour faciliter vos achats.",createdAt: "2026-02-02T14:00:00Z"
  },
  {_id: "65b4100abc1230099887701",title: "Nouvelle boutique disponible",content: "Une nouvelle boutique high-tech ouvre ses portes au niveau 2 dès lundi.",createdAt: "2026-02-05T09:00:00Z"
  },
  {_id: "65b4100abc1230099887702",title: "Maintenance programmée",content: "Une maintenance du système est prévue ce dimanche entre 01h et 03h.",createdAt: "2026-02-10T18:30:00Z"
  },
  {_id: "65b4100abc1230099887703",title: "Événement spécial Saint-Valentin",content: "Des animations spéciales et réductions exclusives seront proposées ce 14 février.",createdAt: "2026-02-12T11:15:00Z"
  }
  ];

  // ======================================================
  // GET : Récupération des données
  // ======================================================
  get<T>(url: string): Observable<T> {
    // 1️⃣ Profil Boutique
    if (url === `${this.API_URL}/me/boutique`) {
      return of(this.myBoutique as unknown as T).pipe(delay(600));
    }

    // 4️⃣ Liste des produits
    if (url === `${this.API_URL}/me/produits`) {
      return of(this.produits as unknown as T).pipe(delay(1200));
    }

    // 6️⃣ Liste des promotions
    if (url === `${this.API_URL}/me/promotions`) {
      return of(this.promotions as unknown as T).pipe(delay(800));
    }

    //  Liste des annonces (Public/Admin)
    if (url === `${this.API_URL}/annonces`) {
      return of(this.annonces as unknown as T).pipe(delay(2000));
    }

    //  Stat
    if (url === `${this.API_URL}/me/stats`) {
      return of({ vues: 230, promoClics: 85 } as unknown as T).pipe(delay(800));
    }


    return throwError(() => ({ status: 404, message: "Route GET non trouvée" }));
  }

  // ======================================================
  // POST : Création (Annonces, Produits, Promos)
  // ======================================================
  post<T>(url: string, body: any): Observable<T> {
    // 3️⃣ Ajouter un produit
    if (url === `${this.API_URL}/me/produits`) {
      const formData:FormData=body;
      const data =  JSON.parse(formData.get('data') as string);
      const newProduit = {
        _id: 'prod-' + Date.now(),
        ...data,
        imageUrl: "https://images.unsplash.com"
      };
      this.produits.unshift(newProduit);
      return of({} as unknown as T).pipe(delay(1000));
    }

    // 5️⃣ Créer une promotion
    if (url === `${this.API_URL}/me/promotions`) {

      const formData: FormData = body;
      const dataBlob = formData.get('data') as Blob;

      return from(dataBlob.text()).pipe(
        switchMap(text => {

          const data = JSON.parse(text);

          const newPromo = {
            _id: 'promo-' + Date.now(),
            ...data,
            status: "EN_ATTENTE",
            imageUrl: "https://images.unsplash.com",
            vues: 0,
            createdAt: new Date().toISOString()
          };

          this.promotions.unshift(newPromo);

          return of(newPromo as unknown as T).pipe(delay(1200));
        })
      );
    }

    return throwError(() => ({ status: 404, message: "Route POST non trouvée" }));
  }

  // ======================================================
  // PUT : Mise à jour complète
  // ======================================================
  put<T>(url: string, body: any): Observable<T> {
    // 2️⃣ Mettre à jour profil boutique
    if (url === `${this.API_URL}/me/boutique`) {
      this.myBoutique = {
        ...this.myBoutique,
        ...body,
        contacts: {
          ...this.myBoutique.contacts,
          telephoneProprio: body.telephoneProprio || this.myBoutique.contacts.telephoneProprio,
          telephoneBoutique: body.telephoneBoutique || this.myBoutique.contacts.telephoneBoutique,
          email: body.email || this.myBoutique.contacts.email
        }
      };
      return of(this.myBoutique as unknown as T).pipe(delay(800));
    }

    return throwError(() => ({ status: 404, message: "Route PUT non trouvée" }));
  }
}
