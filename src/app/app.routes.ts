import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminHomeComponent } from './features/admin/components/admin-home/admin-home.component';
import { BoutiqueHomeComponent } from './features/boutique/components/boutique-home/boutique-home.component';
import { ClientHomeComponent } from './features/client/components/client-home/client-home.component';
import { AuthGuard } from './core/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { BoutiqueLayoutComponent } from './layouts/boutique-layout/boutique-layout.component';
import { HomeComponent } from './shared/components/home/home.component';
import { RegisterBoutiqueComponent } from './shared/components/register-boutique.component/register-boutique.component';
import { RegisterUserComponent } from './shared/components/register-user.component/register-user.component';
import { DashboardAdminComponent } from './features/admin/components/dashboard/dashboard-admin/dashboard-admin.component';
import { CenterProfilComponent } from './features/admin/components/profil-center/center-profil/center-profil.component';
import { ZonesComponents } from './features/admin/components/zone/zones/zones.components';
import { CategoriesComponent } from './features/admin/components/categorie/categories/categories.component';
import { BoutiquesComponents } from './features/admin/components/boutiques/boutiques.components';
import { PromotionsComponent } from './features/admin/components/promotions/promotions.component';
import { AnnoncesComponent } from './features/admin/components/annonce/annonces/annonces.component';
import { BoutiqueDashboardComponent } from './features/boutique/components/boutique-dashboard/boutique-dashboard.component';
import { PlanCentreComponent } from './features/client/components/plan-centre/plan-centre.component';
import { BoutiqueDetailsComponent } from './features/client/components/boutique-details.component/boutique-details.component';
import { PromotionDetailsComponent } from './features/client/components/promotion-details.component/promotion-details.component';

export const routes: Routes =  [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registerboutique', component: RegisterBoutiqueComponent },
  { path: 'registeruser', component: RegisterUserComponent },
  //ADMIN
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] },
    children:[
      {path:'',component:CenterProfilComponent},
      {path:'center',component:CenterProfilComponent},
      {path:'dashboard',component:DashboardAdminComponent},
      {path:'zones',component:ZonesComponents},
      {path:'categories',component:CategoriesComponent},
      {path:'boutiques',component:BoutiquesComponents},
      {path:'promotions',component:PromotionsComponent},
      {path:'annonces',component:AnnoncesComponent}
    ]
  },
  //BOUTIQUE
  { path: 'boutique', component: BoutiqueLayoutComponent, canActivate: [AuthGuard], data: { roles: ['BOUTIQUE'] },
    children:[
      {path:'',component:BoutiqueDashboardComponent},
      {path:'home',component: BoutiqueDashboardComponent},
      {path:'profil',component:BoutiqueHomeComponent},

    ]
  },
  //CLIENT
  { path: 'client', component: ClientLayoutComponent, canActivate: [AuthGuard], data: { roles: ['CLIENT','VISITOR'] },
    children:[
      {path:'',component:ClientHomeComponent},
      {path:'home',component:ClientHomeComponent},
      {path:'plan-centre',component:PlanCentreComponent},
      {path:'boutiques/:id',component:BoutiqueDetailsComponent},
      {path:'promotions/:id',component:PromotionDetailsComponent},
    ]
  },
  //
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
