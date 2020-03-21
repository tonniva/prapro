import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listdetail:any
  GetProfilelist:any;
  pictureUrl:any;
  constructor(private apiService: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {    
    const code: string = this.route.snapshot.queryParamMap.get('code');
    if(typeof(code)!=undefined){
      this.apiService.GetAccessTokensLine(code).then((response) => {this.listdetail = response, 
        
        console.log(this.listdetail)
         debugger 
        localStorage.setItem("access_token", this.listdetail.access_token);
        localStorage.setItem("id_token", this.listdetail.id_token);
        this.GetProfile(this.listdetail.access_token) 
      });  

     
    }

   
  }

  GetProfile(access_token){ 
    this.apiService.GetProfile(access_token).then((response) => {this.GetProfilelist = response });  

  }
}
