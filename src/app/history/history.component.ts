import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private apiService: RestService) { }
  list:any;

  ngOnInit(): void {
    this.apiService.getlist().then((response) => {this.list = response,console.log(this.list)}); 

  }

  
}
