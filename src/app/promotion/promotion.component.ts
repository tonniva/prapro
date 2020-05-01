import { Component, OnInit } from '@angular/core';
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

  constructor(private ng2ImgMax: Ng2ImgMaxService,private UtilService:UtilService,private router: Router,private apiService:RestService,private sanitizer:DomSanitizer,private spinner: NgxSpinnerService) { }

  userId:any;
  Registerdetail:any;

  diffDays:any;
  

  ngOnInit(): void {
    
    this.userId = localStorage.getItem("userId");
 

    this.apiService.getdetailRegister(this.userId).then((response) => {this.Registerdetail = response
     
      setTimeout(() => { 
        this.spinner.hide();
      }, 1000); 
   }); 

  this.apiService.getlistdetail(this.userId).then((response) => { 
 
    this.Registerdetail = response
    
    const resultdate = this.Registerdetail[this.Registerdetail.length-1].date;
    
    const date_webstart =  new Date(Date.parse(resultdate)).valueOf()
    const current_date =  new Date().valueOf()

  
    const diffTime = Math.abs(current_date - date_webstart);
     this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
    if((7-this.diffDays) <=0 ){ 
      this.checkExpirewebsite();
    } 
        
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

        window.open("/preview?token="+localStorage.getItem("userId")); 
      }
    }) 
 

 

  }

  coppylink(){
     
  const link = this.UtilService.GetShortLink()+"?token="+localStorage.getItem("userId");
      this.copyMessage(link);
    
    
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
  
