import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { UtilService } from '../util.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit { 
  listdetail:any
  configresult:any
  constructor(private apiService: RestService, private route: ActivatedRoute,private UtilService:UtilService) { }
  ngOnInit(): void {   
    localStorage.clear();
    this.apiService.Getconfig().then(response=>{
       
      this.configresult=response
      if(window.location.hostname != "localhost"){

        localStorage.setItem("SECRET_CODE",this.configresult.result[0].SECRET_CODE);
        localStorage.setItem("CLIENT_ID",this.configresult.result[1].CLIENT_ID);
        localStorage.setItem("WEB_URL",this.configresult.result[2].WEB_URL);
        localStorage.setItem("SHORT_LINK_TOKEN_BITLY",this.configresult.result[3].SHORT_LINK_TOKEN_BITLY);
        //line noti
        localStorage.setItem("REDIRECT_URL_LINE_NOTI",this.configresult.result[4].REDIRECT_URL_LINE_NOTI);
        localStorage.setItem("CLIENT_ID_LINE_NOTI",this.configresult.result[5].CLIENT_ID_LINE_NOTI);
        localStorage.setItem("CLIENT_SECRET_LINE_NOTI",this.configresult.result[6].CLIENT_SECRET_LINE_NOTI);
        
        window.location.replace("https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id="+this.configresult.result[1].CLIENT_ID+"&redirect_uri="+this.configresult.result[2].WEB_URL+"&state=12345abcde&scope=openid%20profile"); 

      }
      else
      { 
        window.location.replace("https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id="+this.UtilService.client_id()+"&redirect_uri="+this.UtilService.Getweb()+"&state=12345abcde&scope=openid%20profile"); 
      }
    }
    
      )
 
 
  }
}
