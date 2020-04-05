import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
 
@Component({
  selector: 'app-pramool-bid',
  templateUrl: './pramool-bid.component.html',
  styleUrls: ['./pramool-bid.component.scss']
})
export class PramoolBidComponent implements OnInit {

  constructor(private apiService: RestService,private route: ActivatedRoute,private spinner: NgxSpinnerService) { }
  firstname:string;
  lastname:string;
  email:string;
  tel:string;
  displayName:string;
  pricestart:string;
  pricebidend:string;
  iserror:boolean = false;
  id_token:string;
  index_list_select:string;
  list:any; 
  
  pictureUrl:any; 
  userId:any;  

  pramoonperson:any =[{
    "firstname":"",
    "lastname":"",
    "displayName":"",
    "tell":"",
    "pictureUrl":"",
    "userId":"",
    "date":"",
  }];
  temp_pramoonperson:any;

  
  Registerdetail:any;
  ngOnInit(): void { 
    this.spinner.show();
    this.userId = localStorage.getItem("userId");
    this.userId = localStorage.getItem("userId");
    this.pictureUrl = localStorage.getItem("pictureUrl");
    this.displayName = localStorage.getItem("displayName"); 
    this.index_list_select = this.route.snapshot.paramMap.get("indexlistselect");

    this.apiService.getdetailRegister(this.userId).then((response) => {this.Registerdetail = response[0]

    this.firstname = this.Registerdetail.firstname;
    this.lastname = this.Registerdetail.lastname; 
    this.email = this.Registerdetail.email;
    this.tel = this.Registerdetail.tel;    

  this.pramoonperson[0].firstname = this.firstname;
  this.pramoonperson[0].lastname=this.lastname;
  this.pramoonperson[0].displayName=this.displayName;
  this.pramoonperson[0].tell= this.tel
  this.pramoonperson[0].pictureUrl=this.pictureUrl;
  this.pramoonperson[0].userId= this.userId;
  this.pramoonperson[0].email=this.email
  this.pramoonperson[0].date= new Date();
  this.getdetail();
  });  


    
 
  
    
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 1000);
    window.scroll(0,0);
  }

  onClickSubmit(data) {   

   
    this.id_token = localStorage.getItem("userId"); 
    this.apiService.getlistdetail(this.id_token).then((response) => {
      this.list = response 
      for (let index = 0; index < this.list.length; index++) {
        if(this.list[index]._id == this.index_list_select){ 
          debugger
         this.list = response[index];
         break;
        } 
      }
      console.log(this.list)
      if(data.priceBid <= this.list.pricestart)
      { 
        alert("กรุณากรอกราคาประมูลให้สูงกว่า ราคาปัจจุบัน");
        this.iserror = true;
      }
      else if(data.priceBid <= this.list.priceend)
      { 
        alert("กรุณากรอกราคาประมูลให้สูงกว่า ราคาปัจจุบัน");
        this.iserror = true;
      }
      else{
       this.postbid(data);
      }
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
    });  
    
  }

getdetail(){

  this.id_token = localStorage.getItem("userId"); 
  this.apiService.getlistdetail(this.id_token).then((response) => {
    this.list = response  
    
    for (let index = 0; index < this.list.length; index++) {
      if(this.list[index]._id == this.index_list_select){ 
      
       this.list = response[index];
       break;
      } 
    }

    this.pricestart = this.list.pricestart
    this.pricebidend = this.list.priceend
  });  
}
  postbid(data){
    console.log(this.list)
    //update ข้อมูล ใครที่ ประมูล บ้าง คนใหม่ ใส่ไป 
    //มี คนเคยประมูลแล้ว
    if(this.list.pramoonperson)
    {
      this.temp_pramoonperson = JSON.stringify(this.list.pramoonperson) +"||"+ JSON.stringify(this.pramoonperson); 
    }
    else {
      //ยังไม่มีมี คนเคยประมูลแล้ว
      this.temp_pramoonperson = JSON.stringify(this.pramoonperson); 
    }
     //update ข้อมูล ใครที่ ประมูล บ้าง คนใหม่ ใส่ไป 
    
    this.id_token = localStorage.getItem("userId"); 
    debugger
    this.apiService.updatepramoodetail(this.list._id, data.priceBid,this.temp_pramoonperson,null).then((response) => {this.list = response, 
      window.history.back();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
    });  
  }

  

}
