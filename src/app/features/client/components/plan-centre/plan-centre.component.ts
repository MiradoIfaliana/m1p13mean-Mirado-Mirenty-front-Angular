import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-plan-centre',
  imports: [],
  templateUrl: './plan-centre.component.html',
  styleUrl: './plan-centre.component.scss',
})
export class PlanCentreComponent {
  scale = signal(1);
  position = signal({ x: 0, y: 0 });
  isDragging = false;
  startPan = { x: 0, y: 0 };

  plan = signal({planImageUrl: "https://e7.pngegg.com/pngimages/193/849/png-clipart-foyleside-shopping-centre-square-one-mall-washington-square-carine-glades-shopping-centre-map-foyleside-shopping-centre-square-one-mall.png"});
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

}
