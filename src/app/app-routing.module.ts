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


const routes: Routes = [ 
  
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'list/one', component: ListComponent },
  { path: 'list/two', component: PostlistComponent },
  { path: 'list/detail/:id', component: ListdetailComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'other', component: OthermenuComponent }, 
  { path: 'pramoonregister', component: PramoonregisterComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
