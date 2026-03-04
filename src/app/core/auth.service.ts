import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyAuthHttpClient } from '../a-httpclient-simulation/my-auth-http-client-public';
import { MyHttpNoInterceptors } from '../a-httpclient-simulation/my-http-no-interceptors';
import { environment } from '../../environments/environement';
import { NO_AUTH } from './interceptors/tokens';
import {  UserRegister } from './store/auth.store';
import { BoutiqueRegister } from './store/boutique-public.store';

export type Role = 'admin' | 'boutique' | 'client' |string | null;
export interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'CUSTOMER' | 'OWNER' ;
  email: string;
}
export const ROLE_REDIRECT: Record<string, string> = {
  ADMIN: '/admin',
  OWNER: '/boutique',
  CUSTOMER: '/client',
  VISITOR: '/client'
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = environment.apiUrl+'/auth';
  constructor( private http:HttpClient, private httpNoInterceptors:MyHttpNoInterceptors ){ }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`,{email,password},{ context: new HttpContext().set(NO_AUTH, true)});
  }

  logout(): Observable<any>{ // ne passe pas par l'intercepteur
    const token=this.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpNoInterceptors.post<any>(`${this.API_URL}/logout`,{},{headers});
  }

  registerBoutique(boutiqueRegister: BoutiqueRegister, file?: File|null) {
    const formData = new FormData();
    formData.append( 'data',
      new Blob([JSON.stringify(boutiqueRegister)], {type: 'application/json'})
    );
    if (file) {
      formData.append('image', file);
    }
    return this.http.post<any>( `${this.API_URL}/register-boutique`, formData, { context: new HttpContext().set(NO_AUTH, true) });
  }
  registerUser(userRegister:UserRegister){
    return this.http.post<LoginResponse>(`${this.API_URL}/register-client`,userRegister, {context: new HttpContext().set(NO_AUTH, true) });
  }

  restoreUserSession():Observable<any> {
    return this.http.get<any>(`${this.API_URL}/me`);
  }


  get token(): string | null {
    return localStorage.getItem('token')
  }

  set token(token:string){
    localStorage.setItem('token',token);
  }

  clearToken(){
    localStorage.removeItem('token');
  }
  clearVisitorKey(){
    sessionStorage.removeItem('visitorKey');
  }

  get visitorKey(): string | null{
    return sessionStorage.getItem('visitorKey');
  }

  set visitorKey(visitorKey:string){
    sessionStorage.setItem('visitorKey',visitorKey);
  }



}
