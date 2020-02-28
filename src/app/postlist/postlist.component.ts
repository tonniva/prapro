import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {
  image:any;
  constructor() { }

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
      //รูปที่ได้
    }
    myReader.readAsDataURL(file);
  }
}
