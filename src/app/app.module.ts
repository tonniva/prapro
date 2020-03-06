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

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    ListComponent,
    PostlistComponent,
    ListdetailComponent,
    HistoryComponent,
    OthermenuComponent,
    LandingComponent,
    PramoonregisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }