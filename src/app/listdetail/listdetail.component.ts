import { Component, OnInit } from '@angular/core';  
import { RestService } from '../rest.service';
import { UtilService } from '../util.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
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
bankname_own_pra:string; 
bankaccount_own_pra:string; 
Isdisable:boolean= false; 



  //เจ้าของพระ
  checkpra_data:any={
    "count_pra_true":"",
    "count_pra_false":"",
    "count_pra_criminals":"",
    "status_check":""
  }
  lastperson_bid:any={
    "firstname":"",
    "lastname":"",
    "pictureUrl":""
  }

  //location
  public geolocationPosition;
  model: any = {};
  lat: number =0;
  lng: number = 0; 
  //location
  userId:string;
  Registerdetail :any;

  pictureUrl_own_pra :any;
  displayName_own_pra :any;
  userId_own_pra :any;
  Ishidebtnpramoon :boolean= true; 

  GetProfilelist:any;
  constructor(private apiService: RestService,private UtilService:UtilService,private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  
  ngOnInit(): void {    
    this.pictureUrl_own_pra = localStorage.getItem("pictureUrl");
    this.displayName_own_pra = localStorage.getItem("displayName"); 
    this.spinner.show();
 
    this.id_token = this.route.snapshot.params.id_token; 
    this.apiService.getdetailRegister(this.id_token).then((response) => {this.Registerdetail = response[0]
     
      this.firstname_own_pra = this.Registerdetail.firstname;
      this.lastname_own_pra=  this.Registerdetail.lastname; 
      this.tell_own_pra= this.Registerdetail.tel;    
      this.bankname_own_pra= this.Registerdetail.bankname;
      this.bankaccount_own_pra= this.Registerdetail.bankaccount;
      this.userId_own_pra= this.Registerdetail.userId;
      
  });  
 

    
    this.index_list_select = this.route.snapshot.paramMap.get("indexlistselect");
    this.id_token = this.route.snapshot.params.id_token; 
     this.apiService.getlistdetail(this.id_token).then((response) => {
      
       this.listdetail  = response; 
       this.listdetail =  this.listdetail.filter(
        item => item._id == this.index_list_select)[0]; 
        this.GetProfile(localStorage.getItem("access_token"),this.listdetail);

      //  for (let index = 0; index < this.listdetail.length; index++) {
      //    if(this.listdetail[index]._id == this.index_list_select){  
           
      //     this.listdetail = response[index];
      //     //เปิดปิดปุ่ม
      //     this.GetProfile(localStorage.getItem("access_token"),this.listdetail);
      //   debugger
      //     break;
      //    } 
      //  }
     
   
     
      console.log(this.listdetail)
      setTimeout(() => {
        this.showlocation();
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


  GetProfile(access_token,listdetail:any){  
    this.apiService.GetProfile(access_token).then((response) => {
      this.GetProfilelist = response 
       
      if(this.GetProfilelist.userId == listdetail.id_token){
        return  this.Ishidebtnpramoon = true;
      }
      else{
        return  this.Ishidebtnpramoon = false;
      }
      
  }); 
}


  clickonclick_count_pra_true() {

    Swal.fire({
      title: 'คุณต้องการ โหวด พระแท้',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText:'ยกเลิก'
    }).then((result) => {
      if (result.value) {
        this.onclick_count_pra_true()
        Swal.fire(
          'ขอบคุณที่ โหวด พระแท้!',
          '',
          'success'
        )
      }
    })
    
  }
  clickonclick_count_pra_false() {

    Swal.fire({
      title: 'คุณต้องการ โหวด พระไม่แท้',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
        cancelButtonText:'ยกเลิก'
    }).then((result) => {
      if (result.value) {
        this.onclick_count_pra_false()
        Swal.fire(
          'ขอบคุณที่ โหวด พระไม่แท้!',
          '',
          'success'
        )
      }
    })
   
  }
  clickonclick_count_pra_criminals() {

    Swal.fire({
      title: 'คุณต้องการ โหวด เค้าเป็นมิจฉาชีพ',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText:'ยกเลิก'
    }).then((result) => {
      if (result.value) {
        this.onclick_count_pra_criminals()
        Swal.fire(
          'ขอบคุณที่ โหวด เค้าเป็นมิจฉาชีพ!',
          '',
          'success'
        )
      }
    })
   
  }

  //ฟังค์ชัน ตรวจสอบพระ 
  onclick_count_pra_true(){ 
    this.Isdisable=true;
    this.Getupdatedetail("pra_true");   
  }
  onclick_count_pra_false(){
    this.Isdisable=true;
    this.Getupdatedetail("pra_false");   
  }
  onclick_count_pra_criminals(){ 
    this.Isdisable=true;
    this.Getupdatedetail("pra_criminals");   
  }

  
Getupdatedetail(fact_check){ 
  this.id_token = this.route.snapshot.params.id_token; 
  this.apiService.getlistdetail(this.id_token).then((response) => {
    this.listdetail = response 
    
    this.listdetail =  this.listdetail.filter(
      item => item._id == this.index_list_select)[0];   
    // for (let index = 0; index < this.listdetail.length; index++) {
    //   if(this.listdetail[index]._id == this.index_list_select){ 
    //    this.listdetail = response[index];
    //    break;
    //   } 
    // }
 
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
    


showlocation(){

  setTimeout(() => { 
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.geolocationPosition = position,
  
                     console.log(position) 
              
                    var Longitude = this.listdetail.Longitude;
                    var Latitude =  this.listdetail.Latitude;

                    console.log("Latitude:"+Latitude +"Longitude:"+Longitude)
                    this.lat = Number(Latitude)
                    this.lng = Number(Longitude)
            },
            error => {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            }
        );
    };
  
}, 1200);

}


 

}



