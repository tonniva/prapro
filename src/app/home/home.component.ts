import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner"; 
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listdetail:any
  GetProfilelist:any;
  pictureUrl:any;
  Registerdetail:any;
  preview:any;

  constructor(private apiService: RestService, private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {  
  
    this.preview=[
    'https://asset-sale-page.s3-ap-southeast-1.amazonaws.com/1.png',
    'https://asset-sale-page.s3-ap-southeast-1.amazonaws.com/12.png',
    'https://asset-sale-page.s3-ap-southeast-1.amazonaws.com/14.png',
    'https://asset-sale-page.s3-ap-southeast-1.amazonaws.com/15.png',
    'https://asset-sale-page.s3-ap-southeast-1.amazonaws.com/2.png',
    'https://asset-sale-page.s3-ap-southeast-1.amazonaws.com/4.png',
    'https://asset-sale-page.s3-ap-southeast-1.amazonaws.com/5.png',
    'https://asset-sale-page.s3-ap-southeast-1.amazonaws.com/6.png',
    'https://asset-sale-page.s3-ap-southeast-1.amazonaws.com/7.png',
    'https://asset-sale-page.s3-ap-southeast-1.amazonaws.com/9.png'
  ]

  setTimeout(() => {
    this.setupowl()
  }, 3000); 
    this.spinner.show();
    const code: string = this.route.snapshot.queryParamMap.get('code');
    
    if(typeof(code)!=undefined){
      this.apiService.GetAccessTokensLine(code).then((response) => {this.listdetail = response, 
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        console.log(this.listdetail) 
        localStorage.setItem("access_token", this.listdetail.access_token);
        localStorage.setItem("id_token", this.listdetail.id_token);
        this.GetProfile(this.listdetail.access_token) 
      });  

     
    }

   
  }

  GetProfile(access_token){  
    this.apiService.GetProfile(access_token).then((response) => {this.GetProfilelist = response,
      console.log(this.GetProfilelist) 
      //เอา้ไป ใช้ใน หน้า pramoonregister เพื่อระบุว่า สร้าง จาก ไลน์ userId นี้
      localStorage.setItem("userId",this.GetProfilelist.userId); 
      localStorage.setItem("pictureUrl",this.GetProfilelist.pictureUrl);
      localStorage.setItem("displayName",this.GetProfilelist.displayName);  
     
      //เอา้ไป ใช้ใน หน้า pramoonregister เพื่อระบุว่า สร้าง จาก ไลน์ userId นี้

      this.GetRegisterdetail(this.GetProfilelist.userId)});  

  }
  
GetRegisterdetail(p_userId:string){  
  this.apiService.getdetailRegister(p_userId).then((response) => {this.Registerdetail = response
 if(this.Registerdetail.length > 0){
     localStorage.setItem("status_pramoon_register",this.Registerdetail[0].status_pramoon_register); 
     localStorage.setItem("email", this.Registerdetail[0].email); 
     localStorage.setItem("name", this.Registerdetail[0].email); 
     localStorage.setItem("firstname", this.Registerdetail[0].firstname); 
     localStorage.setItem("lastname", this.Registerdetail[0].lastname); 
     localStorage.setItem("tel", this.Registerdetail[0].tel);    
     localStorage.setItem("bankaccount",this.Registerdetail[0].bankaccount); 
    }
    
  }); 

}

setupowl(){  
  $('.owl-carousel').owlCarousel('destroy'); 
  $('.owl-carousel').owlCarousel({ 
    margin:50,
    items:2,
    loop:true, 
    dot:true,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true, 
    nav:false
})

}

gotopath(){
  window.open("/preview?t="+localStorage.getItem("userId")); 
}
}
