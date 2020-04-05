

import { Component, OnInit } from '@angular/core'; 
import { RestService } from '../rest.service'; 
import {Router,ActivatedRoute,Params} from "@angular/router"; 
import { NgxSpinnerService } from "ngx-spinner";
import {DomSanitizer} from '@angular/platform-browser'; 
import Swal from 'sweetalert2'
  
@Component({
  selector: 'app-editorderpost',
  templateUrl: './editorderpost.component.html',
  styleUrls: ['./editorderpost.component.scss']
})
export class EditorderpostComponent implements OnInit {
  image:any;
  objimage:Array<any> = [];

  image1:any;
  image2:any;
  image3:any;
  image4:any;

  temp_path_image1:any;
  temp_path_image2:any;
  temp_path_image3:any;
  temp_path_image4:any;

 
  index_list_select:any;
  id_token :any;
  listdetail  :any;


  constructor(private route: ActivatedRoute,private router: Router,private apiService:RestService,private spinner: NgxSpinnerService,private sanitizer:DomSanitizer) { }
    email:any;
    token:any; 
    arrayfile:Array<File> = [];
    arrayPathfile:Array<String> = [];
    resultFile:any;

  ngOnInit(): void { 
    this.Getdetail();
    window.scrollTo(0,0);
 
   
  }

  
  
  changeListener_one($event) : void { 
    this.image1 =  this.readThis($event.target); 
    this.temp_path_image1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image1));  
  }
  changeListener_two($event) : void { 
    this.image2 =   this.readThis($event.target);
    this.temp_path_image2 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image2));  
  }
  changeListener_three($event) : void { 
    this.image3 =   this.readThis($event.target);
    this.temp_path_image3 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image3));  
  }
  changeListener_four($event) : void { 
    this.image4 =  this.readThis($event.target);
    this.temp_path_image4 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image4));  
  }
  
  readThis(inputValue: any) { 
    var file:File = inputValue.files[0];
    return file;
    
  }
  

  onClickSubmit(data) {  
     
    this.spinner.show();
    this.arrayfile[0] =this.image1;
    this.arrayfile[1] =this.image2;
    this.arrayfile[2] =this.image3;
    this.arrayfile[3] =this.image4;

    if(this.arrayfile){
 
    setTimeout(() => { 
      for (let index = 0; index < this.arrayfile.length; index++) {
        if(typeof(this.arrayfile[index])  === 'undefined' ){ 
          break;
        } 
        this.apiService.uploadimage(this.arrayfile[index]).then((response) => {   
        this.resultFile = response; 
        this.arrayPathfile[index] = this.resultFile.imageUrl;  
       
       });   
      }
    }, 1000);

    setTimeout(() => {
      setTimeout(() => { 
        this.spinner.hide();
      }, 1000); 
     
      Swal.fire({
        title: 'คุณต้องการแก้ไขข้อมูล ใช่หรือไม่',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText:'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.spinner.show();
          this.postpra(data); 
        }
      }) 
   
  }, 8000);
  }
    

  
      
    
  }

  postpra(data){
     
    setTimeout(() => { 
      data._id = this.listdetail._id;
      this.apiService.editpramoodetail(data,this.arrayPathfile).then((response) => {   
        setTimeout(() => { 
          this.spinner.hide();
        }, 0);

        Swal.fire(
          'สำเร็จ !',
          'ขอบคุณครับ',
          'success'
        )
  
        setTimeout(() => { 
          window.location.href = window.location.href;
        }, 2000);
     
        // this.router.navigate(['/list/one'])   
      }); 
    
    }, 1000); 
  }
  


  Getdetail(){
    this.spinner.show();
    this.index_list_select = this.route.snapshot.paramMap.get("indexlistselect");
    this.id_token = this.route.snapshot.params.id_token; 
     this.apiService.getlistdetail(this.id_token).then((response) => {
       
      this.listdetail =  response
      for (let index = 0; index < this.listdetail.length; index++) {
        if(this.listdetail[index]._id == this.index_list_select){ 
         this.listdetail = response[index]; 
         break;
        } 
      }  
    
 
      this.temp_path_image1=this.listdetail.imageone;
      this.temp_path_image2=this.listdetail.imagetwo;
      this.temp_path_image3=this.listdetail.imagethree;
      this.temp_path_image4=this.listdetail.imagefour;
      
      this.arrayPathfile[0] =this.listdetail.imageone;
      this.arrayPathfile[1] =this.listdetail.imagetwo;
      this.arrayPathfile[2] =this.listdetail.imagethree;
      this.arrayPathfile[3] =this.listdetail.imagefour;


      setTimeout(() => { 
        this.spinner.hide();
      }, 5000); 
     
    }); 

  }
  

  
  
  
}

