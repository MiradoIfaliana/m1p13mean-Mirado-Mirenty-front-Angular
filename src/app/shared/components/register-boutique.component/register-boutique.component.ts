import { CommonModule } from '@angular/common';
import { Component, computed, effect, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ZodFormValidators } from '../../services/zod-form-validators.service';
import { RegisterBoutiqueSchema } from '../../shemas/register-boutique.schema';
import { CategorieState } from '../../../core/store/categorie.state';
import { ZoneState } from '../../../core/store/zone.state';
import { Subscription } from 'rxjs';
import { TrimOnBlurDirective } from '../../services/trim-on-blur-directive';
import { BoutiqueRegister, BoutiqueStore } from '../../../core/store/boutique-public.store';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register-boutique',
  imports: [CommonModule, ReactiveFormsModule,RouterLink, TrimOnBlurDirective ],
  templateUrl: './register-boutique.component.html',
  styleUrl: './register-boutique.component.scss',
})
export class RegisterBoutiqueComponent implements OnInit, OnDestroy {
// Données pour le select "Catégorie"
  registerForm: FormGroup = new FormGroup({
    email:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterBoutiqueSchema.shape.email)] }),
    password:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterBoutiqueSchema.shape.password)] }),
    nom:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterBoutiqueSchema.shape.nom)] }),
    categorieId:new FormControl(0, { validators: [ZodFormValidators.fromZod(RegisterBoutiqueSchema.shape.categorieId)] }),
    zoneId:new FormControl(0, { validators: [ZodFormValidators.fromZod(RegisterBoutiqueSchema.shape.zoneId)] }),
    horaires: new FormGroup({
      jours: new FormControl('Lun-Sam', { validators: [ ZodFormValidators.fromZod( RegisterBoutiqueSchema.shape.horaires.shape.jours),],}),
      heures: new FormControl('08h00-20h00', { validators: [ ZodFormValidators.fromZod( RegisterBoutiqueSchema.shape.horaires.shape.heures),],})
    }),
    contactBoutique:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterBoutiqueSchema.shape.contactBoutique)] }),
    contactProprio:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterBoutiqueSchema.shape.contactProprio)] }),
    description:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterBoutiqueSchema.shape.description)] }),
    photo:new FormControl(null, { validators: [ZodFormValidators.fromZod(RegisterBoutiqueSchema.shape.photo)] })
  });

  private formSub!: Subscription;
  private step1Controls = ['nom', 'categorieId', 'contactBoutique','photo'];
  private step2Controls = ['zoneId', 'horaires.jours', 'horaires.heures','description'];
  private step3Controls = ['email', 'password', 'contactProprio'];

  isStep1Valid = false;
  isStep2Valid = false;
  isStep3Valid = false;

  categories = computed(()=>this.categorieState.categories());
  zones = computed(()=>this.zoneState.zones());

  imgSelected:{url:string,file:File|null,fileName:string} = {url:'',file:null,fileName:''};


  constructor(private categorieState : CategorieState,private zoneState : ZoneState, private boutiqueStore : BoutiqueStore, private notificationService : NotificationService, private router: Router){
    effect(() => {
      if (this.boutiqueStore.successRgst()) {
        this.notificationService.showSuccess(
          "Merci pour votre inscription ! Elle sera effective après validation."
        ,4000);
        //router
        this.boutiqueStore.resetStatus();
        this.router.navigateByUrl('/home');
      }
      if (this.boutiqueStore.errorRgst()){
        this.notificationService.showError(this.boutiqueStore.errorRgst()!);
        this.boutiqueStore.resetStatus();
      }
    });
  }
  ngOnInit(): void {
    this.categorieState.getAll().subscribe();
    this.zoneState.getAll().subscribe();

    this.formSub = this.registerForm.valueChanges.subscribe(()=>{
      this.isStep1Valid = this.step1Controls.every( c => this.registerForm.get(c)?.valid );
      this.isStep2Valid = this.step2Controls.every( c => this.registerForm.get(c)?.valid );
      this.isStep3Valid = this.step3Controls.every( c => this.registerForm.get(c)?.valid );
    });


  }


  // Dans votre composant
  step: number = 1;

  nextStep() {
    //if (this.isStep1Valid()) this.step = 2;
    this.step=this.step+1;
  }

  prevStep() {
    this.step = this.step-1;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const file = input.files[0];
    if (this.imgSelected?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(this.imgSelected.url);
    }
    this.imgSelected.url=URL.createObjectURL(file);
    this.imgSelected.file=file;
    this.imgSelected.fileName=file.name;
    this.registerForm.controls['photo'].setValue(file);
    this.registerForm.controls['photo'].markAsDirty();
    this.registerForm.controls['photo'].updateValueAndValidity();
  }

  removeImage() {
    this.imgSelected.url='';
    this.imgSelected.file=null;
    this.imgSelected.fileName='';
    this.registerForm.controls['photo'].setValue(null);
    this.registerForm.controls['photo'].markAsDirty();
    this.registerForm.controls['photo'].updateValueAndValidity();
  }

  submit(): void {
    const value = this.registerForm.getRawValue(); //Récupérer l’état brut du formulaire Angular
    const parsed = RegisterBoutiqueSchema.safeParse(value);
    if (!parsed.success || this.registerForm.invalid || this.boutiqueStore.loadingRgst()) return;
    const data:BoutiqueRegister = {
      email : parsed.data.email,
      password : parsed.data.password,
      nom : parsed.data.nom,
      categorieId : parsed.data.categorieId,
      zoneId : parsed.data.zoneId,
      horaires: parsed.data.horaires,
      contactBoutique : parsed.data.contactBoutique,
      contactProprio : parsed.data.contactProprio,
      description : parsed.data.description
    }
    this.boutiqueStore.register(data,this.imgSelected.file);
  }
  ngOnDestroy(): void {
      this.formSub?.unsubscribe();
  }

}
