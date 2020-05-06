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
  dataAccessTokensLine:any;
  dataAccessTokensLineNoti:any;
  constructor(private httpClient: HttpClient,private UtilService:UtilService) { } 
 

options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};
optionsGetProfile = {
  headers: new HttpHeaders().set('Authorization', 'Bearer')
};


 
 body = new URLSearchParams();



  

  GetAccessTokensLine(code:any){   
    this.dataAccessTokensLine = {
      "grant_type":"authorization_code",
      "code":"",
      "redirect_uri":this.UtilService.Getweb(),
      "client_id":this.UtilService.client_id(), 
      "client_secret":this.UtilService.GetSecretCode(),
      }

    if(window.location.port != "4200"){
 
      localStorage.getItem("SECRET_CODE");
      localStorage.getItem("CLIENT_ID");
      localStorage.getItem("WEB_URL");

      this.dataAccessTokensLine = {
        "grant_type":"authorization_code",
        "code":"",
        "redirect_uri":localStorage.getItem("WEB_URL"),
        "client_id":localStorage.getItem("CLIENT_ID"), 
        "client_secret":localStorage.getItem("SECRET_CODE"),
        }
      
    }

    this.body.set('grant_type', this.dataAccessTokensLine.grant_type);
    this.body.set('code', code);
    this.body.set('redirect_uri', this.dataAccessTokensLine.redirect_uri);
    this.body.set('client_id', this.dataAccessTokensLine.client_id);
    this.body.set('client_secret', this.dataAccessTokensLine.client_secret); 
  return this.httpClient.post('https://api.line.me/oauth2/v2.1/token', this.body.toString(), this.options)
  .toPromise()
  .then((response) => response);
 }


 GetAccessTokensLineNotify(code:any){    
 
  const options_line_Noti = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };  
  
  this.dataAccessTokensLineNoti = {
    "grant_type":"authorization_code",
    "code":code,
    "redirect_uri":this.UtilService.redirect_uri_line_noti(),
    "client_id":this.UtilService.client_id_line_noti(), 
    "client_secret":this.UtilService.client_secret_line_noti(),
    }

  if(window.location.port != "4200"){

  
    localStorage.getItem("REDIRECT_URL_LINE_NOTI");
    localStorage.getItem("CLIENT_ID_LINE_NOTI");
    localStorage.getItem("CLIENT_SECRET_LINE_NOTI"); 
    

    this.dataAccessTokensLineNoti = {
      "grant_type":"authorization_code",
      "code":"",
      "redirect_uri":localStorage.getItem("REDIRECT_URL_LINE_NOTI"),
      "client_id":localStorage.getItem("CLIENT_ID_LINE_NOTI"), 
      "client_secret":localStorage.getItem("CLIENT_SECRET_LINE_NOTI")
      }
    
  }
 
    
  var url = "/get-noti-token?grant_type=authorization_code&code="+code+"&redirect_uri="+this.dataAccessTokensLineNoti.redirect_uri+"&client_id="+this.dataAccessTokensLineNoti.client_id+"&client_secret="+this.dataAccessTokensLineNoti.client_secret;
return this.httpClient.get(this.UtilService.GetAPIuploadUrl()+url)
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
  this.body.set('bankname', item.bankname);
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
  this.body.set('diffdate', item.diffdate);

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
  
  this.body.set('typewebsite', item.typewebsite);
  this.body.set('pricestart', item.pricestart);
  this.body.set('quota', item.quota); 
  this.body.set('pricesell', item.pricesell);
  this.body.set('date',(new Date()).toString());
  this.body.set('dateend',item.dateend);
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
  this.body.set('ip',item.ip);   

  this.body.set('pictureUrl',item.pictureUrl);   
  this.body.set('displayName',item.displayName);   


  this.body.set('product_header',item.product_header);   
  this.body.set('product_picture',item.product_picture);   
  this.body.set('product_list_detail',item.product_list_detail);   
  this.body.set('slide_picture',item.slide_picture);   


  this.body.set('line',item.lineid);   
  this.body.set('facebook',item.facebooklink);   
  this.body.set('linenotifytoken',item.linenotify);   
  this.body.set('facebookpixelkey',item.facebookpixel);   
  this.body.set('tel',item.telsale);   
  this.body.set('shopee',item.shopeelink);   
  this.body.set('lazada',item.lazadalink);
  
  this.body.set('bank_BBL',item.bank_BBL);   
  this.body.set('bank_KBANK',item.bank_KBANK);   
  this.body.set('bank_SCB',item.bank_SCB);   
  this.body.set('bank_KTB',item.bank_KTB);   
  

  // this.UtilService.GetAPIurl()+
 
return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/pramoon/pramooncreate', this.body.toString(), PramoonRegisteroptions)
.toPromise()
.then((response) => response);
}

itemgetdetailRegister= {
  "userId":""
  }

  itemupbill= {
    "userId":"",
    "bill_product_level":"",
    "bill_type":"",
    "billurl":"",
    "bill_date":"",
    "bill_status":"",
    "bill_description":"",
    "bill_customer_detail":"",
    "bill_price":"",
    "bill_date_total":""
    
    }
  updatebill(_id:string,data:any){
    const PramoonRegisteroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };   
  this.itemupbill.userId = _id.toString();  
  this.itemupbill.bill_product_level = "";  
  this.itemupbill.bill_type = data.type;
  this.itemupbill.billurl = data.imageThumbnail;
  this.itemupbill.bill_date = (new Date()).toString();
  this.itemupbill.bill_status = "กำลังตรวจสอบ";
  this.itemupbill.bill_description = data.description 
  this.itemupbill.bill_customer_detail = data.message; 
  this.itemupbill.bill_price = data.bill_price;  
  
  
  // this.UtilService.GetAPIurl()+
  return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/account/update-bill',this.itemupbill
  ,PramoonRegisteroptions)
  .toPromise()
  .then((response) => response); 
  }


  itemup_approve_bill= {
    "userId":"", 
    "bill_status":"",
    "bill_date_total_active":"", 
    
    }
    update_approve_bill(_id:string,data:any){
    const PramoonRegisteroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };   
  this.itemup_approve_bill.userId = _id.toString();  
  this.itemup_approve_bill.bill_date_total_active = data.bill_date_total_active;
  this.itemup_approve_bill.bill_status = "จ่ายแล้ว" 
    
  return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/account/update-approve-bill',this.itemup_approve_bill
  ,PramoonRegisteroptions)
  .toPromise()
  .then((response) => response); 
  }


  

  itemupbillexpire= {
    "userId":"", 
    "bill_status":"" 
    
    }
  updatebillexpire(_id:string){
    const PramoonRegisteroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };   
  this.itemupbill.userId = _id.toString();   
  this.itemupbill.bill_status = "หมดอายุ"; 
  
  
  // this.UtilService.GetAPIurl()+
  return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/account/update-billexpire',this.itemupbill
  ,PramoonRegisteroptions)
  .toPromise()
  .then((response) => response); 
  }

  
  itemupshortlink= {
    "userId":"", 
    "short_link":""  
    }
  updateshortlink(_id:string,short_link){
    const PramoonRegisteroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };   
  this.itemupshortlink.userId = _id.toString();   
  this.itemupshortlink.short_link = short_link ; 
  
  
  // this.UtilService.GetAPIurl()+
  return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/account/update-shortlink',this.itemupshortlink
  ,PramoonRegisteroptions)
  .toPromise()
  .then((response) => response); 
  }

  
  
getdetailRegister(userId:any){
   
  const PramoonRegisteroptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json') 
  };  
// ต้องใช้ Token login
this.itemgetdetailRegister.userId = userId.toString();  
return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/account/getprofileregister', this.itemgetdetailRegister,PramoonRegisteroptions)
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

 GetShotLinkAPI(token_short_link,long_url){ 
  return this.httpClient.get('https://api-ssl.bitly.com/v3/shorten?access_token='+token_short_link+'&longUrl='+long_url)
  .toPromise()
  .then((response) => response);
 }


  Getconfig(){    
     return this.httpClient.get('https://mighty-ocean-48427.herokuapp.com/detail')
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


  itemupdateBuy= {
    "user":"",
    "bought":""
    }
  updateBuy(_id:string,countbuyproduct:any){
    const PramoonRegisteroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };   
  this.itemupdateBuy.user = _id.toString();  
  this.itemupdateBuy.bought = countbuyproduct;   
  
  return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/pramoon/update-buy',this.itemupdateBuy
  ,PramoonRegisteroptions)
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
  this.itemupdate.priceend = priceBid;  
  this.itemupdate.pramoonperson = pramoonperson;
  this.itemupdate.status = status;
  
  
  return this.httpClient.post(this.UtilService.GetAPIurl()+'/api/pramoon/update-pramoonlistbydetail',this.itemupdate
  ,PramoonRegisteroptions)
  .toPromise()
  .then((response) => response); 
  }




  itemedit= {
    "user":"",
    "pricestart":"",
    "pricesell":"", 
    "description":"",
    "dateend":"", 
    "imageone":"",
    "imagetwo":"",
    "imagethree":"",
    "imagefour":"", 
    "updated":""
    }
 editpramoodetail(detail:any,arrayPathfile:any){
    const PramoonRegisteroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };   
 this.itemedit.user = detail._id.toString();  
  this.itemedit.pricestart = detail.pricestart.toString();  
  this.itemedit.pricesell = detail.pricesell.toString();  
  this.itemedit.description = detail.description.toString();  
  this.itemedit.imageone = arrayPathfile[0];
  this.itemedit.imagetwo = arrayPathfile[1];
  this.itemedit.imagethree = arrayPathfile[2];
  this.itemedit.imagefour = arrayPathfile[3]; 
  this.itemedit.dateend = detail.dateEnd;  
  this.itemedit.updated = new Date().toString();
  
  // this.UtilService.GetAPIurl()+
  return this.httpClient.post( this.UtilService.GetAPIurl()+'/api/pramoon/edit-order-detail',this.itemedit
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
 
    bill= {
    "message":"",
    "imageThumbnail":"",
    "imageFullsize":"",
    "token":""
    } 
    linenotifyPaybill(data:any){   
      const option = {
        headers: new HttpHeaders().set('Content-Type','application/json')
      };    
      this.bill.message = data.message; 
      this.bill.imageThumbnail = data.imageThumbnail; 
      this.bill.imageFullsize = data.imageThumbnail; 
      this.bill.token = data.linetoken;
      

      return this.httpClient.post(this.UtilService.GetAPIuploadUrl()+'/noti', this.bill,option)
       .toPromise()
       .then((response) => response);
      }
      
      
}



