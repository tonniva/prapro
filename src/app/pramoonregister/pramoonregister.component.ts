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
  arrayfile:Array<any> = [];



  
  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  resultFile:any;
  constructor(private router: Router,private apiService:RestService) { }

  ngOnInit(): void { 
  }


  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void { 
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
 
   this.apiService.uploadimage(file).then((response) => { 
     
    this.resultFile = response;
         console.log(response)  
       });   

    myReader.onloadend = (e) => {
     
      //รูปที่ได้ 
     this.image = myReader.result; 
    
      this.objimageprofile.push(this.image); 
      this.arrayfile.push(this.resultFile.url);
      //รูปที่ได้
      // this.startUpload();
    }
    myReader.readAsDataURL(file);
  }

  onClickSubmit(data) {  
    localStorage.setItem("email", data.email); 
    data.access_token = localStorage.getItem("access_token");
    data.id_token = localStorage.getItem("id_token");
 
    this.apiService.PramoonRegister(data,this.arrayfile).then((response) => { 
     
   
      console.log(data) 

      this.router.navigate(['/list/two'])   
    });   

     
  //  for (let index = 0; index < this.arrayfile.length; index++) { 
  //   debugger
  //   this.apiService.uploadimage(this.arrayfile[index])

  //     this.apiService.uploadimage(this.inputValue.files[0]).then((response) => { 
     
   
  //     console.log(data) 

  //     this.router.navigate(['/list/two'])   
  //   });   

  //  }

    
  }

 
}
