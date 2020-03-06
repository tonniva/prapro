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
  heroes = ['http://img-196.uamulet.com/uauctions/AU364/2019/3/1/U17017346368704345750776481.jpg'
  , 'http://www.99wat.com/management/chmod/4073/product/119/1-wm.jpg', 'https://fq.lnwfile.com/dxsfhk.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-ronjrqSF1EIuIocSHV18RIDfEm6RqiCYkXIg38SEFguWjGVH'];
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


