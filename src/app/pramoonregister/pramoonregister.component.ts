import { Component, OnInit } from '@angular/core';

import { RestService } from '../rest.service';
import {Router,ActivatedRoute,Params} from "@angular/router"; 
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import {DomSanitizer} from '@angular/platform-browser';
 

@Component({
  selector: 'app-pramoonregister',
  templateUrl: './pramoonregister.component.html',
  styleUrls: ['./pramoonregister.component.scss']
})
export class PramoonregisterComponent implements OnInit {
  image:any;
  objimageprofile:Array<any> = [];
  arrayfile:Array<File> = [];
  arrayPathfile:Array<String> = [];



  
  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;
  status_pramoon_register:string;
  resultFile:any;

  image1:any;
  image2:any;
  image3:any;
  image4:any;

  temp_path_image1:any;
  temp_path_image2:any;
  temp_path_image3:any;
  temp_path_image4:any;
  
  constructor(private router: Router,private apiService:RestService,private sanitizer:DomSanitizer,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.status_pramoon_register = localStorage.getItem("status_pramoon_register");
    if(this.status_pramoon_register){ 
        this.router.navigate(['/list/two'])  
    } 
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
     
   
    this.arrayPathfile=[];
    for (let index = 0; index < 4; index++) { 
        this.apiService.uploadimage(this.arrayfile[index]).then((response) => {   
        this.resultFile = response; 
        this.arrayPathfile.push(this.resultFile.imageUrl);  
          
        if(this.arrayPathfile.length == 4)
            { 
                localStorage.setItem("email", data.email); 
                data.userId = localStorage.getItem("userId"); 
                data.access_token = localStorage.getItem("access_token");
                data.id_token = localStorage.getItem("id_token"); 
                this.apiService.PramoonRegister(data,this.arrayPathfile).then((response) => {  
                  console.log(data)   
                  this.router.navigate(['/list/two'])   
                  setTimeout(() => { 
                    this.spinner.hide();
                  }, 1000);
                });    
            } 
       });   
      } 
    }, 3000);



 
  }

 
}
