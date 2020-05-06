import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { PostlistComponent } from './postlist/postlist.component';
import { ListdetailComponent } from './listdetail/listdetail.component';
import { HistoryComponent } from './history/history.component';
import { OthermenuComponent } from './othermenu/othermenu.component';
import { LandingComponent } from './landing/landing.component';
import { PramoonregisterComponent } from './pramoonregister/pramoonregister.component';
import { UploaderComponent } from './uploader/uploader.component';
import { PramoolBidComponent } from './pramool-bid/pramool-bid.component';
import { HistorydetailComponent } from './historydetail/historydetail.component';
import { HereMapComponent  } from './here-map/here-map.component';
import { EditorderpostComponent } from './editorderpost/editorderpost.component';
import { CollectComponent } from './collect/collect.component';
import { FrameListComponent } from './frame-list/frame-list.component';
import { FramepostComponent } from './framepost/framepost.component';
import { FrameComponent } from './frame/frame.component';
import { FrameDetailComponent } from './frame-detail/frame-detail.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PreviewComponent } from './preview/preview.component';
import { PaybillComponent } from './paybill/paybill.component';
import { PaybillApproveBillComponent } from './paybill-approve-bill/paybill-approve-bill.component';
import { PrevieworderproductComponent } from './previeworderproduct/previeworderproduct.component';


const routes: Routes = [ 
  
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'promotion', component: PromotionComponent },
  { path: 'list/two', component: PostlistComponent },
  { path: 'list/detail/:id_token/:indexlistselect', component: ListdetailComponent },
  { path: 'list/Farmedetail/:id_token/:indexlistselect', component: FrameDetailComponent },
  { path: 'list/history/:id_token/:indexlistselect', component: HistorydetailComponent },
  { path: 'list/bid/:id_token/:indexlistselect', component: PramoolBidComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'other', component: OthermenuComponent }, 
  { path: 'pramoonregister', component: PramoonregisterComponent },
  { path: 'map', component: HereMapComponent },
  { path: 'editorderpost/:id_token/:indexlistselect', component: EditorderpostComponent },
  { path: 'collect', component: CollectComponent},
  { path: 'frammenu', component: FrameComponent},
  { path: 'framlist', component: FrameListComponent},
  { path: 'frampost', component: FramepostComponent},
  { path: 'preview', component: PreviewComponent},
  { path: 'previeworderproduct', component: PrevieworderproductComponent},
  { path: 'paybill/:id_token', component: PaybillComponent},
  { path: 'paybill-approve/:id_token', component: PaybillApproveBillComponent}, 
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
