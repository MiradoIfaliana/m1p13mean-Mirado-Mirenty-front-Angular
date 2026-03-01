import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { AdminStore } from '../../store/admin.store';
import { NotificationService } from '../../../../shared/services/notification.service';


@Component({
  selector: 'app-boutiques',
  imports: [],
  templateUrl: './boutiques.components.html',
  styleUrl: './boutiques.components.scss',
})
export class BoutiquesComponents implements OnInit {
  boutiques = computed(()=> this.adminStore.boutiques());
  loadingBoutiques = computed(()=> this.adminStore.loadingBoutiques());
  // signal<any[]>([
  //   {
  //     "_id": "65a3d001abc9990011223344",
  //     "email": "techstore@gmail.com",
  //     "nom": "Tech Store",
  //     "logoUrl": "https://www.creativefabrica.com/wp-content/uploads/2022/01/10/tech-store-minimalist-flat-logo-design-Graphics-23251175-1.jpg",
  //     "categorie": { "_id": "1", "nom": "Électronique" },
  //     "horaires": { "jours": "Tous les jours", "heures": "09h00 - 20h00" },
  //     "contact": "+261 34 12 345 67",
  //     "status": "EN_ATTENTE"
  //   },
  //   {
  //     "_id": "65a3d001abc9990011223345",
  //     "email": "zara-akoor@inditex.com",
  //     "nom": "Zara Fashion",
  //     "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrgs0VqDoKArAFCk4L2Q7y112gUPYeQoeAwA&s",
  //     "categorie": { "_id": "2", "nom": "Mode & Beauté" },
  //     "horaires": { "jours": "Lun - Sam", "heures": "10h00 - 19h30" },
  //     "contact": "+261 32 88 999 00",
  //     "status": "ACTIVE"
  //   },
  //   {
  //     "_id": "65a3d001abc9990011223346",
  //     "email": "food-court@akoor.com",
  //     "nom": "Le Gourmet",
  //     "logoUrl": "https://static.vecteezy.com/system/resources/previews/018/842/168/non_2x/gourmet-logo-design-for-foods-and-restaurants-vector.jpg",
  //     "categorie": { "_id": "3", "nom": "Restauration" },
  //     "horaires": { "jours": "Tous les jours", "heures": "11h00 - 22h00" },
  //     "contact": "+261 33 44 555 66",
  //     "status": "ACTIVE"
  //   },
  //   {
  //     "_id": "65a3d001abc9990011223347",
  //     "email": "service-client@decohouse.mg",
  //     "nom": "Deco House",
  //     "logoUrl": "https://i.pinimg.com/736x/0c/85/99/0c8599ac30aa96558a64656eb5021804.jpg",
  //     "categorie": { "_id": "4", "nom": "Maison" },
  //     "horaires": { "jours": "Lun - Ven", "heures": "08h30 - 17h00" },
  //     "contact": "+261 34 00 111 22",
  //     "status": "DISABLED"
  //   },
  //   {
  //     "_id": "65a3d001abc9990011223348",
  //     "email": "contact@pharma-akoor.mg",
  //     "nom": "Pharmacie Centrale",
  //     "logoUrl": "https://pharmaciecentrale-lure.fr/wp-content/uploads/2021/10/cropped-logo.png",
  //     "categorie": { "_id": "5", "nom": "Santé" },
  //     "horaires": { "jours": "24h/24 - 7j/7", "heures": "00h00 - 00h00" },
  //     "contact": "+261 32 77 666 55",
  //     "status": "ACTIVE"
  //   }
  // ]);


  constructor(private adminStore:AdminStore,private notificationService: NotificationService){
    effect(() => {
      // if(this.adminStore.successActionBoutique()){
      //   this.notificationService.showSuccess("operation effectuée avec succès");
      // }
      if(this.adminStore.errorActionBoutique()){
        const lastId=this.adminStore?.lastIdInErrorActionBoutique()()?.id;
        if(lastId){
          this.notificationService.showError(this.adminStore.errorActionBoutiqueById(lastId)()!);
          this.adminStore.resetStatusAddZone();
        }
      }
    });
  }
  ngOnInit(): void {
    this.adminStore.boutiquesCenter();
  }
  validateBoutique(id: string) {
    // this.boutiques()?.update(list =>
    //   list.map(b => b._id === id ? { ...b, status: newStatus } : b)
    // );
    if(this.adminStore.loadingActionBoutiqueById(id)){
      this.adminStore.validateBoutique(id);
    }
  }
  activateBoutique(id: string) {
    // this.boutiques()?.update(list =>
    //   list.map(b => b._id === id ? { ...b, status: newStatus } : b)
    // );
    if(this.adminStore.loadingActionBoutiqueById(id)){
      this.adminStore.activateBoutique(id);
    }
  }
  disableBoutique(id: string) {
    // this.boutiques()?.update(list =>
    //   list.map(b => b._id === id ? { ...b, status: newStatus } : b)
    // );
    if(this.adminStore.loadingActionBoutiqueById(id)){
      this.adminStore.disableBoutique(id);
    }
  }




}
