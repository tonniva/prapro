import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { NgxSpinnerService } from "ngx-spinner"; 
declare let $: any;
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private apiService: RestService,private spinner: NgxSpinnerService) { }
  list:any;
  access_token:any;
  id_token:string;
  isclose:boolean=false;

  

  ngOnInit(): void {
    this.spinner.show();
  
    
    this.id_token = localStorage.getItem("userId");  
    this.apiService.getlistdetail(this.id_token).then((response) => 
    {this.list = response 
      this.list =  this.list.filter(
        item => item.status != "close");
   
    
    
      setTimeout(() => { 
        this.spinner.hide();
      }, 1000);
      console.log(this.list)
     
      setTimeout(() => {
         this.setupowl()
      }, 0);
    });  
  }
  
  setupowl(){  
    $('.owl-carousel').owlCarousel({
      loop:false,
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

  noclose(){
    this.spinner.show();
    this.list=[]; 
    this.apiService.getlist().then((response) => {this.list = response,
      this.list =  this.list.filter(
      item => item.status != "close");
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000); 
       setTimeout(() => {
        this.setupowl()
      }, 0);
      }); 
    this.isclose = false;
  }

  closed(){
    this.spinner.show();
    this.list=[]; 
    this.apiService.getlist().then((response) => {this.list = response,
      this.list =  this.list.filter(
      item => item.status == "close");
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000); 
       setTimeout(() => {
        this.setupowl()
      }, 0);
      }); 
    this.isclose = true;
  } 
  
}
