import { Component, OnInit } from '@angular/core';
import { HttpClientModule, JsonpInterceptor } from '@angular/common/http';   
import { RestService } from '../rest.service';
import { NgxSpinnerService } from "ngx-spinner";
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
  


  isshow_checking:boolean=false;
  isshow_pra_true:boolean=false;
  isshow_pra_false:boolean=false;
  isshow_pra_criminals:boolean=false;


  isclose:boolean=false; 

  constructor(private apiService: RestService,private spinner: NgxSpinnerService) { }
   

  access_token:any
  ngOnInit() { 
 
    this.spinner.show();
 
   
    this.apiService.getlist().then((response) => {this.list = response,
      this.list =  this.list.filter(
        item => item.status != "close");
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
       console.log(this.list)
       setTimeout(() => {
        this.setupowl()
      }, 0);
      }); 
    
 

  }

  calcheckconditonstatus_pra_checking(item){
    const all =  parseInt(item.count_pra_true) + parseInt(item.count_pra_false) + parseInt(item.count_pra_criminals)  
   
    if(all>5){  
    const pra_true = (parseInt(item.count_pra_true)/all)*100;
    const pra_false = (parseInt(item.count_pra_false)/all)*100;
    const criminals = (parseInt(item.count_pra_criminals)/all)*100;
          if(pra_true < 80 && pra_false <80 && criminals <70){ 
             
            return  true;
          }
         
   }
   else if (isNaN(all)||all < 5)
   {
    return  true; 
   }   

      
  }
  calcheckconditonstatus_pra_true(item){
    const all =  parseInt(item.count_pra_true) + parseInt(item.count_pra_false) + parseInt(item.count_pra_criminals)  
   if(all>5){ 
  
    const pra_true = (parseInt(item.count_pra_true)/all)*100;
    const pra_false = (parseInt(item.count_pra_false)/all)*100;
    const criminals = (parseInt(item.count_pra_criminals)/all)*100;
  
          if(pra_true > 80 && pra_false < 80 && criminals < 70){ 
            return  true;
          }
          else 
          {
            return false; 
          }   
   } 
 }
 calcheckconditonstatus_pra_false(item){
  const all =  parseInt(item.count_pra_true) + parseInt(item.count_pra_false) + parseInt(item.count_pra_criminals)  
 if(all>5){ 
  const pra_true = (parseInt(item.count_pra_true)/all)*100;
  const pra_false = (parseInt(item.count_pra_false)/all)*100;
  const criminals = (parseInt(item.count_pra_criminals)/all)*100;
        if(pra_true < 80 && pra_false > 80 && criminals < 50){ 
          return  true;
        }
        else 
        {
          return false; 
        }   
 } 
}
calcheckconditonstatus_pra_criminals(item){
  const all =  parseInt(item.count_pra_true) + parseInt(item.count_pra_false) + parseInt(item.count_pra_criminals)  
 if(all>5){ 
  const pra_true = (parseInt(item.count_pra_true)/all)*100;
  const pra_false = (parseInt(item.count_pra_false)/all)*100;
  const criminals = (parseInt(item.count_pra_criminals)/all)*100;
        if(criminals > 70){ 
          return  true;
        }
        else 
        {
          return false; 
        }   
 } 
}
 
 
  setupowl(){  
    $('.owl-carousel').owlCarousel({
      loop:false,
      items:1,
      margin:10,
      // autoHeight:true,
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


