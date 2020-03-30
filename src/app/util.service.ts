import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { } 


  Getweb(){
    //for test
    // return "http://localhost:4200/home";  
    //for test
    //production
     return "https://web-pra.firebaseapp.com/home";  
    //production
  }
  GetAPIurl(){
      return "https://pro-nestjs.herokuapp.com"; 
  } 
  GetAPIuploadUrl(){ 
     return "http://uploadfile.ap-southeast-1.elasticbeanstalk.com";  
  }

  
}

 