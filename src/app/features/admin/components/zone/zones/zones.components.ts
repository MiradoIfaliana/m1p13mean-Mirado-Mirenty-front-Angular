import { Component, computed, DOCUMENT, effect, Inject, OnInit, Renderer2, signal } from '@angular/core';
import { CreateZoneComponent } from '../create-zone/create-zone.component';
import { Zone, ZoneCreate } from '../../../services/admin.service';
import { AdminStore } from '../../../store/admin.store';
import { NotificationService } from '../../../../../shared/services/notification.service';



@Component({
  selector: 'app-zones',
  imports: [CreateZoneComponent],
  templateUrl: './zones.components.html',
  styleUrl: './zones.components.scss',
})
export class ZonesComponents implements OnInit {
  isAddModalOpen = signal(false);
  zones = computed(()=>this.adminStore.zones());
  loadingZones = computed(()=>this.adminStore.loadingZone());

  searchQuery = signal('');

  // Filtrage intelligent
  filteredZones = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    return this.zones()?.filter(z =>
      z.etage.toLowerCase().includes(query) || z.bloc.toLowerCase().includes(query) || z.box.toLowerCase().includes(query)
    );
  });

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document,private adminStore:AdminStore,private notificationService : NotificationService) {
    //surveille le signal : desactive l'overflow de l'arriere plan quand le sidebar est activé
    effect(() => {
      const open = this.isAddModalOpen();
      if (open) {
        this.renderer.addClass(this.document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(this.document.body, 'overflow-hidden');
      }
      if(this.adminStore.successAddZone()){
        this.notificationService.showSuccess("Zone ajoutée avec succès");
        this.adminStore.resetStatusAddZone();
        this.isAddModalOpen.set(false);
      }
      if(this.adminStore.errorAddZone()){
        this.notificationService.showError(this.adminStore.errorAddZone()!);
        this.adminStore.resetStatusAddZone();
      }
    });
  }
  ngOnInit(): void {
    this.adminStore.zonesCenter();
  }
  handleAddZone(newZone: ZoneCreate) {
    this.adminStore.addZone(newZone);
  }


}
