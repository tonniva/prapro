import { Component, OnInit } from '@angular/core'; 
import { RestService } from '../rest.service'; 
import {Router,ActivatedRoute,Params} from "@angular/router"; 
import { NgxSpinnerService } from "ngx-spinner";
import {DomSanitizer} from '@angular/platform-browser';
import {UtilService} from '../util.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import Swal from 'sweetalert2'
 
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {
  image:any;
  objimage:Array<any> = [];

  image1:any;
  image2:any;
  image3:any;
  image4:any;

  temp_path_image1:any;
  temp_path_image2:any;
  temp_path_image3:any;
  temp_path_image4:any;

 

  constructor(private ng2ImgMax: Ng2ImgMaxService,
    private UtilService :UtilService, 
    private router: Router,
    private apiService:RestService,
    private spinner: NgxSpinnerService,
    private sanitizer:DomSanitizer) { }
   
    email:any;
    token:any; 
    arrayfile:Array<File> = [];
    arrayPathfile:Array<String> = [];
    resultFile:any;

  ngOnInit(): void { 
   
    window.scrollTo(0,0);
    // if()
    // this.email = localStorage.getItem("email");
    // this.apiService.logingetToken(this.email).then((response:any) => {  
    
    //   this.token = response.accessToken;
    //   localStorage.setItem("logintoken",this.token);   
    // });    


   
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

  

  onClickSubmit(data) {  

    if(data.pricestart <= 0){
      this.UtilService.showError("กรุณากรอก <br/> ราคาเริ่มต้น","")
      return;
    }else if(data.dateEnd =="" || data.dateEnd.trim().length == 0){
      this.UtilService.showError("กรุณากรอก <br/> วันที่-เวลา ปิดประมูล","")
      return;
    }
    else if(typeof(this.temp_path_image1) ==='undefined'){
      this.UtilService.showError("กรุณา อัพโหลด <br/> รูปภาพ บัตรประขาชน ","");
      return;
    }
    else if(typeof(this.temp_path_image2) ==='undefined'){
      this.UtilService.showError("กรุณา อัพโหลด <br/> รูปภาพ ทะเบียนบ้าน ชื่อตรงกับบัตรประชาชน ","");
      return;
    }
    else if(typeof(this.temp_path_image3) ==='undefined'){
      this.UtilService.showError("กรุณา อัพโหลด <br/> รูปภาพ บัตรประขาชน พร้อม ถ่ายกับข้อความ หลวงปู่ทวด","");
      return;
    }
    else if(typeof(this.temp_path_image4) ==='undefined'){
      this.UtilService.showError("กรุณา อัพโหลด <br/> รูปภาพ บัญชีธนาคาร ","");
      return;
    }
    else{

      // this.UtilService.showConfirm("คุณต้องการเปิดประมูลใช่หรือไม่"
      // ,"เมื่อทำการลงทะเบียนแล้ว <br/> สามารถแก้ไขได้ <br/> ที่ 'เพิมเติม'"
      // ,function(response:any){ 
      //   if(response){  
      //   alert("asdasdasd");
      //     this.douploadimage(data)
          
      //   } 
      // }); 

      Swal.fire({
        title: 'คุณต้องการเปิดประมูลใช่หรือไม่',
        text: "เมื่อทำการลงทะเบียนแล้วสามารถแก้ไขได้  ที่ 'เพิมเติม'",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText:'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.douploadimage(data);   
        }
      }) 

   
      } 
  }

  



  public postpra(data){

    setTimeout(() => {  
      
      data.access_token = localStorage.getItem("access_token");
      data.id_token = localStorage.getItem("userId"); 
      data.Latitude =   localStorage.getItem("Latitude");
      data.Longitude = localStorage.getItem("Longitude");
      data.ip = localStorage.getItem("ip"); 
      data.status_pramoon_check = "checking";  
      data.pictureUrl = localStorage.getItem("pictureUrl");
      data.displayName= localStorage.getItem("displayName"); 
      
      this.apiService.postpramoon(data,this.arrayPathfile,this.token).then((response) => { 
      
       
        setTimeout(() => { 
          this.spinner.hide();
        }, 0);


        Swal.fire(
          'สำเร็จ !',
          'ขอบคุณครับ',
          'success'
        )
        window.location.href = window.location.origin+'/list/one';
         
      }); 
    
    }, 1000); 
  }
  


  
  public douploadimage(data)
  {  
    this.spinner.show();
    this.arrayfile[0] =this.image1;
    this.arrayfile[1] =this.image2;
    this.arrayfile[2] =this.image3;
    this.arrayfile[3] =this.image4;

    setTimeout(() => { 
      for (let index = 0; index < this.arrayfile.length; index++) {
        this.apiService.uploadimage(this.arrayfile[index]).then((response) => {   
        this.resultFile = response; 
        this.arrayPathfile.push(this.resultFile.imageUrl); 
        if( this.arrayPathfile.length == 4 )
        { 
           
          this.postpra(data);
        } 
       });   

       if( this.arrayPathfile.length == 4 ) break;
        }
    }, 3000);
    this.arrayPathfile =[];
  }
  

 
  
}
