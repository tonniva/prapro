import { Component, OnInit } from '@angular/core';
import { HttpClientModule, JsonpInterceptor } from '@angular/common/http';   
import { RestService } from '../rest.service';

declare let $: any;
export interface RootObject {
  type: string;
  size: string;
  imgtype: string;
  id: string;
  image_url: string;
  ga_label: string;
  line1: string;
  name: string;
  line2: string;
  wallet_verify_success_type: string;
  url: string;
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  list:any;
  dashboardlist:any;
  
  constructor(private apiService: RestService) { }

  
  ngOnInit() {
 
    this.apiService.getlist().then((response) => this.list = response); 

    this.apiService.getdashboard().then((response) =>  { this.dashboardlist = response ,
      setTimeout(() => {
      this.setupowl()
    }, 0);
    });
 

  }
 
  setupowl(){  
    $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,

      nav:false,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:5
          }
      }
  })
  }

}


