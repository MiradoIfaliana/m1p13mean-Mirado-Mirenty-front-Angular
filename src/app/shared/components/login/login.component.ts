import { Component, computed, effect, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ZodFormValidators } from '../../services/zod-form-validators.service';
import { LoginSchema } from '../../shemas/login.shema';
import { TrimOnBlurDirective } from '../../services/trim-on-blur-directive';
import { AuthService, ROLE_REDIRECT } from '../../../core/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthStore } from '../../../core/store/auth.store';

@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule,TrimOnBlurDirective,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  auth_test: any = {
    admin: { mail: 'admin@centre.com', password: 'admin123' },
    boutique: { mail: 'boutique@centre.com', password: 'boutique123' },
    client: { mail: 'client@centre.com', password: 'client123' },
  };

  loginForm:FormGroup = new FormGroup({
    username: new FormControl(null, { validators: [ZodFormValidators.fromZod(LoginSchema.shape.username)] }),
    password: new FormControl<string|null>(null, { validators: [ZodFormValidators.fromZod(LoginSchema.shape.password)] })
  });
  showLogin: boolean = false;

  loadingLogin = computed(()=>this.authStore.loadingLogin());
  constructor(private authStore:AuthStore, private router:Router, private notificationService: NotificationService){
    effect(() => {
      if (this.authStore.successLogin()) {
        //router
        const role = this.authStore.role()
        const target = ROLE_REDIRECT[role!]
        this.authStore.resetStatusLogin();
        this.router.navigateByUrl(target)
      }
      if (this.authStore.errorLogin()) {
        this.notificationService.showError(this.authStore.errorLogin()!);
        this.authStore.resetStatusLogin();
      }
    });
  }

  ngOnInit() {
    // Remplissage par défaut au chargement
    this.fillForm('admin');
  }

  submit(){
    const value = this.loginForm.getRawValue(); //Récupérer l’état brut du formulaire
    const parsed = LoginSchema.safeParse(value); // Valider les données contre le schéma métier
    if (!parsed.success || this.authStore.loadingLogin() ) return;
    this.authStore.login(parsed.data.username, parsed.data.password);

  }
  toggleLogin(): void {
    this.showLogin = !this.showLogin;
  }
  accueil(){
    this.router.navigateByUrl("/home");
  }

  fillForm(role: string) {
    const credentials = this.auth_test[role];
    this.loginForm.patchValue({
      username: credentials.mail,
      password: credentials.password
    });
  }
}
