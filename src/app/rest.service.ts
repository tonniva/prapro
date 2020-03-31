import { Injectable } from '@angular/core';  
import {Http, Headers} from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'; 
import { analytics } from 'firebase';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class RestService { 

  constructor(private httpClient: HttpClient,private UtilService:UtilService) { } 
 

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
    "redirect_uri":this.UtilService.Getweb(),
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
  this.body.set('userId', item.userId);
  this.body.set('firstname', item.firstname);
  this.body.set('lastname', item.lastname);
  this.body.set('email', item.email);
  this.body.set('tel', item.tel);
  this.body.set('bankaccount', item.bankaccount); 
  this.body.set('password', "123456"); 
  this.body.set('cpassword',"123456"); 
  this.body.set('access_token', item.access_token); 
  this.body.set('id_token', item.id_token); 
  this.body.set('imageidcard',file[0]); //บัตรประชาชน
  this.body.set('imageidcardconfirmation', file[1]);  //บัตรประชาชน พร้อม เขียนข้อความ 
  this.body.set('imgagehomeregistration', file[2]); //ทะเบียนบ้าน
  this.body.set('imgagabnkaccount', file[3]); //สมุทรบัญชี
  this.body.set('status_pramoon_register', "waitingcheck");

  localStorage.setItem("status_pramoon_register","waitingcheck"); 

return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/account/register', this.body.toString(), PramoonRegisteroptions)
.toPromise()
.then((response) => response);
}




uploadimage(profileImage:File){  
  
const formData = new FormData();
formData.append('image', profileImage);
return this.httpClient.post(this.UtilService.GetAPIuploadUrl()+'/upload/image-upload', formData)
 .toPromise()
 .then((response) => response);
}


 



postpramoon(item:any,file:any,token:any){  
      // ต้องใช้ Token login
  const PramoonRegisteroptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Bearer '+token)
  };  
  this.body.set('pricestart', item.pricestart);
  this.body.set('priceend', "");
  this.body.set('date',(new Date()).toString());
  this.body.set('dateend',item.dateEnd);
  this.body.set('description', item.description); 
  this.body.set('imageone',file[0]); //บัตรประชาชน
  this.body.set('imagetwo', file[1]);  //บัตรประชาชน พร้อม เขียนข้อความ 
  this.body.set('imagethree', file[2]); //ทะเบียนบ้าน
  this.body.set('imagefour', file[3]); //สมุทรบัญชี
  this.body.set('id_token', item.id_token); 
  this.body.set('status', ""); 
  this.body.set('lastbit', ""); 
  this.body.set('condition', "");  
  this.body.set('type', item.type);  
  this.body.set('status_pramoon_permission',"waitingcheck");  
  this.body.set('status_pramoon_check',item.status_pramoon_check);  
  this.body.set('Latitude',item.Latitude);  
  this.body.set('Longitude',item.Longitude);   
  // this.UtilService.GetAPIurl()+
return this.httpClient.post('http://localhost:3000/api/pramoon/pramooncreate', this.body.toString(), PramoonRegisteroptions)
.toPromise()
.then((response) => response);
}

itemgetdetailRegister= {
  "userId":""
  }
  
getdetailRegister(userId:any){
  const PramoonRegisteroptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };  
// ต้องใช้ Token login
this.itemgetdetailRegister.userId = userId.toString();  
return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/account/getprofileregister', this.itemdatadetail,PramoonRegisteroptions)
.toPromise()
.then((response) => response); 
}



itemdata= {
  "email":"",
  "password":""
  }
logingetToken(email:any){ 
   
  // ต้องใช้ Token login
const PramoonRegisteroptions = {
headers: new HttpHeaders().set('Content-Type', 'application/json')
};  

this.itemdata.email = email;
this.itemdata.password = "123456"; 

return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/account/login', this.itemdata, PramoonRegisteroptions)
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
    
     return this.httpClient.get(this.UtilService.GetAPIurl()+'/api/pramoon/pramoonlist')
     .toPromise()
     .then((response) => response);
   }
 
  
  itemdatadetail= {
    "id_token":""
    }
  getlistdetail(pram_id_token:any){
    const PramoonRegisteroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };  
  // ต้องใช้ Token login
  this.itemdatadetail.id_token = pram_id_token.toString();  
  return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/pramoon/pramoonlistbydetail', this.itemdatadetail,PramoonRegisteroptions)
  .toPromise()
  .then((response) => response); 
  }


  itemupdate= {
    "user":"",
    "priceend":"",
    "pramoonperson":"",
    "status":""
    }
  updatepramoodetail(_id:string,priceBid:any,pramoonperson:any,status:string){
    const PramoonRegisteroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };   
  this.itemupdate.user = _id.toString();  
  this.itemupdate.priceend = priceBid.toString();  
  this.itemupdate.pramoonperson = pramoonperson;
  this.itemupdate.status = status;
  
  
  return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/pramoon/update-pramoonlistbydetail',this.itemupdate
  ,PramoonRegisteroptions)
  .toPromise()
  .then((response) => response); 
  }

  itemupdatecheckpra= {
    "user":"",
    "count_pra_true":"",
    "count_pra_false":"",
    "count_pra_criminals":"",
    "status_pramoon_check":""
    }
  updatecheckpra(_id:string,data:any){
    const PramoonRegisteroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };   
  this.itemupdatecheckpra.user = _id.toString();  
  this.itemupdatecheckpra.count_pra_true = data.count_pra_true;  
  this.itemupdatecheckpra.count_pra_false = data.count_pra_false;
  this.itemupdatecheckpra.count_pra_criminals = data.count_pra_criminals; 
  this.itemupdatecheckpra.status_pramoon_check = data.status_check;
   
  return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/pramoon/update-updatecheckpra',this.itemupdatecheckpra
  ,PramoonRegisteroptions)
  .toPromise()
  .then((response) => response); 
  }

}



