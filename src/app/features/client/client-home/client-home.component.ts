import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-client-home.component',
  imports: [],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
})
export class ClientHomeComponent {
/*promotions = signal([
    {
      id: 1,
      name: 'MacBook Pro M3',
      category: 'Informatique',
      oldPrice: 2499,
      newPrice: 1999,
      discount: '-20%',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Wb0UrOBadnuJnKkOr5Zu3NhkRWc0NlbCaQ&s',
      tag: 'Vente Flash',
      timeLeft: '05h 20m'
    },
    {
      id: 2,
      name: 'Sony WH-1000XM5',
      category: 'Audio',
      oldPrice: 399,
      newPrice: 299,
      discount: '-25%',
      image: 'https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3024239_2.jpg',
      tag: 'Populaire',
      timeLeft: null
    },
    {
      id: 3,
      name: 'iPhone 15 Pro',
      category: 'Mobile',
      oldPrice: 1299,
      newPrice: 1099,
      discount: '-15%',
      image: 'https://www.iphon.fr/app/uploads/2023/08/fiche-technique-iphone-15-pro-max.jpg',
      tag: 'Nouveau Prix',
      timeLeft: '12h 45m'
    },
    {
      id: 4,
      name: 'iPhone 15 Pro',
      category: 'Mobile',
      oldPrice: 1299,
      newPrice: 1099,
      discount: '-15%',
      image: 'https://www.iphon.fr/app/uploads/2023/08/fiche-technique-iphone-15-pro-max.jpg',
      tag: 'Nouveau Prix',
      timeLeft: '12h 45m'
    },
    {
      id: 5,
      name: 'iPhone 15 Pro',
      category: 'Mobile',
      oldPrice: 1299,
      newPrice: 1099,
      discount: '-15%',
      image: 'https://www.iphon.fr/app/uploads/2023/08/fiche-technique-iphone-15-pro-max.jpg',
      tag: 'Nouveau Prix',
      timeLeft: '12h 45m'
    }
  ]);*/

  boutiques=signal(
    {
      data: [
        {
          _id: "65ab1200abc4560099887766",
          nom: "Fashion Store",
          logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGdsBB6XhUrTu9CWOEV4h6X9zkJiGuR518w&s",
          categorie: {
            _id: "65a2c987abc4560099887766",
            nom: "Mode"
          },
          horaires: {
            jours: "Tous les jours",
            heures: "08h00 - 20h00"
          },
          contact: "+261 34 00 000 00",
          estFavoris: true
        },
        {
          _id: "65ab1200abc4560099887767",
          nom: "Tech World",
          logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZx-DNUeoOcjCmHQK4Yn3krGZrHa3BfWj1hg&s",
          categorie: {
            _id: "65a2c987abc4560099887767",
            nom: "Électronique"
          },
          horaires: {
            jours: "Lun - Sam",
            heures: "09h00 - 18h30"
          },
          contact: "+261 32 12 345 67",
          estFavoris: false
        },
        {
          _id: "65ab1200abc4560099887768",
          nom: "Super Marché Anosy",
          logoUrl: "https://img.freepik.com/vecteurs-premium/logo-achat-ligne-au-supermarche_1199645-37308.jpg?semt=ais_hybrid&w=740&q=80",
          categorie: {
            _id: "65a2c987abc4560099887768",
            nom: "Alimentation"
          },
          horaires: {
            jours: "Tous les jours",
            heures: "07h30 - 21h00"
          },
          contact: "+261 33 45 678 90",
          estFavoris: true
        },
        {
          _id: "65ab1200abc4560099887769",
          nom: "Beauty Glam",
          logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkK3vJKGEYd2wJFAuNRCIezzhGLTpsmx2k8w&s",
          categorie: {
            _id: "65a2c987abc4560099887769",
            nom: "Cosmétique"
          },
          horaires: {
            jours: "Mar - Dim",
            heures: "10h00 - 19h00"
          },
          contact: "+261 38 98 765 43",
          estFavoris: false
        },
        {
          _id: "65ab1200abc4560099887770",
          nom: "Maison Déco",
          logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1-7rP0PhZw7GDXaqpOKBq2_F6IivpHqrmQ&s",
          categorie: {
            _id: "65a2c987abc4560099887770",
            nom: "Maison & Décoration"
          },
          horaires: {
            jours: "Lun - Ven",
            heures: "08h30 - 17h30"
          },
          contact: "+261 37 11 223 44",
          estFavoris: true
        }
      ],
      pagination: {
        page: 1,
        limit: 5,
        totalItems: 23,
        hasMore: true
      }
    }
  );

  promotions = signal(
    {
  data: [
    {
      _id: "65bb1200abc9990011223344",
      boutiqueId: "65ab1200abc4560099887766",
      nomBoutique: "Fashion Store",
      titre: "Soldes été",
      taux: 30,
      prixInitial: 100000,
      prixReduit: 70000,
      description: "Réduction spéciale été",
      imageUrl: "https://pic.clubic.com/942c97791807948/1200x675/smart/soldes_summer_2020.jpg",
      dateDebut: "2026-02-01",
      dateFin: "2026-02-10",
      vues: 150,
      createdAt: "2026-01-25T10:00:00Z"
    },
    {
      _id: "65bb1200abc9990011223345",
      boutiqueId: "65ab1200abc4560099887767",
      nomBoutique: "Tech World",
      titre: "Promo Smartphone",
      taux: 15,
      prixInitial: 800000,
      prixReduit: 680000,
      description: "Offre limitée sur les smartphones Android",
      imageUrl: "https://pic.clubic.com/9a58d32f2074911/1200x675/smart/1.jpg",
      dateDebut: "2026-03-01",
      dateFin: "2026-03-15",
      vues: 320,
      createdAt: "2026-02-27T08:30:00Z"
    },
    {
      _id: "65bb1200abc9990011223346",
      boutiqueId: "65ab1200abc4560099887768",
      nomBoutique: "Super Marché Anosy",
      titre: "Pack Familial",
      taux: 10,
      prixInitial: 50000,
      prixReduit: 45000,
      description: "Promotion sur les produits alimentaires essentiels",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0RxP6fJ6wrXkA-lHWPisTTWUJhbPFi9s4iQ&s",
      dateDebut: "2026-03-05",
      dateFin: "2026-03-20",
      vues: 89,
      createdAt: "2026-03-01T12:15:00Z"
    },
    {
      _id: "65bb1200abc9990011223347",
      boutiqueId: "65ab1200abc4560099887769",
      nomBoutique: "Beauty Glam",
      titre: "Offre Saint-Valentin",
      taux: 25,
      prixInitial: 120000,
      prixReduit: 90000,
      description: "Remise spéciale sur les coffrets beauté",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWh2lqPQWqzHihXOE2gNDvmUOeTSqTNHCuZg&s",
      dateDebut: "2026-02-05",
      dateFin: "2026-02-14",
      vues: 410,
      createdAt: "2026-01-30T09:45:00Z"
    },
    {
      _id: "65bb1200abc9990011223348",
      boutiqueId: "65ab1200abc4560099887770",
      nomBoutique: "Maison Déco",
      titre: "Liquidation Stock",
      taux: 40,
      prixInitial: 200000,
      prixReduit: 120000,
      description: "Grande liquidation sur articles de décoration",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-1sHHDai9LeBtgS8dMGUUqDMAGCDDVCsjqg&s",
      dateDebut: "2026-03-02",
      dateFin: "2026-03-12",
      vues: 67,
      createdAt: "2026-03-01T14:00:00Z"
    }
  ],
  pagination: {
    page: 1,
    limit: 5,
    totalItems: 23,
    hasMore: true
  }
}
  );

  annonces = signal([
  {_id: "65b4100abc1230099887766",title: "Ouverture exceptionnelle",content: "Le centre sera ouvert jusqu’à 22h ce samedi pour faciliter vos achats.",createdAt: "2026-02-02T14:00:00Z"
  },
  {_id: "65b4100abc1230099887701",title: "Nouvelle boutique disponible",content: "Une nouvelle boutique high-tech ouvre ses portes au niveau 2 dès lundi.",createdAt: "2026-02-05T09:00:00Z"
  },
  {_id: "65b4100abc1230099887702",title: "Maintenance programmée",content: "Une maintenance du système est prévue ce dimanche entre 01h et 03h.",createdAt: "2026-02-10T18:30:00Z"
  },
  {_id: "65b4100abc1230099887703",title: "Événement spécial Saint-Valentin",content: "Des animations spéciales et réductions exclusives seront proposées ce 14 février.",createdAt: "2026-02-12T11:15:00Z"
  }
  ]);

  categories=signal( [
    { _id: "1", nom: "Électronique", iconClass: "fa-solid fa-laptop" },
    { _id: "2", nom: "Mode & Beauté", iconClass: "fa-solid fa-shirt" },
    { _id: "3", nom: "Restauration", iconClass: "fa-solid fa-utensils" },
    { _id: "4", nom: "Maison", iconClass: "fa-solid fa-house" }
  ]);

  scroll(container: HTMLElement, direction: 'left' | 'right') {
    const amount = 200;
    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  }


}
