import { Injectable } from "@angular/core";
import { environment } from "../../environments/environement";
import { Observable, of, throwError } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientHttpClient {

  private API_URL = environment.apiUrl;

  // ======================================================
  // 📦 DONNÉES MOCK RICHES
  // ======================================================

  private boutiques: any[] = [
    { _id: "65ab1200abc4560099887766", nom: "Fashion Store", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGdsBB6XhUrTu9CWOEV4h6X9zkJiGuR518w&s", categorie: { _id: "65a2c987abc4560099887766",nom: "Mode"}, horaires: {jours: "Tous les jours",heures: "08h00 - 20h00"}, contact: "+261 34 00 000 00", estFavoris: true},
    { _id: "65ab1200abc4560099887767", nom: "Tech World", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZx-DNUeoOcjCmHQK4Yn3krGZrHa3BfWj1hg&s", categorie: { _id: "65a2c987abc4560099887767",nom: "Électronique"}, horaires: {jours: "Lun - Sam",heures: "09h00 - 18h30"}, contact: "+261 32 12 345 67", estFavoris: false},
    { _id: "65ab1200abc4560099887768", nom: "Super Marché Anosy", logoUrl: "https://img.freepik.com/vecteurs-premium/logo-achat-ligne-au-supermarche_1199645-37308.jpg?semt=ais_hybrid&w=740&q=80", categorie: { _id: "65a2c987abc4560099887768",nom: "Alimentation"}, horaires: {jours: "Tous les jours",heures: "07h30 - 21h00"}, contact: "+261 33 45 678 90", estFavoris: true},
    { _id: "65ab1200abc4560099887769", nom: "Beauty Glam", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkK3vJKGEYd2wJFAuNRCIezzhGLTpsmx2k8w&s", categorie: { _id: "65a2c987abc4560099887769",nom: "Cosmétique"}, horaires: {jours: "Mar - Dim",heures: "10h00 - 19h00"}, contact: "+261 38 98 765 43", estFavoris: false},
    { _id: "65ab1200abc4560099887770", nom: "Maison Déco", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1-7rP0PhZw7GDXaqpOKBq2_F6IivpHqrmQ&s", categorie: { _id: "65a2c987abc4560099887770",nom: "Maison & Décoration"}, horaires: {jours: "Lun - Ven",heures: "08h30 - 17h30"}, contact: "+261 37 11 223 44", estFavoris: true},
    { _id: "65ab1200abc4560099887771", nom: "Electro Shop", logoUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03", categorie: { _id: "65a2c987abc4560099887771", nom: "Électronique" }, horaires: { jours: "Lun - Sam", heures: "09h00 - 19h00" }, contact: "+261 34 11 223 55", estFavoris: false},
    { _id: "65ab1200abc4560099887772", nom: "Sport Pro", logoUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438", categorie: { _id: "65a2c987abc4560099887772", nom: "Sport & Fitness" }, horaires: { jours: "Tous les jours", heures: "08h00 - 20h00" }, contact: "+261 32 44 556 78", estFavoris: true},
    { _id: "65ab1200abc4560099887773", nom: "Kids Land", logoUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30", categorie: { _id: "65a2c987abc4560099887773", nom: "Jouets & Enfants" }, horaires: { jours: "Lun - Dim", heures: "09h30 - 18h00" }, contact: "+261 33 22 334 56", estFavoris: false},
    { _id: "65ab1200abc4560099887774", nom: "Mode Élégance", logoUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050", categorie: { _id: "65a2c987abc4560099887774", nom: "Mode" }, horaires: { jours: "Mar - Dim", heures: "10h00 - 19h30" }, contact: "+261 38 55 667 89", estFavoris: true},
    { _id: "65ab1200abc4560099887775", nom: "Auto Accessoires", logoUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a", categorie: { _id: "65a2c987abc4560099887775", nom: "Automobile" }, horaires: { jours: "Lun - Sam", heures: "08h00 - 17h00" }, contact: "+261 34 66 778 90", estFavoris: false},
    { _id: "65ab1200abc4560099887776", nom: "Gadget Store", logoUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", categorie: { _id: "65a2c987abc4560099887776", nom: "High-Tech" }, horaires: { jours: "Tous les jours", heures: "09h00 - 21h00" }, contact: "+261 37 77 889 01", estFavoris: true}
  ];

private boutiquesDetails: any[] = [
  {"_id": "65ab1200abc4560099887766","nom": "Fashion Store","description": "Boutique spécialisée en vêtements tendance","logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGdsBB6XhUrTu9CWOEV4h6X9zkJiGuR518w&s","categorie": {  "nom": "Mode",  "iconClass": "fa-solid fa-shirt"},"zone": {  "etage": "1er étage",  "bloc": "Bloc B",  "box": "A12",  "description": "À côté de l’escalator"},"horaires": { "jours": "Tous les jours", "heures": "08h00 - 20h00" },"contacts": { "telephoneBoutique": "+261 34 00 000 00", "email": "fashion@mail.com" },"vues": 420,"createdAt": "2025-11-15T08:00:00Z"
  },
  {"_id": "65ab1200abc4560099887767","nom": "Tech World","description": "Boutique spécialisée en électronique et gadgets","logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZx-DNUeoOcjCmHQK4Yn3krGZrHa3BfWj1hg&s","categorie": { "nom": "Électronique", "iconClass": "fa-solid fa-tv" },"zone": { "etage": "Rez-de-chaussée", "bloc": "Bloc A", "box": "B01", "description": "Près de l’entrée principale" },"horaires": { "jours": "Lun - Sam", "heures": "09h00 - 18h30" },"contacts": { "telephoneBoutique": "+261 32 12 345 67", "email": "techworld@mail.com" },"vues": 350,"createdAt": "2025-12-01T09:30:00Z"
  },
  {"_id": "65ab1200abc4560099887768","nom": "Super Marché Anosy","description": "Supermarché proposant alimentation et produits du quotidien","logoUrl": "https://img.freepik.com/vecteurs-premium/logo-achat-ligne-au-supermarche_1199645-37308.jpg?semt=ais_hybrid&w=740&q=80","categorie": { "nom": "Alimentation", "iconClass": "fa-solid fa-basket-shopping" },"zone": { "etage": "Rez-de-chaussée", "bloc": "Bloc C", "box": "C05", "description": "À côté de la pharmacie" },"horaires": { "jours": "Tous les jours", "heures": "07h30 - 21h00" },"contacts": { "telephoneBoutique": "+261 33 45 678 90", "email": "supermarche.anosy@mail.com" },"vues": 780,"createdAt": "2025-10-20T08:15:00Z"
  },
  {"_id": "65ab1200abc4560099887769","nom": "Beauty Glam","description": "Boutique spécialisée en produits cosmétiques","logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkK3vJKGEYd2wJFAuNRCIezzhGLTpsmx2k8w&s","categorie": { "nom": "Cosmétique", "iconClass": "fa-solid fa-sparkles" },"zone": { "etage": "1er étage", "bloc": "Bloc D", "box": "D10", "description": "Face à la salle d’attente" },"horaires": { "jours": "Mar - Dim", "heures": "10h00 - 19h00" },"contacts": { "telephoneBoutique": "+261 38 98 765 43", "email": "beautyglam@mail.com" },"vues": 290,"createdAt": "2025-11-05T10:00:00Z"
  },
  {"_id": "65ab1200abc4560099887770","nom": "Maison Déco","description": "Décoration intérieure et articles pour la maison","logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1-7rP0PhZw7GDXaqpOKBq2_F6IivpHqrmQ&s","categorie": { "nom": "Maison & Décoration", "iconClass": "fa-solid fa-couch" },"zone": { "etage": "2ème étage", "bloc": "Bloc E", "box": "E07", "description": "À côté de l’escalier" },"horaires": { "jours": "Lun - Ven", "heures": "08h30 - 17h30" },"contacts": { "telephoneBoutique": "+261 37 11 223 44", "email": "maisondeco@mail.com" },"vues": 310,"createdAt": "2025-12-12T08:45:00Z"
  },
  {"_id": "65ab1200abc4560099887771","nom": "Electro Shop","description": "Boutique d’électronique grand public","logoUrl": "https://images.unsplash.com/photo-1550009158-9ebf69173e03","categorie": { "nom": "Électronique", "iconClass": "fa-solid fa-tv" },"zone": { "etage": "Rez-de-chaussée", "bloc": "Bloc A", "box": "A05", "description": "Près du café central" },"horaires": { "jours": "Lun - Sam", "heures": "09h00 - 19h00" },"contacts": { "telephoneBoutique": "+261 34 11 223 55", "email": "electroshop@mail.com" },"vues": 210,"createdAt": "2025-11-22T09:00:00Z"
  },
  {"_id": "65ab1200abc4560099887772","nom": "Sport Pro","description": "Équipements et accessoires pour le sport","logoUrl": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438","categorie": { "nom": "Sport & Fitness", "iconClass": "fa-solid fa-dumbbell" },"zone": { "etage": "1er étage", "bloc": "Bloc F", "box": "F03", "description": "À côté de la salle de sport" },"horaires": { "jours": "Tous les jours", "heures": "08h00 - 20h00" },"contacts": { "telephoneBoutique": "+261 32 44 556 78", "email": "sportpro@mail.com" },"vues": 450,"createdAt": "2025-10-28T08:00:00Z"
  },
  {"_id": "65ab1200abc4560099887773","nom": "Kids Land","description": "Jouets et activités pour enfants","logoUrl": "https://images.unsplash.com/photo-1596464716127-f2a82984de30","categorie": { "nom": "Jouets & Enfants", "iconClass": "fa-solid fa-cubes-stacked" },"zone": { "etage": "Rez-de-chaussée", "bloc": "Bloc G", "box": "G08", "description": "À côté du coin lecture" },"horaires": { "jours": "Lun - Dim", "heures": "09h30 - 18h00" },"contacts": { "telephoneBoutique": "+261 33 22 334 56", "email": "kidsland@mail.com" },"vues": 320,"createdAt": "2025-12-02T09:30:00Z"
  },
  {"_id": "65ab1200abc4560099887774","nom": "Mode Élégance","description": "Boutique de vêtements élégants et tendances","logoUrl": "https://images.unsplash.com/photo-1445205170230-053b83016050","categorie": { "nom": "Mode", "iconClass": "fa-solid fa-shirt" },"zone": { "etage": "1er étage", "bloc": "Bloc B", "box": "B09", "description": "Face à l’ascenseur" },"horaires": { "jours": "Mar - Dim", "heures": "10h00 - 19h30" },"contacts": { "telephoneBoutique": "+261 38 55 667 89", "email": "modeelegance@mail.com" },"vues": 280,"createdAt": "2025-11-30T10:15:00Z"
  },
  {"_id": "65ab1200abc4560099887775","nom": "Auto Accessoires","description": "Accessoires et pièces automobiles","logoUrl": "https://images.unsplash.com/photo-1502877338535-766e1452684a","categorie": { "nom": "Automobile", "iconClass": "fa-solid fa-car" },"zone": { "etage": "Rez-de-chaussée", "bloc": "Bloc H", "box": "H02", "description": "Près du parking" },"horaires": { "jours": "Lun - Sam", "heures": "08h00 - 17h00" },"contacts": { "telephoneBoutique": "+261 34 66 778 90", "email": "autoaccessoires@mail.com" },"vues": 190,"createdAt": "2025-12-05T08:00:00Z"
  },
  {"_id": "65ab1200abc4560099887776","nom": "Gadget Store","description": "Boutique spécialisée en gadgets et high-tech","logoUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8","categorie": { "nom": "High-Tech", "iconClass": "fa-solid fa-microchip" },"zone": { "etage": "1er étage", "bloc": "Bloc I", "box": "I05", "description": "À côté du café" },"horaires": { "jours": "Tous les jours", "heures": "09h00 - 21h00" },"contacts": { "telephoneBoutique": "+261 37 77 889 01", "email": "gadgetstore@mail.com" },"vues": 410,"createdAt": "2025-11-18T09:00:00Z"
  }
];

  private promotions: any[] = [
    { _id: "65bb1200abc9990011223344", boutiqueId: "65ab1200abc4560099887766", nomBoutique: "Fashion Store", titre: "Soldes été", taux: 30, prixInitial: 100000, prixReduit: 70000, description: "Réduction spéciale été", imageUrl: "https://pic.clubic.com/942c97791807948/1200x675/smart/soldes_summer_2020.jpg", dateDebut: "2026-02-01", dateFin: "2026-02-10", vues: 150, createdAt: "2026-01-25T10:00:00Z"},
    { _id: "65bb1200abc9990011223345", boutiqueId: "65ab1200abc4560099887767", nomBoutique: "Tech World", titre: "Promo Smartphone", taux: 15, prixInitial: null, prixReduit: null, description: "Offre limitée sur les smartphones Android", imageUrl: "https://pic.clubic.com/9a58d32f2074911/1200x675/smart/1.jpg", dateDebut: "2026-03-01", dateFin: "2026-03-15", vues: 320, createdAt: "2026-02-27T08:30:00Z"},
    { _id: "65bb1200abc9990011223346", boutiqueId: "65ab1200abc4560099887768", nomBoutique: "Super Marché Anosy", titre: "Pack Familial", taux: 10, prixInitial: 50000, prixReduit: 45000, description: "Promotion sur les produits alimentaires essentiels", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0RxP6fJ6wrXkA-lHWPisTTWUJhbPFi9s4iQ&s", dateDebut: "2026-03-05", dateFin: "2026-03-20", vues: 89, createdAt: "2026-03-01T12:15:00Z"},
    { _id: "65bb1200abc9990011223347", boutiqueId: "65ab1200abc4560099887769", nomBoutique: "Beauty Glam", titre: "Offre Saint-Valentin", taux: 25, prixInitial: 120000, prixReduit: 90000, description: "Remise spéciale sur les coffrets beauté", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWh2lqPQWqzHihXOE2gNDvmUOeTSqTNHCuZg&s", dateDebut: "2026-02-05", dateFin: "2026-02-14", vues: 410, createdAt: "2026-01-30T09:45:00Z"},
    { _id: "65bb1200abc9990011223348", boutiqueId: "65ab1200abc4560099887770", nomBoutique: "Maison Déco", titre: "Liquidation Stock", taux: 40, prixInitial: 200000, prixReduit: 120000, description: "Grande liquidation sur articles de décoration", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-1sHHDai9LeBtgS8dMGUUqDMAGCDDVCsjqg&s", dateDebut: "2026-03-02", dateFin: "2026-03-12", vues: 67, createdAt: "2026-03-01T14:00:00Z"},
    { _id: "65bb1200abc9990011223349", boutiqueId: "65ab1200abc4560099887771", nomBoutique: "Electro Shop", titre: "Promo Téléviseurs 4K", taux: 20, prixInitial: 1800000, prixReduit: 1440000, description: "Réduction exceptionnelle sur les Smart TV 4K", imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1", dateDebut: "2026-03-10", dateFin: "2026-03-25", vues: 215, createdAt: "2026-03-03T08:20:00Z"},
    { _id: "65bb1200abc9990011223350", boutiqueId: "65ab1200abc4560099887772", nomBoutique: "Sport Pro", titre: "Équipements Fitness", taux: 35, prixInitial: 300000, prixReduit: 195000, description: "Offre spéciale sur haltères et tapis de course", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", dateDebut: "2026-03-12", dateFin: "2026-03-30", vues: 142, createdAt: "2026-03-04T10:00:00Z"},
    { _id: "65bb1200abc9990011223351", boutiqueId: "65ab1200abc4560099887773", nomBoutique: "Kids Land", titre: "Promo Jouets Éducatifs", taux: 18, prixInitial: 80000, prixReduit: 65600, description: "Promotion sur jeux éducatifs pour enfants", imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b", dateDebut: "2026-03-01", dateFin: "2026-03-18", vues: 98, createdAt: "2026-03-02T11:30:00Z"},
    { _id: "65bb1200abc9990011223352", boutiqueId: "65ab1200abc4560099887774", nomBoutique: "Mode Élégance", titre: "Nouvelle Collection", taux: 12, prixInitial: null, prixReduit: null, description: "Remise sur la nouvelle collection printemps", imageUrl: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47", dateDebut: "2026-03-05", dateFin: "2026-03-22", vues: 276, createdAt: "2026-03-03T09:15:00Z"},
    { _id: "65bb1200abc9990011223353", boutiqueId: "65ab1200abc4560099887775", nomBoutique: "Auto Accessoires", titre: "Promo Accessoires Auto", taux: 22, prixInitial: 150000, prixReduit: 117000, description: "Réduction sur housses et tapis voiture", imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", dateDebut: "2026-03-08", dateFin: "2026-03-28", vues: 54, createdAt: "2026-03-03T13:40:00Z"},
    { _id: "65bb1200abc9990011223354", boutiqueId: "65ab1200abc4560099887776", nomBoutique: "Gadget Store", titre: "Accessoires Gaming", taux: 28, prixInitial: 250000, prixReduit: 180000, description: "Offre limitée sur claviers et casques gaming", imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7", dateDebut: "2026-03-15", dateFin: "2026-03-31", vues: 361, createdAt: "2026-03-04T07:50:00Z"
    }
  ];
  private categories: any[] = [
    { _id: "1", nom: "Électronique", iconClass: "fa-solid fa-laptop" },
    { _id: "2", nom: "Mode & Beauté", iconClass: "fa-solid fa-shirt" },
    { _id: "3", nom: "Restauration", iconClass: "fa-solid fa-utensils" },
    { _id: "4", nom: "Maison", iconClass: "fa-solid fa-house" }
  ];

  // ======================================================
  // ========================== GET ========================
  // ======================================================

  get<T>(url: string, params?: any): Observable<T> {

    // 6️⃣ DETAIL BOUTIQUE
    if (url.startsWith(`${this.API_URL}/boutiques/`)) {
      const id = url.split('/').pop();
      const boutique = this.boutiquesDetails.find(b => b._id === id);

      if (!boutique) {
        return throwError(() => ({ status: 404, message: "Boutique non trouvée" }));
      }

      return of(boutique as unknown as T).pipe(delay(600));
    }

    // 7️⃣ DETAIL PROMOTION
    if (url.startsWith(`${this.API_URL}/promotions/`)) {
      const id = url.split('/').pop();
      const promo = this.promotions.find(p => p._id === id);

      if (!promo) {
        return throwError(() => ({ status: 404, message: "Promotion non trouvée" }));
      }

      return of(promo as unknown as T).pipe(delay(600));
    }

    // 8️⃣ PLAN CENTRE
    if (url === `${this.API_URL}/center/plan`) {
      return of({
        planImageUrl: "https://e7.pngegg.com/pngimages/193/849/png-clipart-foyleside-shopping-centre-square-one-mall-washington-square-carine-glades-shopping-centre-map-foyleside-shopping-centre-square-one-mall.png"
      } as unknown as T).pipe(delay(500));
    }

    // 🔎 RECHERCHE + PAGINATION BOUTIQUES
    if (url === `${this.API_URL}/boutiques`) {

      const query = params?.get('query')?.toLowerCase() || '';
      const page = Number(params?.get('page') || 1);
      const limit = Number(params?.get('limit') || 5);

      // 🔍 FILTRAGE
      const filtered = this.boutiques.filter(b =>
        b.nom.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.categorie.nom.toLowerCase().includes(query)
      );

      const totalItems = filtered.length;

      // 📄 Pagination réelle
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedData = filtered.slice(startIndex, endIndex);

      const hasMore = endIndex < totalItems;

      return of({
        data: paginatedData,
        pagination: {
          page,
          limit,
          totalItems,
          hasMore
        }
      } as unknown as T).pipe(delay(700));
    }
    // 🔎 RECHERCHE + PAGINATION PROMOTIONS
    if (url === `${this.API_URL}/promotions`) {

      const query = (params?.get('query') || '').toLowerCase();
      const page = Number(params?.get('page') || 1); // page commence à 1
      const limit = Number(params?.get('limit') || 5);

      // 🔎 Filtrage réel
      let filtered = this.promotions.filter(p =>
        p.titre.toLowerCase().includes(query) ||
        p.nomBoutique.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );

      const totalItems = filtered.length;

      // 📄 Pagination réelle
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedData = filtered.slice(startIndex, endIndex);

      const hasMore = endIndex < totalItems;

      return of({
        data: paginatedData,
        pagination: {
          page,
          limit,
          totalItems,
          hasMore
        }
      } as unknown as T).pipe(delay(700));
    }
    // 8️⃣ Liste catégories
    if (url === `${this.API_URL}/categories`) {
      return of(this.categories as unknown as T).pipe(delay(600));
    }

    return throwError(() => ({
      status: 404,
      message: `GET ${url} non simulé`
    }));
  }

}