import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import {Router,ActivatedRoute,Params} from "@angular/router"; 

@Component({
  selector: 'app-pramoonregister',
  templateUrl: './pramoonregister.component.html',
  styleUrls: ['./pramoonregister.component.scss']
})
export class PramoonregisterComponent implements OnInit {

  constructor(private router: Router,private apiService:RestService) { }

  ngOnInit(): void {
  }
  onClickSubmit(data) { 
    this.apiService.PramoonRegister(data).then((response) => {  
      console.log(data) 
      this.router.navigate(['/list/two'])   
    });   
  }
}
