import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminHomeComponent } from './features/admin/components/admin-home/admin-home.component';
import { BoutiqueHomeComponent } from './features/boutique/boutique-home/boutique-home.component';
import { ClientHomeComponent } from './features/client/client-home/client-home.component';
import { AuthGuard } from './core/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { BoutiqueLayoutComponent } from './layouts/boutique-layout/boutique-layout.component';
import { HomeComponent } from './shared/components/home/home.component';
import { RegisterBoutiqueComponent } from './shared/components/register-boutique.component/register-boutique.component';
import { RegisterUserComponent } from './shared/components/register-user.component/register-user.component';
import { DashboardAdminComponent } from './features/admin/components/dashboard-admin/dashboard-admin.component';

export const routes: Routes =  [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registerboutique', component: RegisterBoutiqueComponent },
  { path: 'registeruser', component: RegisterUserComponent },
  //ADMIN
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] },
    children:[
      {path:'',component:AdminHomeComponent},
      {path:'home',component:AdminHomeComponent},
      {path:'dashboard',component:DashboardAdminComponent}
    ]
  },
  //BOUTIQUE
  { path: 'boutique', component: BoutiqueLayoutComponent, canActivate: [AuthGuard], data: { roles: ['BOUTIQUE'] },
    children:[
      {path:'',component:BoutiqueHomeComponent},
      {path:'home',component:BoutiqueHomeComponent}
    ]
  },
  //CLIENT
  { path: 'client', component: ClientLayoutComponent, canActivate: [AuthGuard], data: { roles: ['CLIENT','VISITOR'] },
    children:[
      {path:'',component:ClientHomeComponent},
      {path:'home',component:ClientHomeComponent}
    ]
  },
  //
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
