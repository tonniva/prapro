import { Component } from '@angular/core';
import {Router,ActivatedRoute,Params} from "@angular/router"; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  lat: number = 51.678418;
  lng: number = 7.809007; 

  salepage:string;

  goblak(){ 
    window.history.back();
  }
  constructor( private route: ActivatedRoute,private router: Router) { }
 
  ishide(){ 
     
    const urlParams = new URLSearchParams(window.location.search);
    this.salepage = urlParams.get('salepage');  
    if(this.salepage)
         return false
    else
          return true

  }


  


  
}

