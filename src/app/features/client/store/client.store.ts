import { Injectable, signal, computed } from '@angular/core';
import { BoutiqueDetails, BoutiqueListItem, CenterPlan, ClientService, PaginatedResponse, PromotionDetails, PromotionListItem } from '../services/client.services';
import { AnnoncePublicService } from '../../../core/services/annonce-public.service';
import { Annonce } from '../../admin/components/annonce/annonces/annonces.component';
import { CategoriePublicService } from '../../../core/services/categorie-public.service';
import { Categorie } from '../../../core/store/categorie.state';

@Injectable({ providedIn: 'root' })
export class ClientStore {

  constructor(private clientService: ClientService, private annoncePublicService: AnnoncePublicService, private categorie:CategoriePublicService) {}

  private _paramsSearch = signal<{params?: { query?: string; category?: string; estFavoris?: boolean; pageB?: number; limitB?: number;pageP?: number; limitP?: number}}|null>(null);
  readonly paramsSearch = computed(() => this._paramsSearch());
  // =========================
  //  BOUTIQUES
  // =========================

  private _boutiques = signal<PaginatedResponse<BoutiqueListItem> | null>(null);
  private _loadingBoutiques = signal<boolean>(false);
  private _errorBoutiques = signal<string | null>(null);

  readonly boutiques = this._boutiques.asReadonly();
  readonly loadingBoutiques = computed(() => this._loadingBoutiques());
  readonly errorBoutiques = computed(() => this._errorBoutiques());

  setParamsSearch<K extends keyof { query?: string; category?: string; estFavoris?: boolean; pageB?: number; limitB?: number;pageP?: number; limitP?: number;}>(
    key: K,value: { query?: string; category?: string; estFavoris?: boolean;  pageB?: number; limitB?: number;pageP?: number; limitP?: number;}[K]
  ) {
    this._paramsSearch.update(prev => ({
      ...prev,
      [key]: value
    }));
  }


  loadBoutiques(add=false) {
    this._loadingBoutiques.set(true);
    this._errorBoutiques.set(null);

    this.clientService.getBoutiques(this._paramsSearch()?.params || {}).subscribe({
      next: (res) => {
        this._loadingBoutiques.set(false);
        if(add===true){
          this._boutiques.update(prev => {
            if (!prev) { return res;}
            return {
              ...res,
              data: [...prev.data, ...res.data]
            };
          });
        }else{
          this._boutiques.set(res);
        }
      },
      error: (err) => {
        this._loadingBoutiques.set(false);
        this._errorBoutiques.set(err?.error?.message || 'Erreur chargement boutiques.');
      }
    });
  }

  // =========================
  //  DÉTAIL BOUTIQUE
  // =========================

  private _boutiqueDetails = signal<BoutiqueDetails | null>(null);
  private _loadingBoutiqueDetails = signal<boolean>(false);
  private _errorBoutiqueDetails = signal<string | null>(null);

  readonly boutiqueDetails = this._boutiqueDetails.asReadonly();
  readonly loadingBoutiqueDetails = computed(() => this._loadingBoutiqueDetails());
  readonly errorBoutiqueDetails = computed(() => this._errorBoutiqueDetails());

  loadBoutiqueById(id: string) {
    this._loadingBoutiqueDetails.set(true);
    this._errorBoutiqueDetails.set(null);

    this.clientService.getBoutiqueById(id).subscribe({
      next: (res) => {
        this._loadingBoutiqueDetails.set(false);
        this._boutiqueDetails.set(res);
      },
      error: (err) => {
        this._loadingBoutiqueDetails.set(false);
        this._errorBoutiqueDetails.set(err?.error?.message || 'Erreur chargement boutique.');
      }
    });
  }

  // =========================
  //  PROMOTIONS
  // =========================

  private _promotions = signal<PaginatedResponse<PromotionListItem> | null>(null);
  private _loadingPromotions = signal<boolean>(false);
  private _errorPromotions = signal<string | null>(null);

  readonly promotions = this._promotions.asReadonly();
  readonly loadingPromotions = computed(() => this._loadingPromotions());
  readonly errorPromotions = computed(() => this._errorPromotions());

  loadPromotions(params?: { query?: string; category?: string; estFavoris?: boolean; page?: number; limit?: number}) {
    this._loadingPromotions.set(true);
    this._errorPromotions.set(null);

    this.clientService.getPromotions(params || {}).subscribe({
      next: (res) => {
        this._loadingPromotions.set(false);
        this._promotions.set(res);
      },
      error: (err) => {
        this._loadingPromotions.set(false);
        this._errorPromotions.set(err?.error?.message || 'Erreur chargement promotions.');
      }
    });
  }

  // =========================
  //  DÉTAIL PROMOTION
  // =========================

  private _promotionDetails = signal<PromotionDetails | null>(null);
  private _loadingPromotionDetails = signal<boolean>(false);
  private _errorPromotionDetails = signal<string | null>(null);

  readonly promotionDetails = this._promotionDetails.asReadonly();
  readonly loadingPromotionDetails = computed(() => this._loadingPromotionDetails());
  readonly errorPromotionDetails = computed(() => this._errorPromotionDetails());

  loadPromotionById(id: string) {
    this._loadingPromotionDetails.set(true);
    this._errorPromotionDetails.set(null);

    this.clientService.getPromotionById(id).subscribe({
      next: (res) => {
        this._loadingPromotionDetails.set(false);
        this._promotionDetails.set(res);
      },
      error: (err) => {
        this._loadingPromotionDetails.set(false);
        this._errorPromotionDetails.set(err?.error?.message || 'Erreur chargement promotion.');
      }
    });
  }

  // =========================
  //  PLAN DU CENTRE COMMERCIAL
  // =========================

  private _centerPlan = signal<CenterPlan | null>(null);
  private _loadingCenterPlan = signal<boolean>(false);
  private _errorCenterPlan = signal<string | null>(null);

  readonly centerPlan = this._centerPlan.asReadonly();
  readonly loadingCenterPlan = computed(() => this._loadingCenterPlan());
  readonly errorCenterPlan = computed(() => this._errorCenterPlan());

  loadCenterPlan() {
    this._loadingCenterPlan.set(true);
    this._errorCenterPlan.set(null);

    this.clientService.getCenterPlan().subscribe({
      next: (res) => {
        this._loadingCenterPlan.set(false);
        this._centerPlan.set(res);
      },
      error: (err) => {
        this._loadingCenterPlan.set(false);
        this._errorCenterPlan.set(err?.error?.message || 'Erreur chargement plan centre.');
      }
    });
  }
  //==============================
  // ANNONCE
  //==============================
  
    private _annonces = signal<Annonce[] | null>(null);
    private _loadingAnnonces = signal<boolean>(false);
  
    readonly annonces = this._annonces.asReadonly();
    readonly loadingAnnonces = computed(() => this._loadingAnnonces());
  
    loadAnnonces() {
      this._loadingAnnonces.set(true);
      // Utilise AnnoncePublicService pour la récupération (findAll)
      this.annoncePublicService.findAll().subscribe({
        next: (res) => {
          this._loadingAnnonces.set(false);
          this._annonces.set(res);
        },
        error: (error) => {
          this._loadingAnnonces.set(false);
          console.error('Erreur lors du chargement des annonces:', error);
        }
      });
    }

  //==============================
  // Categorie
  //==============================

    private _categories = signal<Categorie[] | null>(null);
    private _loadingCategories = signal<boolean>(false);

    readonly categories = this._categories.asReadonly();
    readonly loadingCategories = computed(() => this._loadingCategories());

    loadCategories() {
      this._loadingCategories.set(true);
      // Utilise CategoriePublicService pour la récupération (findAll)
      this.clientService.getCategories().subscribe({
        next: (res) => {
          this._loadingCategories.set(false);
          this._categories.set(res);
        },
        error: (error) => {
          this._loadingCategories.set(false);
          console.error('Erreur lors du chargement des Categories:', error);
        }
      });
    }

}