import { Component, OnInit } from '@angular/core';
import { analytics } from 'firebase';
import { Ng2ImgMaxService } from 'ng2-img-max';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2'
import { RestService } from '../rest.service'; 
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
  constructor(private apiService:RestService,private ng2ImgMax: Ng2ImgMaxService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

  onClickSubmit(data) {
      

    var firstname = localStorage.getItem('firstname');
    var lastname = localStorage.getItem('firstname');
    var email = localStorage.getItem('email'); 
    var tel = localStorage.getItem('tel');

    data.message =  "โอนเงิน : "+data.pricepay+" บาท  \r\nสมัรแบบ : "+data.type +"\r\nรายละเอียด ::\r\n"+data.description+"\r\nข้อมูลลูกค้า คุณ "+firstname+" "+lastname+"\r\nemail : "+email+"\r\nเบอร์ ติดต่อ : "+tel;
    data.imageThumbnail =  this.path_slip;
    data.imageFile = this.slipresizefile; 

    this.apiService.linenotifyPaybill(data).then((response) => {   
   
     
     });  


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
        // setTimeout(() => {
        //   Swal.fire({
        //     title: 'บันทึก รูป Header ใช่หรือไม่',
        //     text: "",
        //     imageUrl:this.temp_path_image1.changingThisBreaksApplicationSecurity,    
        //     imageHeight: 100,
        //     imageAlt: 'Custom image',  
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, delete it!'
        //   }).then((result) => {

        //     this.slipresizefile = slipfile; 
        //     if (result.value) {
            
        //       Swal.fire({
        //         position: 'top-end',
        //         icon: 'success',
        //         title: 'บันทึกเรียบร้อย!',
        //         showConfirmButton: false,
        //         timer: 1500
        //       })
        //       // this.apiService.uploadimage(this.slipresizefile).then((response) => {   
        //       //   this.path_slip = response;
        //       //   this.path_slip = this.path_slip.imageUrl; 
               
        //       //  }); 
        //     }
        //     else{
        //       this.path_slip="";
        //       this.temp_path_image1="http://placehold.it/180";
        //     }
        //   })
         
        // }, 1000); 
      
        
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
