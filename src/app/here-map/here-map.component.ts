import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { KeyValuePipe } from '@angular/common';
@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {
  public geolocationPosition;
  title: string = 'พิกัดร้านค้า';
  
  lat: number =0;
  lng: number = 0;  
  ip:any;
  model: any = {};

 
  constructor() { }

  ngOnInit() {
// if(!localStorage.getItem("Latitude") && !localStorage.getItem("Longitude") && !localStorage.getItem("ip")){
    Swal.fire({
        title: 'คุณต้องการใช้ (ตำแหน่งตรงนี้) แสดงแผนที่ ของร้านค้าใช่หรือไม่',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText:'ยกเลิก'
      }).then((result) => {
        if (result.value) {
            this.domap();

        //  this.getip();


        
        }
        else{

            Swal.fire(
                'ท่านไม่ได้ใช้ตำแหน่งตรงนี้ แสดงใน ร้านค้าของท่าน',
                'ขอบคุณครับ',
                'success'
              )
        //       setTimeout(() => { 
        //         window.location.href = window.location.origin+'/promotion';
             
        // }, 3000);

        }
      }) 
// }
  

   
  }

  getip(){
    const ipAPI = '//api.ipify.org?format=json'
    Swal.queue([{
    title: 'ระบบต้องการเก็บ IP Adress ของท่าน เพื่อป้องกัน มิจฉาชีพ',
    confirmButtonText: 'ตกลง',
    text:
        'กดตกลง',
    showLoaderOnConfirm: true,
    preConfirm: () => {
        return fetch(ipAPI)
        .then(response => response.json())
        .then(data => {Swal.insertQueueStep(data.ip),
        this.ip = data.ip;

        localStorage.setItem("ip",this.ip); 
        })
        .catch(() => {
            Swal.insertQueueStep({
            icon: 'error',
            title: 'Unable to get your public IP'
            })
        })
    }
    }])

  }


  domap(){

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
  }
//   getLocation(){
 
    
//     if (window.navigator && window.navigator.geolocation) {
//       window.navigator.geolocation.getCurrentPosition(
//           position => {
//               this.geolocationPosition = position,
            
//                   console.log(position)
//                   this.lat = position.coords.latitude
//                   this.lng = position.coords.longitude


                  
//           },
//           error => {
//               switch (error.code) {
//                   case 1:
//                       console.log('Permission Denied');
//                       break;
//                   case 2:
//                       console.log('Position Unavailable');
//                       break;
//                   case 3:
//                       console.log('Timeout');
//                       break;
//               }
//           }
//       );
//   };


//   }
  

}
