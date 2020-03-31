import { Component, OnInit } from '@angular/core'; 
import { RestService } from '../rest.service'; 
import {Router,ActivatedRoute,Params} from "@angular/router"; 
import { NgxSpinnerService } from "ngx-spinner";
import {DomSanitizer} from '@angular/platform-browser';
 
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {
  image:any;
  objimage:Array<any> = [];

  image1:any;
  image2:any;
  image3:any;
  image4:any;

  temp_path_image1:any;
  temp_path_image2:any;
  temp_path_image3:any;
  temp_path_image4:any;

 



  constructor(private router: Router,private apiService:RestService,private spinner: NgxSpinnerService,private sanitizer:DomSanitizer) { }
    email:any;
    token:any; 
    arrayfile:Array<File> = [];
    arrayPathfile:Array<String> = [];
    resultFile:any;

  ngOnInit(): void { 
   
    window.scrollTo(0,0);
    // if()
    // this.email = localStorage.getItem("email");
    // this.apiService.logingetToken(this.email).then((response:any) => {  
    
    //   this.token = response.accessToken;
    //   localStorage.setItem("logintoken",this.token);   
    // });    


   
  }

  
  
  changeListener_one($event) : void { 
    this.image1 =  this.readThis($event.target); 
    this.temp_path_image1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image1));  
  }
  changeListener_two($event) : void { 
    this.image2 =   this.readThis($event.target);
    this.temp_path_image2 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image2));  
  }
  changeListener_three($event) : void { 
    this.image3 =   this.readThis($event.target);
    this.temp_path_image3 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image3));  
  }
  changeListener_four($event) : void { 
    this.image4 =  this.readThis($event.target);
    this.temp_path_image4 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image4));  
  }
  
  readThis(inputValue: any) { 
    var file:File = inputValue.files[0];
    return file;
    
  }
  

  onClickSubmit(data) {  
    this.spinner.show();
    this.arrayfile[0] =this.image1;
    this.arrayfile[1] =this.image2;
    this.arrayfile[2] =this.image3;
    this.arrayfile[3] =this.image4;

    setTimeout(() => { 
      for (let index = 0; index < this.arrayfile.length; index++) {
        this.apiService.uploadimage(this.arrayfile[index]).then((response) => {   
        this.resultFile = response; 
        this.arrayPathfile.push(this.resultFile.imageUrl); 
        if( this.arrayPathfile.length == 4 )
        { 
          this.postpra(data);
        } 
       });   

       if( this.arrayPathfile.length == 4 ) break;
}
    }, 3000);
    this.arrayPathfile =[];

  
      
    
  }

  postpra(data){

    setTimeout(() => {

     
    

      localStorage.setItem("email", data.email); 
      data.access_token = localStorage.getItem("access_token");
      data.id_token = localStorage.getItem("userId"); 
      data.Latitude =   localStorage.getItem("Latitude");
      data.Longitude = localStorage.getItem("Longitude");
      data.status_pramoon_check = "checking"; 
      
      this.apiService.postpramoon(data,this.arrayPathfile,this.token).then((response) => {   
        console.log(response)  
        setTimeout(() => { 
          this.spinner.hide();
        }, 1000);
        window.location.href = window.location.origin+'/list/one';
        // this.router.navigate(['/list/one'])   
      }); 
    
    }, 1000); 
  }
  
  

  
  
  
}
