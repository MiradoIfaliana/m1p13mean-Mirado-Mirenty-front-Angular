import { Component, computed, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ZodFormValidators } from '../../services/zod-form-validators.service';
import { NotificationService } from '../../services/notification.service';
import { RegisterUserSchema } from '../../shemas/register-user.schema';
import { TrimOnBlurDirective } from '../../services/trim-on-blur-directive';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../../core/store/auth.store';

@Component({
  selector: 'app-register-user',
  imports: [RouterLink,CommonModule, ReactiveFormsModule,TrimOnBlurDirective],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
})
export class RegisterUserComponent {
  registerForm: FormGroup = new FormGroup({
    nom:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterUserSchema.shape.nom)] }),
    genre:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterUserSchema.shape.genre)] }),
    dateNaissance:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterUserSchema.shape.dateNaissance)] }),
    email:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterUserSchema.shape.email)] }),
    password:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterUserSchema.shape.password)] }),
  });
  loadingRgst = computed(()=>this.authStore.loadingRgst());
  constructor(private notificationService : NotificationService, private router: Router, private authStore : AuthStore){
    effect(() => {
      if (this.authStore.successRgst()) {
        this.authStore.resetStatusRgst();
        this.router.navigateByUrl('/client/home');
      }
      if (this.authStore.errorRgst()) {
        this.notificationService.showError(this.authStore.errorRgst()!);
        this.authStore.resetStatusRgst();
      }
    });
  }

  submit(){
    const value = this.registerForm.getRawValue(); //Récupérer l’état brut du formulaire Angular
    const parsed = RegisterUserSchema.safeParse(value);
    if(!parsed.success)return
    this.authStore.register(parsed.data);
  }
}
