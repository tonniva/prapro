import { Component, OnInit } from '@angular/core';

import { RestService } from '../rest.service';
import {Router,ActivatedRoute,Params} from "@angular/router"; 
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

 

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
  constructor(private router: Router,private apiService:RestService) { }

  ngOnInit(): void {
    this.status_pramoon_register = localStorage.getItem("status_pramoon_register");
    if(this.status_pramoon_register){ 
      this.router.navigate(['/list/two'])  
    } 
  }


  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void { 
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
 
 

    myReader.onloadend = (e) => {
     
      //รูปที่ได้ 
     this.image = myReader.result; 
    
      this.objimageprofile.push(this.image); 
      this.arrayfile.push(file);
      //รูปที่ได้
      // this.startUpload();
    }
    myReader.readAsDataURL(file);
  }

  onClickSubmit(data) {  
    this.arrayPathfile=[];
for (let index = 0; index < this.arrayfile.length; index++) { 
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
    });   
  
 

}

       });   
}





     
  //  for (let index = 0; index < this.arrayfile.length; index++) { 
 
  //   this.apiService.uploadimage(this.arrayfile[index])

  //     this.apiService.uploadimage(this.inputValue.files[0]).then((response) => { 
     
   
  //     console.log(data) 

  //     this.router.navigate(['/list/two'])   
  //   });   

  //  }

    
  }

 
}
