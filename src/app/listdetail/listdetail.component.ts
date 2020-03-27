import { Component, OnInit } from '@angular/core';  
import { RestService } from '../rest.service';
import { UtilService } from '../util.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private apiService: RestService,private UtilService:UtilService,private route: ActivatedRoute) { }

  
  ngOnInit(): void {   
   
    this.id_token = this.route.snapshot.params.id_token; 
     this.apiService.getlistdetail(this.id_token).then((response) => {this.listdetail = response,
      console.log(this.listdetail)
    localStorage.setItem("currentprice",this.listdetail[0].pricestart);
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


