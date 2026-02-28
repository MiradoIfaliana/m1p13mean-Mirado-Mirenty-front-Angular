import { Component, computed, DOCUMENT, effect, Inject, OnInit, Renderer2, signal } from '@angular/core';
import { CreateCategorieComponent } from "../create-categorie/create-categorie.component";
import { AdminStore } from '../../../store/admin.store';
import { CategorieCreate } from '../../../services/admin.service';
import { NotificationService } from '../../../../../shared/services/notification.service';


@Component({
  selector: 'app-categories',
  imports: [CreateCategorieComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories = computed(()=> this.adminStore.categories());
  loadingCategories = computed(()=> this.adminStore.loadingCategories());
  // signal<Categorie[]>([
  //   { "_id": "1", "nom": "Électronique", "iconClass": "fa-solid fa-laptop" },
  //   { "_id": "2", "nom": "Mode & Beauté", "iconClass": "fa-solid fa-shirt" },
  //   { "_id": "3", "nom": "Restauration", "iconClass": "fa-solid fa-utensils" },
  //   { "_id": "4", "nom": "Maison", "iconClass": "fa-solid fa-house" }
  // ]);
  isAddModalOpen = signal(false);

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document,private adminStore: AdminStore, private notificationService : NotificationService) {
    //surveille le signal : desactive l'overflow de l'arriere plan quand le sidebar est activé
    effect(() => {
      const open = this.isAddModalOpen();
      if (open) {
        this.renderer.addClass(this.document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(this.document.body, 'overflow-hidden');
      }
      if(this.adminStore.successAddCategorie()){
        this.notificationService.showSuccess("Categorie ajoutée avec succès");
        this.adminStore.resetStatusAddCategorie();
        this.isAddModalOpen.set(false);
      }
      if(this.adminStore.errorAddCategorie()){
        this.notificationService.showError(this.adminStore.errorAddCategorie()!);
        this.adminStore.resetStatusAddCategorie();
      }
    });
  }

  ngOnInit(): void {
    this.adminStore.categoriesCenter();
  }
  handleAdd(newCategorie: CategorieCreate) {
    // // Ici : ton appel API POST /admin/categorie
    // console.log('Nouvelle categorie :', newCategorie);
    // this.isAddModalOpen.set(false);
    this.adminStore.addCategorie(newCategorie);
  }
}
