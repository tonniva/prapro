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

  count_pra_true: any=0;
  count_pra_false:  any=0;
  count_pra_criminals:  any=0;


  isshow_checking:boolean=false;
  isshow_pra_true:boolean=false;
  isshow_pra_false:boolean=false;
  isshow_pra_criminals:boolean=false;


  //เจ้าของพระ
firstname_own_pra:string;
lastname_own_pra:string;
tell_own_pra:string; 
bankaccount_own_pra:string; 

  //เจ้าของพระ
  checkpra_data:any={
    "count_pra_true":"",
    "count_pra_false":"",
    "count_pra_criminals":"",
    "status_check":""
  }
  lastperson_bid:any={
    "firstname":"",
    "lastname":""
  }
  constructor(private apiService: RestService,private UtilService:UtilService,private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  
  ngOnInit(): void {   
    this.spinner.show();
    this.firstname_own_pra = localStorage.getItem("firstname");
    this.lastname_own_pra= localStorage.getItem("lastname");
    this.tell_own_pra= localStorage.getItem("tel");
    this.bankaccount_own_pra= localStorage.getItem("bankaccount");
    
    this.index_list_select = this.route.snapshot.paramMap.get("indexlistselect");
    this.id_token = this.route.snapshot.params.id_token; 
     this.apiService.getlistdetail(this.id_token).then((response) => {this.listdetail = response[this.index_list_select],
      this.temp_pramoonperson =  response[this.index_list_select].pramoonperson,
     
      console.log(this.listdetail)
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
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




  //ฟังค์ชัน ตรวจสอบพระ 
  onclick_count_pra_true(){ 
    this.Getupdatedetail("pra_true");  
  }
  onclick_count_pra_false(){
    this.Getupdatedetail("pra_false");  
  }
  onclick_count_pra_criminals(){
    this.Getupdatedetail("pra_criminals");  
  }

  
Getupdatedetail(fact_check){ 
  this.id_token = this.route.snapshot.params.id_token; 
  this.apiService.getlistdetail(this.id_token).then((response) => {this.listdetail = response[this.index_list_select] 
 
    if(fact_check =="pra_true"){
      this.count_pra_true =  parseInt(this.listdetail.count_pra_true||0) +1;
      this.count_pra_false =  parseInt(this.listdetail.count_pra_false||0);
      this.count_pra_criminals =  parseInt(this.listdetail.count_pra_criminals||0);
      this.updatecheckpra();  
    }
    else if(fact_check =="pra_false"){
      this.count_pra_true =  parseInt(this.listdetail.count_pra_true||0)
      this.count_pra_false =  parseInt(this.listdetail.count_pra_false||0)+1;
      this.count_pra_criminals =  parseInt(this.listdetail.count_pra_criminals||0);
      this.updatecheckpra();  
    }
    else if(fact_check =="pra_criminals"){
      this.count_pra_true =  parseInt(this.listdetail.count_pra_true)
      this.count_pra_criminals =  parseInt(this.listdetail.count_pra_criminals)+1;
      this.count_pra_false =  parseInt(this.listdetail.count_pra_false);
      this.updatecheckpra();  
    }
   
 });  
}
updatecheckpra() {    
            this.id_token = localStorage.getItem("userId"); 
            this.checkpra_data.count_pra_true = this.count_pra_true;
            this.checkpra_data.count_pra_false = this.count_pra_false;
            this.checkpra_data.count_pra_criminals = this.count_pra_criminals;
            this.checkpra_data.status_check = "checking";
            debugger
            this.apiService.updatecheckpra(this.listdetail._id,this.checkpra_data).then((response) => {  
        
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            });  

}
  //ฟังค์ชัน ตรวจสอบพระ 

 

  calcheckconditonstatus_pra_checking(item){ 
    const all =  parseInt(item.count_pra_true) + parseInt(item.count_pra_false) + parseInt(item.count_pra_criminals)  
   if(all>5){  
    const pra_true = (parseInt(item.count_pra_true)/all)*100;
    const pra_false = (parseInt(item.count_pra_false)/all)*100;
    const criminals = (parseInt(item.count_pra_criminals)/all)*100;
          if(pra_true < 80 && pra_false <80 && criminals <70){ 
         
            return  true;
          }
         
   }    
   else if (isNaN(all)||all < 5)
   {
    return  true; 
   }     
  }
  calcheckconditonstatus_pra_true(item){
    const all =  parseInt(item.count_pra_true) + parseInt(item.count_pra_false) + parseInt(item.count_pra_criminals)  
   if(all>5){ 
   
    const pra_true = (parseInt(item.count_pra_true)/all)*100;
    const pra_false = (parseInt(item.count_pra_false)/all)*100;
    const criminals = (parseInt(item.count_pra_criminals)/all)*100;
          if(pra_true > 80 && pra_false < 80 && criminals < 70){ 
            return  true;
          }
          else 
          {
            return false; 
          }   
   } 
 }
 calcheckconditonstatus_pra_false(item){
  const all =  parseInt(item.count_pra_true) + parseInt(item.count_pra_false) + parseInt(item.count_pra_criminals)  
 if(all>0){ 
  const pra_true = (parseInt(item.count_pra_true)/all)*100;
  const pra_false = (parseInt(item.count_pra_false)/all)*100;
  const criminals = (parseInt(item.count_pra_criminals)/all)*100;
        if(pra_true < 80 && pra_false > 80 && criminals < 70){ 
          return  true;
        }
        else 
        {
          return false; 
        }   
 } 
}
calcheckconditonstatus_pra_criminals(item){
  const all =  parseInt(item.count_pra_true) + parseInt(item.count_pra_false) + parseInt(item.count_pra_criminals)  
 if(all>5){ 
  const pra_true = (parseInt(item.count_pra_true)/all)*100;
  const pra_false = (parseInt(item.count_pra_false)/all)*100;
  const criminals = (parseInt(item.count_pra_criminals)/all)*100;
        if(criminals > 70){ 
          return  true;
        }
        else 
        {
          return false; 
        }   
 } 
}
    


  
  
}


