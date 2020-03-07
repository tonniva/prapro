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

 
 PramoonRegister(item:any,file:any){ 
      
  const PramoonRegisteroptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };  
  this.body.set('firstname', item.firstname);
  this.body.set('lastname', item.lastname);
  this.body.set('email', item.email);
  this.body.set('tel', item.tel);
  this.body.set('bankaccount', item.bankaccount);
  debugger
  this.body.set('password', "123456"); 
  this.body.set('cpassword',"123456"); 
  this.body.set('access_token', ""); 
  this.body.set('id_token', ""); 
  this.body.set('imageidcard',"1234"); //บัตรประชาชน
  this.body.set('imageidcardconfirmation', "1234");  //บัตรประชาชน พร้อม เขียนข้อความ 
  this.body.set('imgagehomeregistration', "1234"); //ทะเบียนบ้าน
  this.body.set('imgagabnkaccount', "1234"); //สมุทรบัญชี
return this.httpClient.post('http://localhost:3000/api/account/register', this.body.toString(), PramoonRegisteroptions)
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



