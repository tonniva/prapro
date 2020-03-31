import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {
  public geolocationPosition;
  title: string = 'ระบบจะบันทึกตำแหน่งของคุณ เพื่อ ป้องกัน "มิจฉาชีพ"';
  
  lat: number =0;
  lng: number = 0;  

  model: any = {};

 
  constructor() { }

  ngOnInit() {


    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              // this.geolocationPosition = position,

                 
                  this.model.Longitude = position.coords.longitude,
                  this.model.Latitude =  position.coords.latitude,

                  localStorage.setItem("Longitude",this.model.Longitude);
                  localStorage.setItem("Latitude",this.model.Latitude);
                  console.log(position)
                  // this.lat = 14.598382
                  // this.lng = 100.447521
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };

    setTimeout(() => { 
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.geolocationPosition = position,
  
                     console.log(position) 
              
                    var Longitude = this.model.Longitude;
                    var Latitude =  this.model.Latitude;

                    console.log("Latitude:"+Latitude +"Longitude:"+Longitude)
                    this.lat = Number(Latitude)
                    this.lng = Number(Longitude)
            },
            error => {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            }
        );
    };
  
}, 1200);
    
  }
  getLocation(){
 
    
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              this.geolocationPosition = position,
            
                  console.log(position)
                  this.lat = position.coords.latitude
                  this.lng = position.coords.longitude


                  
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };


  }
  

}
