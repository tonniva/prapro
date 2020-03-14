import { Component, OnInit } from '@angular/core'; 
import { RestService } from '../rest.service';

 
 
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {
  image:any;
  objimage:Array<any> = [];



  constructor(private apiService:RestService) { }
email:any;
token:any; 
  ngOnInit(): void {
    debugger
    this.email = localStorage.getItem("email");
    this.apiService.logingetToken(this.email).then((response:any) => {  
    
      this.token = response.accessToken;
      localStorage.setItem("logintoken",this.token); 
     
      // this.router.navigate(['/list/two'])   
    });   
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
    
      this.objimage.push(this.image);
      //รูปที่ได้
    }
    myReader.readAsDataURL(file);
  }
  

  onClickSubmit(data) {  
    debugger
    this.apiService.postpramoon(data,this.objimage,this.token).then((response) => {  
      debugger
      console.log(data) 
      // this.router.navigate(['/list/two'])   
    });   
    // this.apiService.PramoonRegister(data).then((response) => {  
    //   console.log(data) 
    //   this.router.navigate(['/list/two'])   
    // });   
  }
  uploadimage(){
    
    window.location.replace("http://localhost:4201/");

  }
 
}
