import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  lat: number = 51.678418;
  lng: number = 7.809007; 

  goblak(){ 
    window.history.back();
  }

  ishide(){ 
    if(window.location.pathname == "/list/one" || window.location.pathname == "/home")
    return false
    else
    return true

  }
  
}

