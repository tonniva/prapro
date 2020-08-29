import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import {Router,ActivatedRoute,Params} from "@angular/router"; 
import { NgxSpinnerService } from "ngx-spinner"; 
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private apiService:RestService,private router: Router,private spinner: NgxSpinnerService) { }
  userId:string;
  Registerdetail:any;

  IsGoToPostItem:boolean = false;
  

  ngOnInit(): void {
    this.spinner.show();
  }

  clickmenu(menu){

if(menu =="A"){
  
}

  }

  GoTo(){
     
    this.userId = localStorage.getItem("userId");

    this.apiService.getdetailRegister(this.userId).then((response) => {this.Registerdetail = response
      setTimeout(() => { 
        this.spinner.hide();
      }, 2000);
       
    if( this.Registerdetail.length > 0 && this.Registerdetail[0].status_pramoon_register == "waitingcheck"){ 
      this.IsGoToPostItem = true; 
      // this.router.navigate(['/list/two'])  
      } 
      else{ 
        this.router.navigate(['/pramoonregister'])  
      }
   });   
  }
}
