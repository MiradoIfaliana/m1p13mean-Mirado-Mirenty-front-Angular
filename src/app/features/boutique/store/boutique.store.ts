import { Injectable, signal, computed } from '@angular/core';
import { BoutiqueService, MeBoutique, BoutiqueUpdate, Produit, ProduitCreate, Promotion, PromotionCreate, BoutiqueStat } from '../services/boutique.service';
import { Annonce, AnnoncePublicService } from '../../../core/services/annonce-public.service';

@Injectable({ providedIn: 'root' })
export class BoutiqueStore {

  constructor(private boutiqueService: BoutiqueService, private annoncePublicService: AnnoncePublicService) {}

  // =========================
  //  PROFIL BOUTIQUE
  // =========================

  private _profile = signal<MeBoutique | null>(null);
  private _loadingProfile = signal<boolean>(false);
  private _errorProfile = signal<string | null>(null);
  private _successProfile = signal<boolean>(false);

  readonly profile = this._profile.asReadonly();
  readonly loadingProfile = computed(() => this._loadingProfile());
  readonly errorProfile = computed(() => this._errorProfile());
  readonly successProfile = computed(() => this._successProfile());

  loadProfile() {
    this._loadingProfile.set(true);
    this._errorProfile.set(null);
    this._successProfile.set(false);
    this.boutiqueService.getProfile().subscribe({
      next: (res) => {
        this._loadingProfile.set(false);
        this._profile.set(res);
      },
      error: (error) => {
        console.error(error);
        this._loadingProfile.set(false);
        this._errorProfile.set("Erreur chargement profil.");
      }
    });
  }

  updateProfile(data: BoutiqueUpdate) {
    if (this.loadingProfile()) return;

    this._loadingProfile.set(true);
    this._errorProfile.set(null);
    this._successProfile.set(false);

    this.boutiqueService.updateProfile(data).subscribe({
      next: () => {
        this._loadingProfile.set(false);
        this._successProfile.set(true);
        this.loadProfile(); // refresh
      },
      error: (err) => {
        this._loadingProfile.set(false);
        this._errorProfile.set(err?.error?.message || "Erreur mise à jour.");
      }
    });
  }

  resetProfileStatus() {
    this._errorProfile.set(null);
    this._successProfile.set(false);
  }

  // =========================
  //  PRODUITS
  // =========================

  private _products = signal<Produit[] | null>(null);
  private _loadingProducts = signal<boolean>(false);

  private _loadingAddProduct = signal<boolean>(false);
  private _errorAddProduct = signal<string | null>(null);
  private _successAddProduct = signal<boolean>(false);

  readonly products = this._products.asReadonly();
  readonly loadingProducts = computed(() => this._loadingProducts());

  readonly loadingAddProduct = computed(() => this._loadingAddProduct());
  readonly errorAddProduct = computed(() => this._errorAddProduct());
  readonly successAddProduct = computed(() => this._successAddProduct());

  loadProducts() {
    this._loadingProducts.set(true);

    this.boutiqueService.getProducts().subscribe({
      next: (res) => {
        this._loadingProducts.set(false);
        this._products.set(res);
      },
      error: () => {
        this._loadingProducts.set(false);
      }
    });
  }

  addProduct(data: ProduitCreate, file?: File | null) {
    if (this.loadingAddProduct()) return;

    this._loadingAddProduct.set(true);
    this._errorAddProduct.set(null);
    this._successAddProduct.set(false);

    this.boutiqueService.addProduct(data, file).subscribe({
      next: (newProduct) => {
        this._loadingAddProduct.set(false);
        this._successAddProduct.set(true);

        const current = this._products();
        if (current) {
          this._products.set([newProduct, ...current]); // update optimiste
        }
      },
      error: (err) => {
        this._loadingAddProduct.set(false);
        this._errorAddProduct.set(err?.error?.message || "Erreur création produit.");
      }
    });
  }

  resetAddProductStatus() {
    this._errorAddProduct.set(null);
    this._successAddProduct.set(false);
  }

  // =========================
  //  PROMOTIONS
  // =========================

  private _promotions = signal<Promotion[] | null>(null);
  private _loadingPromotions = signal<boolean>(false);

  private _loadingAddPromotion = signal<boolean>(false);
  private _errorAddPromotion = signal<string | null>(null);
  private _successAddPromotion = signal<boolean>(false);

  readonly promotions = this._promotions.asReadonly();
  readonly loadingPromotions = computed(() => this._loadingPromotions());

  readonly loadingAddPromotion = computed(() => this._loadingAddPromotion());
  readonly errorAddPromotion = computed(() => this._errorAddPromotion());
  readonly successAddPromotion = computed(() => this._successAddPromotion());

  loadPromotions() {
    this._loadingPromotions.set(true);

    this.boutiqueService.getPromotions().subscribe({
      next: (res) => {
        this._loadingPromotions.set(false);
        this._promotions.set(res);
      },
      error: () => {
        this._loadingPromotions.set(false);
      }
    });
  }

  addPromotion(data: PromotionCreate, file?: File | null) {
    if (this.loadingAddPromotion()) return;

    this._loadingAddPromotion.set(true);
    this._errorAddPromotion.set(null);
    this._successAddPromotion.set(false);

    this.boutiqueService.createPromotion(data, file).subscribe({
      next: (newPromo) => {
        this._loadingAddPromotion.set(false);
        this._successAddPromotion.set(true);

        // const current = this._promotions();
        // if (current) {
        //   this._promotions.set([newPromo, ...current]);
        // }
        this.loadPromotions();
      },
      error: (err) => {
        this._loadingAddPromotion.set(false);
        this._errorAddPromotion.set(err?.error?.message || "Erreur création promotion.");
      }
    });
  }

  resetAddPromotionStatus() {
    this._errorAddPromotion.set(null);
    this._successAddPromotion.set(false);
  }

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

  // =========================
  // STATISTIQUES BOUTIQUE
  // =========================

  private _stats = signal<BoutiqueStat | null>(null);
  private _loadingStats = signal<boolean>(false);
  private _errorStats = signal<string | null>(null);

  readonly stats = this._stats.asReadonly();
  readonly loadingStats = computed(() => this._loadingStats());
  readonly errorStats = computed(() => this._errorStats());
  loadStats() {
  this._loadingStats.set(true);
  this._errorStats.set(null);

  this.boutiqueService.getBoutiqueStat().subscribe({
    next: (res) => {
      this._loadingStats.set(false);
      this._stats.set(res);
    },
    error: (err) => {
      this._loadingStats.set(false);
      this._errorStats.set(
        err?.error?.message || "Erreur lors du chargement des statistiques."
      );
    }
  });
}

}
