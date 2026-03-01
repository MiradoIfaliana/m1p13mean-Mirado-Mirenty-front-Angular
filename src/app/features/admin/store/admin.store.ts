import { Injectable, signal, computed } from '@angular/core'
import { catchError, firstValueFrom, of, tap } from 'rxjs'
import { DashboardStats } from '../components/dashboard/dashboard-admin/dashboard-admin.component'
import { StatisticsAdminService } from '../services/statistics-admin.service';
import { AdminService, Boutique, CategorieCreate, centerUpdate, Zone, ZoneCreate } from '../services/admin.service';
import { CenterProfile } from '../components/profil-center/center-profil/center-profil.component';
import { Categorie } from '../../../core/store/categorie.state';

export interface UserRegister{
  nom:string,
  genre:number,
  dateNaissance:string,
  email:string,
  password:string
}

@Injectable({ providedIn: 'root' })
export class AdminStore {

  private _dashboard = signal<DashboardStats | null>(null)
  private _errorStat = signal<string|null>(null);

  dashboard = this._dashboard.asReadonly()
  readonly errorStat = computed(() => this._errorStat());

  constructor(private statisticsAdminService:StatisticsAdminService, private adminService:AdminService){}

  statistics(day:number){

    this.statisticsAdminService.statistics(day).subscribe({
      next : (res) =>{
        this._dashboard.set(res);
      },
      error : (error) => {
        console.error(error);
        this._errorStat.set(error.message);
      }
    })
  }
  resetStatusStat(){
    this._errorStat.set(null);
  }
  // PROFIL CENTRE
  private _centerProfil = signal<CenterProfile | null>(null);
  centerProfil = this._centerProfil.asReadonly();

  profil(){
    this.adminService.getCenterProfile().subscribe({
      next : (res) =>{
        this._centerProfil.set(res);
      },
      error : (error) => {
        console.error(error);
      }
    })
  }

  private _loadingUpProfil = signal<boolean>(false);
  private _errorUpProfil = signal<string|null>(null);
  private _successUpProfil = signal<boolean>(false);

  readonly loadingUpProfil = computed(() => this._loadingUpProfil());
  readonly errorUpProfil = computed(() => this._errorUpProfil());
  readonly successUpProfil = computed(() => this._successUpProfil());
  updateProfil(centerUpdate:centerUpdate,  file?: File|null){
    if (this.loadingUpProfil()) {
      return;
    }
    this._loadingUpProfil.set(true);
    this.adminService.updateCenter(centerUpdate,file).subscribe({
      next : () => {
        this._loadingUpProfil.set(false);
        this._successUpProfil.set(true);
      },
      error : (error) =>{
        this._loadingUpProfil.set(false);
        if ([400, 404, 409].includes(error?.status)) {
          this._errorUpProfil.set(error?.message);
        } else if(![401, 403].includes(error?.status)) {
          this._errorUpProfil.set( "Erreur inattendue. Veuillez réessayer plus tard.");
        }
      }
    })
  }
  // ZONES
  // PROFIL CENTRE
  private _zones = signal<Zone[] | null>(null);
  private _loadingZone = signal<boolean>(false);
  zones = this._zones.asReadonly();
  readonly loadingZone = computed(() => this._loadingZone());

  zonesCenter(){
    this._loadingZone.set(true);
    this.adminService.getZones().subscribe({
      next : (res) =>{
        this._loadingZone.set(false);
        this._zones.set(res);
      },
      error : (error) => {
        this._loadingZone.set(false);
        console.error(error);
      }
    })
  }

  private _loadingAddZone = signal<boolean>(false);
  private _errorAddZone = signal<string|null>(null);
  private _successAddZone = signal<boolean>(false);

  readonly loadingAddZone = computed(() => this._loadingAddZone());
  readonly errorAddZone = computed(() => this._errorAddZone());
  readonly successAddZone = computed(() => this._successAddZone());
  addZone(zoneCreate:ZoneCreate){
    if (this.loadingAddZone()) {
      return;
    }
    this._loadingAddZone.set(true);
    this.adminService.createZone(zoneCreate).subscribe({
      next : () => {
        this._loadingAddZone.set(false);
        this._successAddZone.set(true);
      },
      error : (error) =>{
        this._loadingAddZone.set(false);
        if ([400, 404, 409].includes(error?.status)) {
          this._errorAddZone.set(error?.message);
        } else if(![401, 403].includes(error?.status)) {
          this._errorAddZone.set( "Erreur inattendue. Veuillez réessayer plus tard.");
        }
      }
    })
  }
  resetStatusAddZone(){
    this._successAddZone.set(false);
    this._errorAddZone.set(null);
  }

  // --- ÉTATS DES CATÉGORIES (LECTURE) ---
  private _categories = signal<Categorie[] | null>(null);
  private _loadingCategories = signal<boolean>(false);

  readonly categories = this._categories.asReadonly();
  readonly loadingCategories = computed(() => this._loadingCategories());

  categoriesCenter() {
    this._loadingCategories.set(true);
    this.adminService.getCategories().subscribe({
      next: (res) => {
        this._loadingCategories.set(false);
        this._categories.set(res);
      },
      error: (error) => {
        this._loadingCategories.set(false);
        console.error('Erreur lors du chargement des catégories:', error);
      }
    });
  }
  private _loadingAddCategorie = signal<boolean>(false);
  private _errorAddCategorie = signal<string | null>(null);
  private _successAddCategorie = signal<boolean>(false);

  readonly loadingAddCategorie = computed(() => this._loadingAddCategorie());
  readonly errorAddCategorie = computed(() => this._errorAddCategorie());
  readonly successAddCategorie = computed(() => this._successAddCategorie());

  addCategorie(categorieCreate: CategorieCreate) {
    if (this.loadingAddCategorie()) {
      return;
    }

    this._loadingAddCategorie.set(true);
    this._errorAddCategorie.set(null); // Reset de l'erreur précédente
    this._successAddCategorie.set(false);

    this.adminService.createCategory(categorieCreate).subscribe({
      next: () => {
        this._loadingAddCategorie.set(false);
        this._successAddCategorie.set(true);
      },
      error: (error) => {
        this._loadingAddCategorie.set(false);
        if ([400, 404, 409].includes(error?.status)) {
          this._errorAddCategorie.set(error?.error?.message || error?.message);
        }
        else if (![401, 403].includes(error?.status)) {
          this._errorAddCategorie.set("Erreur inattendue lors de la création. Veuillez réessayer.");
        }
      }
    });
  }

  resetStatusAddCategorie() {
    this._successAddCategorie.set(false);
    this._errorAddCategorie.set(null);
  }

  // --- ÉTATS DES BOUTIQUES ---
  private _boutiques = signal<Boutique[] | null>(null);
  private _loadingBoutiques = signal<boolean>(false);

  readonly boutiques = this._boutiques.asReadonly();
  readonly loadingBoutiques = computed(() => this._loadingBoutiques());
  boutiquesCenter(status: string | null = null) {
    this._loadingBoutiques.set(true);

    this.adminService.getBoutiques(status).subscribe({
      next: (res) => {
        this._loadingBoutiques.set(false);
        this._boutiques.set(res);
      },
      error: (error) => {
        this._loadingBoutiques.set(false);
        console.error('Erreur lors du chargement des boutiques:', error);
      }
    });
  }

  // --- ÉTATS DES ACTIONS SUR BOUTIQUE ---
  private _loadingActionBoutique = signal<string[]>([]);
  private _successActionBoutique = signal<string[]>([]);
  private _errorActionBoutique = signal<{id:string,error:string}[]>([]);

  //readonly loadingActionBoutique = computed(() => this._loadingActionBoutique());
  readonly successActionBoutique = computed(() => this._successActionBoutique());
  readonly errorActionBoutique = computed(() => this._errorActionBoutique());

  loadingActionBoutiqueById(id: string) {
    return computed(() => this._loadingActionBoutique().includes(id));
  }
  successActionBoutiqueById(id: string) {
    return computed(() => this._successActionBoutique().includes(id));
  }
  errorActionBoutiqueById(id: string) {
    return computed(() =>
      this._errorActionBoutique().find(e => e.id === id)?.error || 'erreur d\'operation'
    );
  }

  lastIdInSuccessActionBoutiqueById() {
    return computed(() => this.successActionBoutique()[this.successActionBoutique().length-1]);
  }
  lastIdInErrorActionBoutique() {
    return computed(() => this.errorActionBoutique()[this.errorActionBoutique().length-1]);
  }

  validateBoutique(id: string) {
    this._startAction(id);
    this.adminService.validateBoutique(id).subscribe({
      next: () => this._handleActionSucces(id),
      error: (err) => this._handleActionError(id,err)
    });
  }

  activateBoutique(id: string) {
    this._startAction(id);
    this.adminService.activateBoutique(id).subscribe({
      next: () => this._handleActionSucces(id),
      error: (err) => this._handleActionError(id,err)
    });
  }

  disableBoutique(id: string) {
    this._startAction(id);
    this.adminService.disableBoutique(id).subscribe({
      next: () => this._handleActionSucces(id),
      error: (err) => this._handleActionError(id,err)
    });
  }

  // --- MÉTHODES PRIVÉES UTILITAIRES ---

  private _startAction(id: string) {
    //inserer l'id en cours d'operation
    this._loadingActionBoutique().push(id);
    //supprimer l'erreur stocké de cette id
    this._errorActionBoutique.update(objErrors =>
      objErrors.filter(objErr => objErr.id !== id)
    );
  }

  private _handleActionError(id:string,error: any) {
    //en enleve le produit en attente d'operation
    this._loadingActionBoutique.update(items =>
      items.filter(item => item !== id)
    );
    //ajouter l'erreur
    this._errorActionBoutique().push({id,error:error?.error?.message || "L'opération a échoué."});
  }

  private _handleActionSucces(id:string) {
    this._loadingActionBoutique.update(items =>
      items.filter(item => item !== id)
    );
    this._successActionBoutique().push(id)
  }

  resetStatusActionBoutique(id:string) {
    this._errorActionBoutique.update(objErrors =>
      objErrors.filter(objErr => objErr.id !== id)
    );
    this._loadingActionBoutique.update(items =>
      items.filter(item => item !== id)
    );
  }


  // register(boutiqueRegister:BoutiqueRegister,file:File|null){
  //   if (this.loadingRgst()) {
  //     return;
  //   }
  //   this._loadingRgst.set(true);
  //   this.authService.registerBoutique(boutiqueRegister,file).subscribe({
  //     next : () => {
  //       this._loadingRgst.set(false);
  //       this._successRgst.set(true);
  //       //this.notificationService.showSuccess("Merci pour votre inscription ! Elle sera effective après validation par notre équipe",3000);
  //     },
  //     error : (error) =>{
  //       this._loadingRgst.set(false);
  //       if ([400, 404, 409].includes(error?.status)) {
  //         this._errorRgst.set(error?.message);
  //       } else if(![401, 403].includes(error?.status)) {
  //         this._errorRgst.set( "Erreur inattendue. Veuillez réessayer plus tard.");
  //       }
  //     }
  //   })
  // }


}

