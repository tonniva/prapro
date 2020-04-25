import { Component, OnInit } from '@angular/core';

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
 
import Swal from 'sweetalert2'
@Component({
  selector: 'app-pramoonregister',
  templateUrl: './pramoonregister.component.html',
  styleUrls: ['./pramoonregister.component.scss']
})
export class PramoonregisterComponent implements OnInit {
  image:any;
  objimageprofile:Array<any> = [];
  arrayfile:Array<File> = [];
  arrayPathfile:Array<String> = [];



  
  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;
  status_pramoon_register:string;
  resultFile:any;

  image1:any;
  image2:any;
  image3:any;
  image4:any;

  temp_path_image1:any;
  temp_path_image2:any;
  temp_path_image3:any;
  temp_path_image4:any;

  userId:any;
  Registerdetail:any;
  BankName: string = '';
  
  constructor(private ng2ImgMax: Ng2ImgMaxService,private UtilService:UtilService,private router: Router,private apiService:RestService,private sanitizer:DomSanitizer,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.spinner.show();

    this.userId = localStorage.getItem("userId");
    if(this.userId==null){ 
      window.location.href = window.location.origin+"/landing";
    }
     
    this.apiService.getdetailRegister(this.userId).then((response) => {this.Registerdetail = response
   
      setTimeout(() => { 
        this.spinner.hide();
      }, 1000);
      
    if( this.Registerdetail.length > 0 && this.Registerdetail[0].status_pramoon_register == "waitingcheck"){ 
   
       this.router.navigate(['/list/two'])  
  } 
   }); 
 
 

 
  }


  changeListener_one($event) : void { 
    this.image1 =  this.readThis($event.target); 
    this.temp_path_image1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image1));  
   
    this.ng2ImgMax.resizeImage(this.image1, 1000, 1000).subscribe(
      result => {
        this.image1 = result;
        
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }
  changeListener_two($event) : void { 
    this.image2 =   this.readThis($event.target);
    this.temp_path_image2 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image2));  

    this.ng2ImgMax.resizeImage(this.image2, 1000, 1000).subscribe(
      result => {
        this.image2 = result;
        
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }
  changeListener_three($event) : void { 
    this.image3 =   this.readThis($event.target);
    this.temp_path_image3 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image3));  

    this.ng2ImgMax.resizeImage(this.image3, 1000, 1000).subscribe(
      result => {
        this.image3 = result;
        
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }
  changeListener_four($event) : void { 
    this.image4 =  this.readThis($event.target);
    this.temp_path_image4 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image4));  

    this.ng2ImgMax.resizeImage(this.image4, 1000, 1000).subscribe(
      result => {
        this.image4 = result;
        
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

  selectBankFrom (event: any) {
    //update the ui
    this.BankName = event.target.value;
    localStorage.setItem("Bankfrom",this.BankName);
  }
  onClickSubmit(data) {  
    
    data.bankname = this.BankName;
 
    if(data.firstname =="" || data.firstname.trim().length == 0){
      this.UtilService.showError("กรุณากรอก <br/> ชื่อ","")
      return;
    }else if(data.lastname =="" || data.lastname.trim().length == 0){
      this.UtilService.showError("กรุณากรอก <br/> นามสกุล","")
      return;
    }  else if(data.tel =="" || data.tel.trim().length == 0){
      this.UtilService.showError("กรุณากรอก <br/> เบอร์โทร","")
      return;
    } else if(data.email == "" || data.email.trim().length == 0){ 
      this.UtilService.showError("กรุณากรอก <br/> Email","")
      return;
    } 
    else{ 
      Swal.fire({
        title: 'คุณต้องการลงทะเบียนใช่หรือไม่',
        text: "เมื่อทำการลงทะเบียนแล้ว ไม่สามารถแก้ไขได้ ต้องแจ้ง ผ่านแอดมินเท่านั้น เพื่อเป็นการป้องกัน 'มิจฉาชีพ' ปลอมแปลง",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText:'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.Dopost(data);   
        }
      }) 
   
    } 
  }


  Dopost(data)
  {
 
    this.spinner.show();
    this.arrayfile[0] =this.image1;
    this.arrayfile[1] =this.image2;
    this.arrayfile[2] =this.image3;
    this.arrayfile[3] =this.image4;

    this.arrayPathfile[0]=null;
    this.arrayPathfile[1]=null;
    this.arrayPathfile[2]=null;
    this.arrayPathfile[3]=null;

    this.arrayPathfile=[];


          
            localStorage.setItem("email", data.email); 
            data.userId = localStorage.getItem("userId"); 
            data.access_token = localStorage.getItem("access_token");
            data.id_token = localStorage.getItem("id_token"); 

   
            const date_webstart =  new Date().valueOf()
            const current_date =  new Date().valueOf()

  
            const diffTime = Math.abs(current_date - date_webstart);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 


             data.diffDays = 30-diffDays
        
 
    this.apiService.PramoonRegister(data,this.arrayPathfile).then((response) => {  
      Swal.fire(
        'สำเร็จ !',
        'ขอบคุณครับ',
        'success'
      )
      this.router.navigate(['/list/two'])   
      setTimeout(() => { 
        this.spinner.hide();
      }, 100);
    });  
    // for (let index = 0; index < 4; index++) { 
    //     this.apiService.uploadimage(this.arrayfile[index]).then((response) => {   
    //     this.resultFile = response; 
    //     this.arrayPathfile.push(this.resultFile.imageUrl);    
      
    //     if(index ==3 ){

    //       setTimeout(() => {   
      
    //         localStorage.setItem("email", data.email); 
    //         data.userId = localStorage.getItem("userId"); 
    //         data.access_token = localStorage.getItem("access_token");
    //         data.id_token = localStorage.getItem("id_token"); 

   
    //         const date_webstart =  new Date().valueOf()
    //         const current_date =  new Date().valueOf()

  
    //         const diffTime = Math.abs(current_date - date_webstart);
    //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 


    //          data.diffDays = 30-diffDays
        
 
    //         this.apiService.PramoonRegister(data,this.arrayPathfile).then((response) => {  
    //           Swal.fire(
    //             'สำเร็จ !',
    //             'ขอบคุณครับ',
    //             'success'
    //           )
    //           this.router.navigate(['/list/two'])   
    //           setTimeout(() => { 
    //             this.spinner.hide();
    //           }, 100);
    //         });   
    
    //   }, 0);
    //     }
    //    });   


    //   } 
   




  }

  

 
}
