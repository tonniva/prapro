import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pramool-bid',
  templateUrl: './pramool-bid.component.html',
  styleUrls: ['./pramool-bid.component.scss']
})
export class PramoolBidComponent implements OnInit {

  constructor() { }
  firstname:string;
  lastname:string;
  email:string;
  tel:string;
  displayName:string;
  currentprice:string;
  ngOnInit(): void {
    this.currentprice = localStorage.getItem("currentprice");
    this.firstname = localStorage.getItem("firstname");
    this.lastname = localStorage.getItem("lastname");
    this.email = localStorage.getItem("email");
    this.tel = localStorage.getItem("tel");
    this.displayName = localStorage.getItem("displayName"); 
    window.scroll(0,0);
  }
  onClickSubmit(data) {  

  }

}
