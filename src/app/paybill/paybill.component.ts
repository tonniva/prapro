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
  selector: 'app-paybill',
  templateUrl: './paybill.component.html',
  styleUrls: ['./paybill.component.scss']
})
export class PaybillComponent implements OnInit {
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
    // this.id_token = this.route.snapshot.params.id_token; 
    // this.id_token = this.id_token.split('?')[0];
   
    // this.apiService.getdetailRegister(this.id_token).then((response) => {
      
    //   this.listdetail  = response; 
    //   this.listdetail = this.listdetail[this.listdetail.length-1]
    //   this.datapaybill =  new Date(Date.parse(this.listdetail.bill_date)).toISOString().slice(0,10);
       
    //   if(this.listdetail.bill_status =="กำลังตรวจสอบ")
    //   { 
    //    this.isdisable = true;
    //   }
    // });
  }

  onClickSubmit(data) {
      

    var firstname = localStorage.getItem('firstname');
    var lastname = localStorage.getItem('firstname');
    var email = localStorage.getItem('email'); 
    var tel = localStorage.getItem('tel');
    var path_approve = this.UtilService.GetWebUrl()+ "/paybill-approve/"+this.id_token

    data.message =  "userId :: \r\n\r\n"+this.listdetail.userId+ "\r\n\r\nAprove Path : "+path_approve+"\r\n\r\nโอนเงิน : "+data.pricepay+" บาท  \r\nสมัคแบบ : "+data.type +"\r\nรายละเอียด ::\r\n\r\n"+data.description+"\r\n\r\nข้อมูลลูกค้า คุณ "+firstname+" "+lastname+"\r\nemail : "+email+"\r\nเบอร์ ติดต่อ : "+tel;
    data.imageThumbnail =  this.path_slip;
    data.imageFile = this.slipresizefile; 
    data.bill_price = data.pricepay; 
    data.linetoken = this.UtilService.tokenNotify();
//line noti
    this.apiService.linenotifyPaybill(data).then((response) => {    
//line noti

      this.apiService.updatebill(this.listdetail.userId, data).then((response) => {this.updatefinish = response, 
        this.success();
      
        setTimeout(() => { 
          location.reload();
          this.spinner.hide();
        }, 2000);

     });  
    });  
  } 
  success(){
    Swal.fire(
      'ทำรายการสั่งซื้อสำเร็จ !',
      'ขอบคุณครับ',
      'success'
    )
  }
  
  readURL($event) : void { 
   
   
    const slipfile =  this.readThis($event.target); 
    this.temp_path_image1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(slipfile));  
      
    this.ng2ImgMax.resizeImage(slipfile, 240, 240).subscribe(
      result => { 
        this.slipresizefile = slipfile; 
        this.apiService.uploadimage(this.slipresizefile).then((response) => {   
          this.path_slip = response;
          this.path_slip = this.path_slip.imageUrl; 
         
         });  
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );

  }

  readThis(inputValue: any) { 
    var file:File = inputValue.files[0];
    return file;
    
  }
  
}
