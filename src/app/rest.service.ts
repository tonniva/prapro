import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class RestService { 
  constructor(private httpClient: HttpClient) { } 

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



