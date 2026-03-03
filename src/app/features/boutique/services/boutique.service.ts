import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environement';
import { BoutiqueHttpClient } from '../../../a-httpclient-simulation/boutique-http-client';

export interface PromotionCreate {
  titre: string;
  taux: number|null;
  prixInitial: number|null;
  prixReduit: number|null;
  description: string;
  dateDebut: string;
  dateFin: string;
}
export interface Promotion {
  _id: string;
  titre: string;
  taux: number;
  prixInitial: number;
  prixReduit: number;
  description: string;
  imageUrl: string;
  dateDebut: string;
  dateFin: string;
  status: string;
  vues: number;
  createdAt: string;
}
export interface ProduitCreate {
  nom: string;
  prix: number;
  description: string;
}
export interface Produit {
  _id?: string; // Optionnel pour la création
  nom: string;
  prix: number;
  description: string;
  imageUrl?: string; // Optionnel
}
// ========================
export interface Categorie {
  nom: string;
  iconClass: string;
}

export interface Zone {
  etage: string;
  bloc: string;
  box: string;
  description: string;
}

export interface Horaires {
  jours: string;
  heures: string;
}

export interface Contacts {
  telephoneProprio?: string;
  telephoneBoutique: string;
  email: string;
}

export interface MeBoutique {
  _id: string;
  nom: string;
  description: string;
  logoUrl: string;
  categorie: Categorie;
  zone: Zone;
  horaires: Horaires;
  contacts: Contacts;
  vues: number;
  createdAt: string; // ou Date si tu transformes côté frontend
}

export interface BoutiqueUpdate {
  nom: string;
  description: string;
  horaires: Horaires;
  telephoneProprio: string;
  telephoneBoutique: string;
  email: string;
}

export interface BoutiqueStat{
  vues: number; promoClics: number ;
}

@Injectable({ providedIn: 'root' })
export class BoutiqueService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http : BoutiqueHttpClient,){}


  getProfile(): Observable<MeBoutique> {
    return this.http.get<MeBoutique>(`${this.API_URL}/me/boutique`);
  }

  updateProfile(profileData: BoutiqueUpdate): Observable<any> {
    return this.http.put<BoutiqueUpdate>(`${this.API_URL}/me/boutique`, profileData);
  }


  getProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API_URL}/me/produits`);
  }

  addProduct(productData: ProduitCreate, imageFile?: File|null): Observable<any> {
    const formData = new FormData();
    // On envoie le JSON sous forme de string dans la clé 'data'
    formData.append('data', JSON.stringify(productData));
    if(imageFile){
      formData.append('image', imageFile);
    }

    return this.http.post<any>(`${this.API_URL}/me/produits`, formData);
  }


  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.API_URL}/me/promotions`);
  }

  createPromotion(promoData: PromotionCreate, imageFile?: File|null): Observable<any> {
    const formData = new FormData();
    formData.append( 'data',
      new Blob([JSON.stringify(promoData)], {type: 'application/json'})
    );
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<any>(`${this.API_URL}/me/promotions`, formData);
  }

  getBoutiqueStat(): Observable<BoutiqueStat> {
    return this.http.get<BoutiqueStat>(`${this.API_URL}/me/stats`);
  }
}
