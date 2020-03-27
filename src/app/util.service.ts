import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { } 


  Getweb(){
     return "http://localhost:4200/home"; 
  }
  GetAPIurl(){
      return "https://pro-nestjs.herokuapp.com"; 
  } 
  GetAPIuploadUrl(){ 
     return "http://uploadfile.ap-southeast-1.elasticbeanstalk.com";  
  }

  
}

 