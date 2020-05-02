 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ListComponent } from './list/list.component';
import { PostlistComponent } from './postlist/postlist.component';
import { ListdetailComponent } from './listdetail/listdetail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { HistoryComponent } from './history/history.component';
import { OthermenuComponent } from './othermenu/othermenu.component';
import { LandingComponent } from './landing/landing.component';
import { PramoonregisterComponent } from './pramoonregister/pramoonregister.component';
 
 
 import { DropzoneDirective } from './dropzone.directive';
 import { UploaderComponent } from './uploader/uploader.component';
 import { UploadTaskComponent } from './upload-task/upload-task.component';
// import { AngularFireAuthModule } from '@angular/fire/auth';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// 2. Add your credentials from step 1
import { environment } from 'src/environments/environment';
import { ModalComponent } from './modal/modal.component';
import { PramoolBidComponent } from './pramool-bid/pramool-bid.component';
import { HistorydetailComponent } from './historydetail/historydetail.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HereMapComponent } from './here-map/here-map.component';
import { AgmCoreModule } from '@agm/core';
import { EditorderpostComponent } from './editorderpost/editorderpost.component';
 

import { Ng2ImgMaxModule } from 'ng2-img-max';
import { CollectComponent } from './collect/collect.component';
import { FrameComponent } from './frame/frame.component';
import { FrameListComponent } from './frame-list/frame-list.component';
import { FramepostComponent } from './framepost/framepost.component';
import { FrameDetailComponent } from './frame-detail/frame-detail.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PreviewComponent } from './preview/preview.component';
import { PaybillComponent } from './paybill/paybill.component';
import { PaybillApproveBillComponent } from './paybill-approve-bill/paybill-approve-bill.component';


@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    UploadTaskComponent,
    DropzoneDirective,
    FooterComponent,
    HomeComponent,
    ListComponent,
    PostlistComponent,
    ListdetailComponent,
    HistoryComponent,
    OthermenuComponent,
    LandingComponent,
    PramoonregisterComponent,
    ModalComponent,
    PramoolBidComponent,
    HistorydetailComponent,
    HereMapComponent,
    EditorderpostComponent,
    CollectComponent,
    FrameComponent,
    FrameListComponent,
    FramepostComponent,
    FrameDetailComponent,
    PromotionComponent,
    PreviewComponent,
    PaybillComponent,
    PaybillApproveBillComponent
  ],
  imports: [ 
    BrowserAnimationsModule,
    Ng2ImgMaxModule,
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,     
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBEhGVQ826hKnlqPsa2EX2M0GQbcPN0eEA'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
