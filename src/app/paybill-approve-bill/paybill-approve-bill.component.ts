import { Component, OnInit } from '@angular/core';
import { analytics } from 'firebase';
import { Ng2ImgMaxService } from 'ng2-img-max';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2'
import { RestService } from '../rest.service'; 
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { UtilService } from '../util.service';
 
declare let $: any;


@Component({
  selector: 'app-paybill-approve-bill',
  templateUrl: './paybill-approve-bill.component.html',
  styleUrls: ['./paybill-approve-bill.component.scss']
})
export class PaybillApproveBillComponent implements OnInit {
  temp_path_image1:any="http://placehold.it/180";
  slipresizefile:any;
  path_slip:any;
  id_token:any;
  listdetail:any;
  updatefinish:any;
  datapaybill:any;
  isdisable:any;
  
  
  constructor(private UtilService:UtilService, private spinner: NgxSpinnerService,private route: ActivatedRoute,private apiService:RestService,private ng2ImgMax: Ng2ImgMaxService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.spinner.show();
    this.id_token = this.route.snapshot.params.id_token; 
    this.id_token = this.id_token.split('?')[0];
   
    this.apiService.getdetailRegister(this.id_token).then((response) => {
       
      this.listdetail  = response; 
      this.listdetail = this.listdetail[this.listdetail.length-1]
      this.datapaybill =  new Date(Date.parse(this.listdetail.bill_date)).toISOString().slice(0,10); 
      setTimeout(() => {  
        this.spinner.hide();
      }, 10); 
    });
  }

  onClickSubmit(data) {
       
    data.bill_date_total_active = data.bill_date_total_active;   
 
      this.apiService.update_approve_bill(this.listdetail.userId, data).then((response) => {this.updatefinish = response, 
        this.success(); 
        setTimeout(() => { 
          window.history.back();
          this.spinner.hide();
        }, 2000); 

     });   
  } 
  success(){
    Swal.fire(
      'ทำรายการสั่งซื้อสำเร็จ !',
      'ขอบคุณครับ',
      'success'
    )
  }
  
 
 
}
