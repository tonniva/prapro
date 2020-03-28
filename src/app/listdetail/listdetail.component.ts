import { Component, OnInit } from '@angular/core';  
import { RestService } from '../rest.service';
import { UtilService } from '../util.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-listdetail',
  templateUrl: './listdetail.component.html',
  styleUrls: ['./listdetail.component.scss']
})
export class ListdetailComponent implements OnInit {
  listdetail:any;
  ishowdetail:boolean;
  isshowcondition:boolean;
  id_token:any;  
  subobject:any;
  splitted:any;
  index_list_select:any;
  temp_pramoonperson:any;
  lastperson_bid:any={
    "firstname":"",
    "lastname":""
  }
  constructor(private apiService: RestService,private UtilService:UtilService,private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  
  ngOnInit(): void {   
    this.spinner.show();
    this.index_list_select = this.route.snapshot.paramMap.get("indexlistselect");
    this.id_token = this.route.snapshot.params.id_token; 
     this.apiService.getlistdetail(this.id_token).then((response) => {this.listdetail = response[this.index_list_select],
      this.temp_pramoonperson =  response[this.index_list_select].pramoonperson,
     
      console.log(this.listdetail)
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
      if(this.listdetail.pramoonperson){

        this.subobject = this.listdetail.pramoonperson; 
        
        this.splitted = this.subobject.split("||"); 
        //เอาค่า คนที่ประมูลคนล่าสุด มาแสดง
        this.lastperson_bid.firstname =  JSON.parse(this.splitted[this.splitted.length-1])[0].firstname;
        this.lastperson_bid.lastname = JSON.parse(this.splitted[this.splitted.length-1])[0].lastname;
       
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
}


