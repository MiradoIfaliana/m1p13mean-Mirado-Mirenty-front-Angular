import { Component, computed, DOCUMENT, effect, Inject, OnInit, Renderer2, signal } from '@angular/core';
import { EditCenterModalComponent } from '../edit-center-modal/edit-center-modal.component';
import { AdminStore } from '../../../store/admin.store';

export interface CenterProfile {
  nom: string;
  description: string;
  horaires: { jours: string; heures: string };
  contact: string;
  email: string;
  planImageUrl: string;
}

@Component({
  selector: 'app-center-profil',
  imports: [EditCenterModalComponent],
  templateUrl: './center-profil.component.html',
  styleUrl: './center-profil.component.scss',
})
export class CenterProfilComponent implements OnInit {
  // État local pour l'UI du plan
// Signaux pour la réactivité fluide
  scale = signal(1);
  position = signal({ x: 0, y: 0 });
  isDragging = false;
  startPan = { x: 0, y: 0 };

  isEditModalOpen = signal(false);

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document,private adminStore:AdminStore) {
    //surveille le signal : desactive l'overflow de l'arriere plan quand le sidebar est activé
    effect(() => {
      const open = this.isEditModalOpen();
      if (open) {
        this.renderer.addClass(this.document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(this.document.body, 'overflow-hidden');
      }
    });
  }

  // Gestion du Zoom (Progressif)
  handleZoom(delta: number) {
    this.scale.update(s => Math.min(Math.max(s + delta, 0.5), 4)); // Limite entre 0.5x et 4x
  }

  resetView() {
    this.scale.set(1);
    this.position.set({ x: 0, y: 0 });
  }

  // Logique de Déplacement (Pan)
  onMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.startPan = { x: e.clientX - this.position().x, y: e.clientY - this.position().y };
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    this.position.set({
      x: e.clientX - this.startPan.x,
      y: e.clientY - this.startPan.y
    });
  }

  onMouseUp() {
    this.isDragging = false;
  }

  handleUpdate(event: {data: any, file?: File}) {

  }


  // Dans un cas réel, injectez votre service de données ici
  center = computed(()=>this.adminStore.centerProfil())
  // CenterProfile = {
  //   nom: "Shopping Center",
  //   description: "Le plus grand centre commercial de la ville",
  //   horaires: { jours: "Tous les jours", heures: "08h00 - 20h00" },
  //   contact: "+261 32 45 678 90",
  //   email: "contact@shoppingcenter.com",
  //   planImageUrl: "https://e7.pngegg.com/pngimages/193/849/png-clipart-foyleside-shopping-centre-square-one-mall-washington-square-carine-glades-shopping-centre-map-foyleside-shopping-centre-square-one-mall.png"
  // };

  ngOnInit(): void {
    this.adminStore.profil();
  }
}
