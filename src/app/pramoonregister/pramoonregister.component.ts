import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import {Router,ActivatedRoute,Params} from "@angular/router"; 

@Component({
  selector: 'app-pramoonregister',
  templateUrl: './pramoonregister.component.html',
  styleUrls: ['./pramoonregister.component.scss']
})
export class PramoonregisterComponent implements OnInit {
  image:any;
  objimageprofile:Array<any> = [];
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
    }
    myReader.readAsDataURL(file);
  }

  onClickSubmit(data) { 
    data.access_token = localStorage.getItem("access_token");
    data.id_token = localStorage.getItem("id_token");
    this.apiService.PramoonRegister(data,this.objimageprofile).then((response) => {  
      console.log(data) 
      this.router.navigate(['/list/two'])   
    });   
  }
}
