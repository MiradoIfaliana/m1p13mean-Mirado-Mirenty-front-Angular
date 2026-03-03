import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientHttpClient } from '../../../a-httpclient-simulation/client-http-client';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environement';
import { Categorie } from '../../../core/store/categorie.state';


// =======================
// INTERFACES COMMUNES
// =======================

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  hasMore: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

// =======================
// BOUTIQUES
// =======================

export interface BoutiqueListItem {
  _id: string;
  nom: string;
  logoUrl: string;
  categorie: {
    _id: string;
    nom: string;
  };
  horaires: {
    jours: string;
    heures: string;
  };
  contact: string;
  estFavoris: boolean;
}

export interface BoutiqueDetails {
  _id: string;
  nom: string;
  description: string;
  logoUrl: string;
  categorie: {
    nom: string;
    iconClass: string;
  };
  zone: {
    etage: string;
    bloc: string;
    box:string
    description: string;
  };
  horaires: {
    jours: string;
    heures: string;
  };
  contacts: {
    telephoneBoutique: string;
    email: string;
  };
  vues: number;
  createdAt: string;
}

// =======================
// PROMOTIONS
// =======================

export interface PromotionListItem {
  _id: string;
  boutiqueId: string;
  nomBoutique: string;
  titre: string;
  taux: number;
  prixInitial: number | null;
  prixReduit: number | null;
  description: string;
  imageUrl: string;
  dateDebut: string;
  dateFin: string;
  estFavoris: boolean;
  vues: number;
  createdAt: string;
}

export interface PromotionDetails {
  _id: string;
  boutiqueId: string;
  nomBoutique: string;
  titre: string;
  taux: number;
  prixInitial: number;
  prixReduit: number;
  description: string;
  imageUrl: string;
  dateDebut: string;
  dateFin: string;
  vues: number;
  createdAt: string;
}

export interface CenterPlan {
  planImageUrl: string;
}

// =======================
// SERVICE
// =======================

@Injectable({ providedIn: 'root' })
export class ClientService {

  private readonly API_URL = environment.apiUrl;

  constructor(private http: ClientHttpClient) {}

  // ============================================
  // LISTE DES BOUTIQUES (pagination + filtres)
  // ============================================

  getBoutiques(params: {
    query?: string;
    category?: string;
    estFavoris?: boolean;
    page?: number;
    limit?: number;
  }): Observable<PaginatedResponse<BoutiqueListItem>> {

    const queryParams = new URLSearchParams();

    let param = new HttpParams();

    if (params.query) param=param.set('query', params.query);
    if (params.category) param=param.set('category', params.category);
    if (params.estFavoris !== undefined) param=param.set('estFavoris', String(params.estFavoris));
    if (params.page) param=param.set('page', String(params.page));
    if (params.limit) param=param.set('limit', String(params.limit));

    return this.http.get<PaginatedResponse<BoutiqueListItem>>(`${this.API_URL}/boutiques`,param);
  }

  // ============================================
  // DÉTAIL BOUTIQUE
  // ============================================

  getBoutiqueById(id: string): Observable<BoutiqueDetails> {
    return this.http.get<BoutiqueDetails>(`${this.API_URL}/boutiques/${id}`);
  }

  // ============================================
  // LISTE DES PROMOTIONS (pagination + filtres)
  // ============================================

  getPromotions(params: {
    query?: string;
    category?: string;
    estFavoris?: boolean;
    page?: number;
    limit?: number;
  }): Observable<PaginatedResponse<PromotionListItem>> {

    let param = new HttpParams();

    if (params.query) param=param.set('query', params.query);
    if (params.category) param=param.set('category', params.category);
    if (params.estFavoris !== undefined) param=param.set('estFavoris', String(params.estFavoris));
    if (params.page) param=param.set('page', String(params.page));
    if (params.limit) param=param.set('limit', String(params.limit));

    return this.http.get<PaginatedResponse<PromotionListItem>>(`${this.API_URL}/promotions`,param);
  }

  // ============================================
  // DÉTAIL PROMOTION
  // ============================================

  getPromotionById(id: string): Observable<PromotionDetails> {
    return this.http.get<PromotionDetails>(`${this.API_URL}/promotions/${id}`);
  }

  getCenterPlan(): Observable<CenterPlan> {
    return this.http.get<CenterPlan>(`${this.API_URL}/center/plan`);
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get(`${this.API_URL}/categories`);
  }

}