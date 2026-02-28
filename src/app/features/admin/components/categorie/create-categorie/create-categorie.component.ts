import { Component, computed, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminStore } from '../../../store/admin.store';

@Component({
  selector: 'app-create-categorie',
  imports: [ReactiveFormsModule],
  templateUrl: './create-categorie.component.html',
  styleUrl: './create-categorie.component.scss',
})
export class CreateCategorieComponent {
  close = output<void>();
  submitCategory = output<any>();

  categoryForm: FormGroup;
  loadingAddCategorie = computed(()=>this.adminStore.loadingAddCategorie());


  // Liste d'icônes prédéfinies pour le choix utilisateur
  icons = signal([
    // Technologie & Loisirs
    'fa-laptop', 'fa-gamepad', 'fa-camera', 'fa-headphones',
    // Mode & Accessoires
    'fa-shirt', 'fa-gem', 'fa-glasses', 'fa-bag-shopping',
    // Food & Drink
    'fa-utensils', 'fa-mug-hot', 'fa-ice-cream', 'fa-pizza-slice',
    // Maison & Déco
    'fa-house', 'fa-couch', 'fa-lightbulb', 'fa-paint-roller',
    // Santé & Beauté
    'fa-pills', 'fa-spa', 'fa-scissors', 'fa-pump-soap',
    // Sport & Automobile
    'fa-basketball', 'fa-dumbbell', 'fa-car', 'fa-gas-pump',
    // Services & Divers
    'fa-child-reaching', 'fa-briefcase', 'fa-credit-card', 'fa-paw'
  ]);

  // Dans ton composant
  searchTerm = signal('');

  constructor(private fb: FormBuilder, private adminStore:AdminStore) {
    this.categoryForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      iconClass: ['fa-solid fa-laptop', Validators.required]
    });
  }

  save() {
    if (this.categoryForm.valid) {
      this.submitCategory.emit(this.categoryForm.value);
    }
  }


  // On nettoie la saisie pour l'aperçu (ex: enlever "fa-solid " si l'user l'écrit)
  getPreviewIcon() {
    const value = this.categoryForm.get('iconClass')?.value || '';
    return value.includes('fa') ? value : `fa-solid fa-question`;
  }

  // Fonction pour taper manuellement
  onManualInput(event: any) {
    const val = event.target.value;
    this.categoryForm.patchValue({ iconClass: val.startsWith('fa-solid fa-') ? val : `fa-solid fa-` });
  }
}
