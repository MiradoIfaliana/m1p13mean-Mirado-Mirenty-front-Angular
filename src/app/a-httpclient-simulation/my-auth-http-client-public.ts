import { Injectable } from "@angular/core";
import { environment } from "../../environments/environement";
import { delay, Observable, of, throwError } from "rxjs";

export interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'OWNER' | 'CUSTOMER';
  email: string;
}
const fakeUsers = {
  admin: { email: 'admin@centre.com', password: 'admin123', role: 'ADMIN' as const , token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin.fake.jwt.token' },
  boutique: { email: 'boutique@centre.com', password: 'boutique123', role: 'OWNER' as const , token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.boutique.fake.jwt.token' },
  client: { email: 'client@centre.com', password: 'client123', role: 'CUSTOMER' as const , token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.client.jwt.token' },
  clientNew: { email: 'client-'+new Date()+'@centre.com', password: 'clientnew123', role: 'CUSTOMER' as const , token : 'eyJhbGciOiJIUzI1NiIs.fake.jwt.token' }
};
@Injectable({
  providedIn: 'root'
})
export class MyAuthHttpClient {

  private API_URL = environment.apiUrl;

  post<T>(url: string, body: any, header?: any): Observable<T> {

    // ===================================================================================================LOGIN
    if (url === `${this.API_URL}/auth/login`) {

          // Vérification des identifiants
          for (const key in fakeUsers) {
            const user = fakeUsers[key as keyof typeof fakeUsers];
            if (body.email === user.email && body.password === user.password) {
              const response: LoginResponse = {
                token: user.token,
                role: user.role,
                email: user.email
              };
              return of(response as unknown as T).pipe(delay(800));
            }
          }

          // erreur 401 si identifiants incorrects
          return throwError(() => ({
            status: 401,
            message: 'Email ou mot de passe incorrect'
          })).pipe(delay(800));
    }
     // =================================================================================INSCRIPTION BOUTIQUE
    // 🏬 INSCRIPTION BOUTIQUE (multipart/form-data)
    if (url === `${this.API_URL}/auth/register-boutique`) {

      /**
       * body est supposé être un FormData
       * - body.get('data') -> JSON string
       * - body.get('image') -> File
       */
      const formData:FormData=body;

      // Pour l'image, c'est un File (qui hérite de Blob)
      const imageFile = formData.get('image') as File;
      if (imageFile) {
        console.log('Nom du fichier:', imageFile.name);
      }
      // simulation validation minimale
      if (formData.get('data')) {
        return throwError(() => ({
          status: 400,
          message: 'Données boutique invalides'
        })).pipe(delay(800));
      }

      // succès : boutique en attente de validation
      return of({
        status: 201,
        data:{
          message: 'Boutique enregistrée avec succès',
          status: 'EN_ATTENTE'
        }
      } as T).pipe(delay(800));
    }

    // =================================================================================INSCRIPTION CLIENT
    // 👤 INSCRIPTION CLIENT
    if (url === `${this.API_URL}/auth/register-client`) {

      if (!body.email || !body.password || !body.nom) {
        return throwError(() => ({
          status: 400,
          message: 'Données client invalides'
        })).pipe(delay(800));
      }

      return of({
        token: 'eyJhbGciOiJIUzI1NiIs.fake.jwt.token',
        role: 'CUSTOMER',
        email: body.email
      } as T).pipe(delay(800));
    }

    // ===================================================================================================== AUTRES POST (simuler ici plus tard)
    return throwError(() => ({
      status: 404,
      message: `POST ${url} non simulé`
    }));
  }

  get<T>(url: string, param?: any, header?: any): Observable<T> {
    // ===================================================================================================== GET simulé
    if (url === `${this.API_URL}/auth/me`) {
      // Vérification des identifiants
      for (const key in fakeUsers) {
        const user = fakeUsers[key as keyof typeof fakeUsers];
        if (param===user.token) {
          const response = {
            role: user.role,
            email: user.email
          };
          return of(response as unknown as T).pipe(delay(800));
        }
      }
    }
    //   // 🔐 Vérification Bearer Token (simulation)
    // const authHeader = header?.Authorization || header?.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return throwError(() => ({
    //     status: 401,
    //     message: 'Token manquant ou invalide'
    //   })).pipe(delay(500));
    // }

    // ==================================================================================================================== LISTE CATEGORIES
    if (url === `${this.API_URL}/categories`) {
      return of([
        {_id: '65a2c987abc4560099887766',nom: 'Électronique',iconClass: 'fa-solid fa-laptop'},
        {_id: '65a2c987abc4560099887777',nom: 'Mode & Vêtements',iconClass: 'fa-solid fa-shirt'},
        {_id: '65a2c987abc4560099887788',nom: 'Restauration',iconClass: 'fa-solid fa-utensils'},
        {_id: '65a2c987abc4560099887799',nom: 'Beauté & Cosmétiques',iconClass: 'fa-solid fa-spa'},
        {_id: '65a2c987abc4560099887800',nom: 'Maison & Décoration',iconClass: 'fa-solid fa-couch'},
        {_id: '65a2c987abc4560099887801',nom: 'Services',iconClass: 'fa-solid fa-briefcase'}
      ] as T).pipe(delay(700));
    }
    // ==================================================================================================================== LISTE ZONES
    if (url === `${this.API_URL}/zones`) {
      const zones = [
        {_id: '65a2b123abc4560011223344',etage: 'RDC',bloc: 'Bloc A',box: 'A01',status: 'OCCUPEE',description: 'Zone proche entrée principale'},
        {_id: '65a2b123abc4560011223345',etage: 'RDC',bloc: 'Bloc A',box: 'A12',status: 'LIBRE',description: 'Zone centrale RDC'},
        {_id: '65a2b123abc4560011223346',etage: '1er étage',bloc: 'Bloc B',box: 'B03',status: 'OCCUPEE',description: 'Zone proche escalator'},
        {_id: '65a2b123abc4560011223347',etage: '1er étage',bloc: 'Bloc B',box: 'B15',status: 'LIBRE',description: 'Zone vue extérieure'},
        {_id: '65a2b123abc4560011223348',etage: '2e étage',bloc: 'Bloc C',box: 'C07',status: 'LIBRE',description: 'Zone calme, idéale bureaux'},
        {_id: '65a2b123abc4560011223349',etage: '2e étage',bloc: 'Bloc C',box: 'C20',status: 'OCCUPEE',description: 'Zone restauration'}
      ];
      let result:any[] = [];
      if (param.get('status')) {
        result = zones.filter(z => z.status === param.get('status'));
      }
      return of(result as T).pipe(delay(700));
    }

    return throwError(() => ({
      status: 404,
      message: `GET ${url} non simulé`
    }));
  }
  ///auth/me
}
