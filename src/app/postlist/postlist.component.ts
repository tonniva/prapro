import { Component, OnInit } from '@angular/core'; 
import { RestService } from '../rest.service'; 
import {Router,ActivatedRoute,Params} from "@angular/router"; 
import { NgxSpinnerService } from "ngx-spinner";

 
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {
  image:any;
  objimage:Array<any> = [];



  constructor(private router: Router,private apiService:RestService,private spinner: NgxSpinnerService) { }
email:any;
token:any; 
arrayfile:Array<File> = [];
arrayPathfile:Array<String> = [];
resultFile:any;

  ngOnInit(): void { 
    
    // if()
    // this.email = localStorage.getItem("email");
    // this.apiService.logingetToken(this.email).then((response:any) => {  
    
    //   this.token = response.accessToken;
    //   localStorage.setItem("logintoken",this.token);   
    // });   
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
      this.arrayfile.push(file);
      //รูปที่ได้
    }
    myReader.readAsDataURL(file);
  }
  

  onClickSubmit(data) {  
    this.spinner.show();
    this.arrayPathfile =[];
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
      
    
  }

  postpra(data){

    setTimeout(() => {
      localStorage.setItem("email", data.email); 
      data.access_token = localStorage.getItem("access_token");
      data.id_token = localStorage.getItem("userId"); 
      data.status_pramoon_check = "checking"; 
      
      this.apiService.postpramoon(data,this.arrayPathfile,this.token).then((response) => {   
        console.log(response)  
        setTimeout(() => { 
          this.spinner.hide();
        }, 5000);
        window.location.href = window.location.origin+'/list/one';
        // this.router.navigate(['/list/one'])   
      }); 
    
    }, 1000); 
  }
  
  
  
}
