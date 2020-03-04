import { Injectable } from '@angular/core';  
import {Http, Headers} from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class RestService { 

  constructor(private httpClient: HttpClient) { } 
 
options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};
optionsGetProfile = {
  headers: new HttpHeaders().set('Authorization', 'Bearer')
};

  
  //https://access.line.me/oauth2/v2.1/login?loginState=rsqb6MNEEFSsG3Z9u2BI0X&loginChannelId=1653915528&returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fscope%3Dopenid%2Bemail%26response_type%3Dcode%26state%3D12345abcde%26redirect_uri%3Dhttps%253A%252F%252Fmusing-brahmagupta-fc2121.netlify.com%26client_id%3D1653915528#/
  
 body = new URLSearchParams();

  data= {
    "grant_type":"authorization_code",
    "code":"",
    "redirect_uri":"http://localhost:4200/home",
    "client_id":"1653915528", 
    "client_secret":"e394b8a72a9bcdf28d44e6867e8c878c",
    }

  GetAccessTokensLine(code:any){   
    this.body.set('grant_type', this.data.grant_type);
    this.body.set('code', code);
    this.body.set('redirect_uri', this.data.redirect_uri);
    this.body.set('client_id', this.data.client_id);
    this.body.set('client_secret', this.data.client_secret); 
  return this.httpClient.post('https://api.line.me/oauth2/v2.1/token', this.body.toString(), this.options)
  .toPromise()
  .then((response) => response);
 }


  GetProfile(access_token){   
   this.optionsGetProfile={headers: new HttpHeaders().set('Authorization', 'Bearer '+access_token)}
    return this.httpClient.get('https://api.line.me/v2/profile', this.optionsGetProfile)
    .toPromise()
    .then((response) => response);
  }


  getlist(){ 
    return this.httpClient.get(`https://dev.buzzebees.com/api/dashboard/nestle_rtd_luckydraw?locale=1054&timestamp=20200225103012&device_app_id=1134824876670846`)
    .toPromise()
    .then((response) => response);
    
  }
  getlistdetail(){
    return this.httpClient.get(`https://stg7.buzzebees.com/api/campaign/522582?device_app_id=1134824876670846`)
    .toPromise()
    .then((response) => response);
    
  }

  
  getdashboard(){ 
  return this.httpClient.get('https://dev.buzzebees.com/api/dashboard/nestle_rtd_luckydraw?locale=1054&timestamp=20200225103012&device_app_id=1134824876670846')
  .toPromise().then((response) => response); 
  }
}



