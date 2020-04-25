import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss']
})
export class CollectComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    setTimeout(() => { 
      this.spinner.hide();
    }, 0);
  }

}
