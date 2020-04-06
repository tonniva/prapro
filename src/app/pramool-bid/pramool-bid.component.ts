import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { UtilService } from '../util.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-pramool-bid',
  templateUrl: './pramool-bid.component.html',
  styleUrls: ['./pramool-bid.component.scss']
})
export class PramoolBidComponent implements OnInit {

  constructor(private UtilService :UtilService,private apiService: RestService,private route: ActivatedRoute,private spinner: NgxSpinnerService) { }
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
 
    this.index_list_select = this.route.snapshot.paramMap.get("indexlistselect");
    
    this.id_token = this.route.snapshot.params.id_token; 
    this.apiService.getdetailRegister(this.id_token).then((response) => {this.Registerdetail = response[0]

    this.firstname = this.Registerdetail.firstname;
    this.lastname = this.Registerdetail.lastname; 
    this.email = this.Registerdetail.email;
    this.tel = this.Registerdetail.tel;       
    this.getdetail();
  });  

  this.apiService.getdetailRegister(this.userId).then((response) => {this.Registerdetail = response[0]
    
    this.pramoonperson[0].firstname = this.Registerdetail.firstname;
    this.pramoonperson[0].lastname=this.Registerdetail.lastname;
    this.pramoonperson[0].displayName=localStorage.getItem("displayName"); 
    this.pramoonperson[0].tell= this.Registerdetail.tel;
    this.pramoonperson[0].pictureUrl= localStorage.getItem("pictureUrl"); 
    this.pramoonperson[0].userId= this.Registerdetail.userId;
    this.pramoonperson[0].email=this.Registerdetail.email;
    this.pramoonperson[0].date= new Date(); 

 
  });  

 


    
 
  
    
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 1000);
    window.scroll(0,0);
  }

  onClickSubmit(data) {   

   
    // this.id_token = localStorage.getItem("userId"); 
     
    this.apiService.getlistdetail(this.id_token).then((response) => {
      this.list = response 
      for (let index = 0; index < this.list.length; index++) {
        if(this.list[index]._id == this.index_list_select){ 
           
         this.list = response[index];
         break;
        } 
      } 
      
      if(data.priceBid <= this.list.pricestart)
      { 
        this.UtilService.showError("กรุณากรอก ราคาประมูลให้สูงกว่า ราคาเริ่มต้น","")
        this.iserror = true;
        return;
        
      }
      else if(data.priceBid <= this.list.priceend)
      { 
        this.UtilService.showError("กรุณากรอก ราคาประมูลให้สูงกว่า ราคาปัจจุบัน","")
        this.iserror = true;
      }
      else{

        Swal.fire({
          title: 'คุณต้องการประมูลใช่หรือไม่',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText:'ยกเลิก'
        }).then((result) => {
          if (result.value) {
            this.postbid(data);   
          }
        }) 
    
      }
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
    });  
    
  }

getdetail(){
 
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
    
    
    
    this.apiService.updatepramoodetail(this.list._id, data.priceBid,this.temp_pramoonperson,null).then((response) => {this.list = response, 
      window.history.back();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
    });  
  }

  

}
