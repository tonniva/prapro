import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
declare let $: any;
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private apiService: RestService) { }
  list:any;
  access_token:any;
  id_token:string;

  ngOnInit(): void {
    this.id_token = localStorage.getItem("userId"); 
    this.apiService.getlistdetail(this.id_token).then((response) => {this.list = response,
    
      console.log(this.list)
      setTimeout(() => {
        this.setupowl()
      }, 0);
    });  
  }
  
  setupowl(){  
    $('.owl-carousel').owlCarousel({
      loop:true,
      items:1,
      margin:10,
      autoHeight:true,
      lazyLoad: true,
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
