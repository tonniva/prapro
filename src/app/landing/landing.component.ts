import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { UtilService } from '../util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit { 
  listdetail:any
  constructor(private apiService: RestService, private route: ActivatedRoute,private UtilService:UtilService) { }
  ngOnInit(): void {  
    localStorage.clear();
    
    window.location.replace("https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id="+this.UtilService.client_id()+"&redirect_uri="+this.UtilService.Getweb()+"&state=12345abcde&scope=openid%20profile"); 
 
 
  }
}
