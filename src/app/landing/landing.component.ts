import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit { 
  listdetail:any
  constructor(private apiService: RestService, private route: ActivatedRoute) { }
  ngOnInit(): void {  
    window.location.replace("https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653915528&redirect_uri=http://localhost:4200/home&state=12345abcde&scope=openid%20profile"); 
  }
}
