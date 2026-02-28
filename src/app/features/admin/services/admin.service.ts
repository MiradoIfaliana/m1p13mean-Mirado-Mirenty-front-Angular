import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environement";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { AdminHttpClient } from "../../../a-httpclient-simulation/admin-http-client";
import { Categorie } from "../../../core/store/categorie.state";

// store.model.ts
export interface centerUpdate {
  description: string;
  horaires: {
    jours: string;
    heures: string;
  };
  contact: string;
  email: string;
}
export interface ZoneCreate {
  etage: string;
  bloc: string;
  box: string;
  description: string;
}

export interface Zone {
  _id: string;
  etage: string;
  bloc: string;
  box: string;
  status: string;
  description: string;
}
export interface CategorieCreate {
  nom: string;
  iconClass: string;
}
@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private API_URL = environment.apiUrl + '/admin';

  constructor(private http: AdminHttpClient) {}

  // ======================================================
  // CENTRE
  // ======================================================

  getCenterProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/center`);
  }

  updateCenter(data: centerUpdate, file?: File|null): Observable<any> {
    const formData = new FormData();
    formData.append( 'data',
      new Blob([JSON.stringify(data)], {type: 'application/json'})
    );
    if (file) {
      formData.append('image', file);
    }
    return this.http.put(`${this.API_URL}/center`, formData);
  }

  // ======================================================
  // ZONES
  // ======================================================

  createZone(payload: ZoneCreate): Observable<any> {
    return this.http.post(`${this.API_URL}/zones`, payload);
  }

  getZones(): Observable<Zone[]> {
    return this.http.get(`${this.API_URL}/zones`);
  }

  // ======================================================
  // CATÉGORIES
  // ======================================================

  createCategory(payload: CategorieCreate ): Observable<any> {
    return this.http.post(`${this.API_URL}/categories`, payload);
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get(`${this.API_URL}/categories`);
  }

  // ======================================================
  // BOUTIQUES EN ATTENTE
  // ======================================================

  getPendingBoutiques(): Observable<any[]> {
    const params = new HttpParams().set('status', 'EN_ATTENTE');
    return this.http.get(`${this.API_URL}/boutiques`, params);
  }

  // ======================================================
  // ✅ VALIDATION & STATUS
  // ======================================================

  validateBoutique(id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/boutiques/${id}/validate`);
  }

  activateBoutique(id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/boutiques/${id}/activate`);
  }

  disableBoutique(id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/boutiques/${id}/disable`);
  }

}
