import { CommonModule } from '@angular/common';
import { Component, computed, OnDestroy, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PromotionCreate } from '../../services/boutique.service';
import { ZodFormValidators } from '../../../../shared/services/zod-form-validators.service';
import { PromotionSchema } from '../../shema/promotion.shema';
import { BoutiqueStore } from '../../store/boutique.store';

@Component({
  selector: 'app-create-promotion',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-promotion.component.html',
  styleUrl: './create-promotion.component.scss',
})
export class CreatePromotionComponent implements OnDestroy {
  close = output<void>();
  submitPromo = output<{promotion:PromotionCreate,image?:File|null}>();

  loadingAddPromotion = computed(()=> this.boutiqueStore.loadingAddPromotion());

  //promoForm: FormGroup;
  promoForm: FormGroup = new FormGroup({
    titre: new FormControl(null, {validators: [ZodFormValidators.fromZod(PromotionSchema.shape.titre)]}),
    taux: new FormControl(null, {validators: [ZodFormValidators.fromZod(PromotionSchema.shape.taux)]}),
    prixInitial: new FormControl<number|null>(null, {validators: [ZodFormValidators.fromZod(PromotionSchema.shape.prixInitial)]}),
    prixReduit: new FormControl<number|null>(null, {validators: [ZodFormValidators.fromZod(PromotionSchema.shape.prixReduit)]}),
    description: new FormControl(null, {validators: [ZodFormValidators.fromZod(PromotionSchema.shape.description)]}),
    dateDebut: new FormControl(null, {validators: [ZodFormValidators.fromZod(PromotionSchema.shape.dateDebut)]}),
    dateFin: new FormControl(null, {validators: [ZodFormValidators.fromZod(PromotionSchema.shape.dateFin)]}),
    image: new FormControl(null, {validators: [ZodFormValidators.fromZod(PromotionSchema.shape.image)]}),
    },
    { validators: [ZodFormValidators.fromZod(PromotionSchema)]
  });
  imagePreview = signal<string | null>(null);

  constructor(private boutiqueStore:BoutiqueStore) {
    // this.promoForm = this.fb.group({
    //   titre: ['', [Validators.required, Validators.minLength(5)]],
    //   taux: [0, [Validators.min(1), Validators.max(100)]],
    //   prixInitial: [0],
    //   prixReduit: [0],
    //   description: ['', Validators.required],
    //   dateDebut: ['', Validators.required],
    //   dateFin: ['', Validators.required],
    //   image: [null]
    // });

    // Calcul automatique du prix réduit si le taux change
    this.promoForm.get('taux')?.valueChanges.subscribe(t => this.calculatePrice());
    this.promoForm.get('prixInitial')?.valueChanges.subscribe(p => this.calculatePrice());
  }

  private calculatePrice() {
    const pInitial = this.promoForm.get('prixInitial')?.value || 0;
    const taux = this.promoForm.get('taux')?.value || 0;
    if (pInitial > 0 && taux > 0) {
      const pReduit = pInitial - (pInitial * taux / 100);
      this.promoForm.get('prixReduit')?.patchValue(Math.round(pReduit), { emitEvent: false });
    }
  }

  private objectUrl: string | null = null;
  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];

  if(!file) return
  // Révoquer ancienne URL si existe
  if (this.objectUrl) {
    URL.revokeObjectURL(this.objectUrl);
  }

  this.objectUrl = URL.createObjectURL(file);

  this.promoForm.controls['image'].setValue(file);
  this.promoForm.controls['image'].markAsDirty();
  this.promoForm.controls['image'].updateValueAndValidity();
  this.imagePreview.set(this.objectUrl);
}

  save() {
    if (this.promoForm.invalid) return;
    const { image, ...promotion } = this.promoForm.value;
    this.submitPromo.emit({
      promotion,
      image
    });
    //(newPromo: PromotionCreate,image?:File|null)
    this.promoForm.reset();
    this.imagePreview.set(null);
  }

  ngOnDestroy(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
  }
}
