import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { UtilService } from '../util.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-historydetail',
  templateUrl: './historydetail.component.html',
  styleUrls: ['./historydetail.component.scss']
})
export class HistorydetailComponent implements OnInit {
  listdetail:any;
  temp_pramoonperson:any;
  ishowdetail:boolean;
  isshowcondition:boolean;
  id_token:any;  
  subobject:any;
  splitted:any;
  status:string;
  detail_after_close:any;
  index_list_select:string; 
  lastperson_bid:any={
    "firstname":"",
    "lastname":"",
    "tell":"",
    "pictureUrl":"https://cdn.iconscout.com/icon/free/png-512/avatar-380-456332.png"
  }
  constructor(private apiService: RestService,private UtilService:UtilService,private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  
  ngOnInit(): void {   
    this.spinner.show();
 
    this.index_list_select = this.route.snapshot.paramMap.get("indexlistselect");
    this.id_token = this.route.snapshot.params.id_token; 
     this.apiService.getlistdetail(this.id_token).then((response) => {this.listdetail =  response
     
       for (let index = 0; index < this.listdetail.length; index++) {
         if(this.listdetail[index]._id == this.index_list_select){ 
          this.listdetail = response[index];
          this.temp_pramoonperson =  response[index];
          break;
         } 
       } 
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 3000); 
      if(this.listdetail.pramoonperson){

         
        this.subobject = this.listdetail.pramoonperson; 
        
        this.splitted = this.subobject.split("||"); 
        //เอาค่า คนที่ประมูลคนล่าสุด มาแสดง
        this.lastperson_bid.firstname = JSON.parse(this.splitted[this.splitted.length-1])[0].firstname;
        this.lastperson_bid.lastname = JSON.parse(this.splitted[this.splitted.length-1])[0].lastname;
        this.lastperson_bid.tell = JSON.parse(this.splitted[this.splitted.length-1])[0].tell;
        this.lastperson_bid.pictureUrl = JSON.parse(this.splitted[this.splitted.length-1])[0].pictureUrl;
        
      }
      else {
        this.lastperson_bid.firstname="";
        this.lastperson_bid.lastname="";
      }

    }); 
  }

  showdetail(){ 
    this.ishowdetail = true;
    this.isshowcondition = false; 
  }

  showcondition(){
    this.isshowcondition = true; 
    this.ishowdetail = false;
  }

  closeOrder(){
    this.id_token = localStorage.getItem("userId"); 
     this.status ="close";
    this.apiService.updatepramoodetail(this.listdetail._id, this.listdetail.priceend,this.temp_pramoonperson,this.status).then((response) => {this.detail_after_close = response, 
      window.history.back();
    });  

  }

  clickclose() {
    if(confirm("คุณต้องการปิดการขาย ใช้หรือไม่")) {
      this.closeOrder();
    }
  }


 

}
