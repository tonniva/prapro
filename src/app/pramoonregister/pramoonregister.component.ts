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



  
  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;


  constructor(private router: Router,private apiService:RestService) { }

  ngOnInit(): void { 
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
      //รูปที่ได้
      // this.startUpload();
    }
    myReader.readAsDataURL(file);
  }

  onClickSubmit(data) { 
    debugger 
    localStorage.setItem("email", data.email); 
    data.access_token = localStorage.getItem("access_token");
    data.id_token = localStorage.getItem("id_token");
 
    this.apiService.PramoonRegister(data,this.objimageprofile).then((response) => { 
     
   
      console.log(data) 

      this.router.navigate(['/list/two'])   
    });   
  }


  // upload(item){
  //   window.location.replace('https://objective-johnson-0d553e.netlify.com/?'+item);
  // }

  // startUpload() {
  //   debugger

  //   // The storage path
  //   const path = `test/${Date.now()}_${this.image.name}`;

  //   // Reference to storage bucket
  //   const ref = this.storage.ref(path);

  //   // The main task
  //   this.task = this.storage.upload(path, this.image);

  //   // Progress monitoring
  //   this.percentage = this.task.percentageChanges();

  //   this.snapshot   = this.task.snapshotChanges().pipe(
  //     tap(console.log),
  //     // The file's download URL
  //     finalize( async() =>  {
  //       this.downloadURL = await ref.getDownloadURL().toPromise();

  //       this.db.collection('files').add( { downloadURL: this.downloadURL, path });
  //     }),
  //   );
  // }
}
