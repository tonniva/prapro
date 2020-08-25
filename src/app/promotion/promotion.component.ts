import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
 
import { RestService } from '../rest.service';
import {Router,ActivatedRoute,Params} from "@angular/router"; 
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import {DomSanitizer} from '@angular/platform-browser';
import { UtilService } from '../util.service';

import { Ng2ImgMaxService } from 'ng2-img-max';
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  constructor(private ng2ImgMax: Ng2ImgMaxService,private UtilService:UtilService,private ref: ChangeDetectorRef,private router: Router,private apiService:RestService,private sanitizer:DomSanitizer,private spinner: NgxSpinnerService) { }

  userId:any;
  Registerdetail:any;

  diffDays:any;
  resultshotlink:any;
  resultdate:any;
  profiledetail:any;
  WEB_URL:any;
  SHORT_LINK_TOKEN_BITLY:any;
  datetotal:any;
  

  ngOnInit(): void {
    this.spinner.show();
    this.userId = localStorage.getItem("userId");
 

    this.apiService.getdetailRegister(this.userId).then((response) => {this.Registerdetail = response
      this.profiledetail=response[0];
      
  
   }); 

  this.apiService.getlistdetail(this.userId).then((response) => { 
 
    this.Registerdetail = response

   
    
    this.resultdate = this.Registerdetail[this.Registerdetail.length-1].date;
    
    const date_webstart =  new Date(Date.parse(this.resultdate)).valueOf()
    const current_date =  new Date().valueOf()

  
    const diffTime = Math.abs(current_date - date_webstart);
     this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      const bill_date_total_active  = parseInt(this.profiledetail.bill_date_total_active);
       
      this.datetotal = ((7+bill_date_total_active)-this.diffDays);
    if(this.datetotal <=0 ){ 
      setTimeout(() => { 
        this.spinner.hide();
      }, 10); 
      this.checkExpirewebsite(); 
    } 
      this.ref.detectChanges(); 
        
 }); 



  }

  checkExpirewebsite(){ 
      //line noti 
            this.apiService.updatebillexpire(this.userId).then((response) => response
           );   
  }
  

  Getlink(){

    Swal.fire({
      title: 'ไปยัง ตัวอย่าง Salpage ที่สร้าง',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText:'ยกเลิก'
    }).then((result) => {
      if (result.value) { 

        window.open("https://web-circleacademy.firebaseapp.com/preview?token=U9b7c614f44c264a14a27b86149b5f9ba"); 
      }
    }) 
 

 

  }

  coppylink(){ 
      
    if(typeof(this.profiledetail.short_link)!='undefined'&& this.profiledetail.short_link!="" && this.profiledetail.short_link!=null){
      this.copyMessage(this.profiledetail.short_link);
      return; 
    }

    if(window.location.hostname != "localhost"){  
       

         this.WEB_URL = localStorage.getItem("WEB_URL").split("/home")[0].toString();  
         this.SHORT_LINK_TOKEN_BITLY = localStorage.getItem("SHORT_LINK_TOKEN_BITLY");  
 
        const long_url = this.WEB_URL+"/preview?token="+localStorage.getItem("userId");
        const acess_token = this.SHORT_LINK_TOKEN_BITLY;

        this.apiService.GetShotLinkAPI(acess_token,long_url).then((response) => { 
        this.resultshotlink = response

        
        this.copyMessage(this.resultshotlink.data.url);
 
 
        this.apiService.updateshortlink(this.userId,this.resultshotlink.data.url).then((response) => {
          location.reload();
        });   
        });

        } 
        else{ 
        this.copyMessage(window.location.origin+"/preview?token="+localStorage.getItem("userId")); 
        }
     }

     copyMessage(val: string){
        
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'คัดลอก แล้ว!!',
        showConfirmButton: false,
        timer: 1500
      })
    }

    gotobill(){ 
      window.location.replace("/paybill/"+localStorage.getItem("userId"));
      // window.location.href = window.location.origin+"/paybill"+localStorage.getItem("userId");
    }
  }
  
