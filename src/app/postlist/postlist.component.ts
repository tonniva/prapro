import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { UtilService } from '../util.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {
  image:any;
  objimage:Array<any> = [];

  constructor(private Util:UtilService,private apiService:RestService) { }

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
    
      this.objimage.push(this.image);
      //รูปที่ได้
    }
    myReader.readAsDataURL(file);
  }
  

  onClickSubmit(data) { 
    debugger
    this.apiService.postpramoon(data,this.objimage).then((response) => {  
      console.log(data) 
      // this.router.navigate(['/list/two'])   
    });   
    // this.apiService.PramoonRegister(data).then((response) => {  
    //   console.log(data) 
    //   this.router.navigate(['/list/two'])   
    // });   
  }
}
