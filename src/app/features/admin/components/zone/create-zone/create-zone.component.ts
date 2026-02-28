import { Component, computed, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminStore } from '../../../store/admin.store';

@Component({
  selector: 'app-create-zone',
  imports: [ReactiveFormsModule],
  templateUrl: './create-zone.component.html',
  styleUrl: './create-zone.component.scss',
})
export class CreateZoneComponent {
close = output<void>();
  submitZone = output<any>();

  zoneForm: FormGroup;

  loadingAddZone = computed(()=>this.adminStore.loadingAddZone());

  constructor(private fb: FormBuilder,private adminStore:AdminStore) {
    this.zoneForm = this.fb.group({
      // Étage : Obligatoire
      etage: ['RDC', [Validators.required]],
      // Bloc : Min 3 caractères pour éviter "A", "B" sans contexte
      bloc: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      // Box : Pattern pour forcer un format type "A-01" ou "102"
      box: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z0-9-]{1,6}$/) // Lettres majuscules, chiffres et tirets uniquement
      ]],
      // Description : Optionnelle mais limitée en taille pour le design
      description: ['', [
        Validators.maxLength(150)
      ]]
    });

  }

  save() {
    if (this.zoneForm.valid) {
      this.submitZone.emit(this.zoneForm.value);
    }
  }
}
