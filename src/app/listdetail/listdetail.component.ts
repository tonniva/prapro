import { Component, OnInit } from '@angular/core';  
import { RestService } from '../rest.service';
@Component({
  selector: 'app-listdetail',
  templateUrl: './listdetail.component.html',
  styleUrls: ['./listdetail.component.scss']
})
export class ListdetailComponent implements OnInit {
  listdetail:any;
  ishowdetail:boolean;
  isshowcondition:boolean;
  constructor(private apiService: RestService) { }

  
  ngOnInit(): void { 
    this.apiService.getlistdetail().then((response) => {this.listdetail = response,console.log(this.listdetail)}); 
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

