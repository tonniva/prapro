import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
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
  constructor(private apiService: RestService, private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  ngOnInit(): void { 
    
    this.spinner.show();
    const code: string = this.route.snapshot.queryParamMap.get('code');
    if(typeof(code)!=undefined){
      this.apiService.GetAccessTokensLine(code).then((response) => {this.listdetail = response, 
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 5000);
        console.log(this.listdetail) 
        localStorage.setItem("access_token", this.listdetail.access_token);
        localStorage.setItem("id_token", this.listdetail.id_token);
        this.GetProfile(this.listdetail.access_token) 
      });  

     
    }

   
  }

  GetProfile(access_token){ 
    debugger
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
  this.apiService.getdetailRegister(p_userId).then((response) => {this.Registerdetail = response, 
 
     localStorage.setItem("status_pramoon_register",this.Registerdetail[0].status_pramoon_register); 
     localStorage.setItem("email", this.Registerdetail[0].email); 
     localStorage.setItem("name", this.Registerdetail[0].email); 
     localStorage.setItem("firstname", this.Registerdetail[0].firstname); 
     localStorage.setItem("lastname", this.Registerdetail[0].lastname); 
     localStorage.setItem("tel", this.Registerdetail[0].tel);    
     localStorage.setItem("bankaccount",this.Registerdetail[0].bankaccount); 
    // console.log(this.Registerdetail)
    
  }); 

}

}
