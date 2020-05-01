import { Component, OnInit } from '@angular/core'; 
import { RestService } from '../rest.service'; 
import {Router,ActivatedRoute,Params} from "@angular/router"; 
import { NgxSpinnerService } from "ngx-spinner";
import {DomSanitizer} from '@angular/platform-browser';
import {UtilService} from '../util.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import Swal from 'sweetalert2'
declare let $: any;
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {
  image:any;
  objimage:Array<any> = [];

  image1:any;
  image2:any;
  image3:any;
  image4:any;
  image5:any;

  temp_path_image1:any;
  temp_path_image2:any;
  temp_path_image3:any;
  temp_path_image4:any;
  temp_path_image5:any;

  model: any = {};

  constructor(private ng2ImgMax: Ng2ImgMaxService,
    private UtilService :UtilService, 
    private router: Router,
    private apiService:RestService,
    private spinner: NgxSpinnerService,
    private sanitizer:DomSanitizer) { }
   
    email:any;
    token:any; 
    arrayfile:Array<File> = [];
    arrayPathfile:Array<String> = [];
    image_header:File;
    path_header:string;


    arrayfile_slide:Array<File> = [];
    arrayPathfile_slide:Array<String> = [];
    arrayPathfile_slide_Posted:Array<String> = [];

    arrayfile_product:Array<File> = [];
    arrayPathfile_product:Array<String> = [];
    arrayPathfile_product_Posted:Array<String> = [];

    resultFile:any;

    resultFilebase64:any;
    resultProductFilebase64:any;
    public line:string="";


  ngOnInit(): void {  
    window.scrollTo(0,0); 
    setTimeout(() => { 
      this.spinner.hide();
    }, 0);
  }
 

  //รูป HEADER
  changeListener_one($event) : void { 
    this.image1 =  this.readThis($event.target); 
    this.temp_path_image1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image1));  
      
    this.ng2ImgMax.resizeImage(this.image1, 1000, 1000).subscribe(
      result => {
        this.image_header = result; 
        setTimeout(() => {
          Swal.fire({
            title: 'บันทึก รูป Header ใช่หรือไม่',
            text: "",
            imageUrl:this.temp_path_image1.changingThisBreaksApplicationSecurity,    
            imageHeight: 100,
            imageAlt: 'Custom image',  
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'บันทึกเรียบร้อย!',
                showConfirmButton: false,
                timer: 1500
              })
              this.apiService.uploadimage(this.image_header).then((response) => {   
                this.resultFile = response; 
                this.path_header = this.resultFile.imageUrl;
               
               }); 
            }
            else{
              this.image1="";
              this.temp_path_image1="";
            }
          })
         
        }, 1000); 
      
        
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );

  }
  changeListener_two($event) : void { 
    this.image2 =   this.readThis($event.target);
    this.getBase64(this.image2).then(data => 
      this.resultProductFilebase64 = data 
      )
    this.temp_path_image2 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image2));  

    this.ng2ImgMax.resizeImage(this.image2, 1000, 1000).subscribe(
      result => {
        this.image2 = result;
               
        this.arrayfile_product.push(this.image2);  
        this.arrayPathfile_product.push(this.resultProductFilebase64)


        setTimeout(() => {
          Swal.fire({
            title: 'บันทึก รูป สินค้านี้ ใช่หรือไม่',
            text: "",
            imageUrl:this.temp_path_image2.changingThisBreaksApplicationSecurity,  
            imageHeight: 100,
            imageAlt: 'Custom image', 
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'บันทึกเรียบร้อย!',
                showConfirmButton: false,
                timer: 1500
              })
              this.apiService.uploadimage(this.image2).then((response) => {   
                this.resultFile = response;  
                this.arrayPathfile_product_Posted.push(this.resultFile.imageUrl); 
               
               }); 
            }
            else{
              this.image2="";
              this.temp_path_image2="";
            }
          })
         
        }, 1000); 


      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
 
  }
 
  
  changeListener_five($event) : void { 
     
    this.image5 =  this.readThis($event.target);
    this.getBase64(this.image5).then(data => 
      this.resultFilebase64 = data 
      )
    this.temp_path_image5 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image5));  
 
    this.ng2ImgMax.resizeImage(this.image5, 1000, 1000).subscribe(
      result => {
         
        this.image5 = result;
        this.arrayfile_slide.push(this.image5);  
        this.arrayPathfile_slide.push(this.resultFilebase64)
 

        setTimeout(() => {
          Swal.fire({
            title: 'บันทึก รูป สินค้านี้ ใช่หรือไม่',
            text: "",
            imageUrl:this.temp_path_image5.changingThisBreaksApplicationSecurity, 
            imageHeight: 100,
            imageAlt: 'Custom image', 
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'บันทึกเรียบร้อย!',
                showConfirmButton: false,
                timer: 1500
              })
              this.apiService.uploadimage(this.image5).then((response) => {   
                this.resultFile = response;  
                this.arrayPathfile_slide_Posted.push(this.resultFile.imageUrl); 
               
               }); 
            }
            else{
              this.image5="";
              this.temp_path_image5="";
            }
          })
         
        }, 1000); 


        $('.owl-carousel').owlCarousel('destroy'); 
        setTimeout(() => {
          this.setupowl()
        }, 100);
   
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }
  
  deleteimage(itemindex,type:String){ 
    Swal.fire({
      title: 'ลบรูป ใช่หรือไม่',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText:'ยกเลิก'
    }).then((result) => {
       
      if (result.value && type == "product") { 
        this.arrayPathfile_product.splice(itemindex, 1);  
      }
      if (result.value && type== "slide") { 
        this.arrayPathfile_slide.splice(itemindex, 1); 
        $('.owl-carousel').owlCarousel('destroy'); 
        setTimeout(() => {
          this.setupowl()
        }, 100);
      }
    }) 


  }
  readThis(inputValue: any) { 
    var file:File = inputValue.files[0];
    return file;
    
  }


   getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  onClickSubmit(data) {  

    // if(data.pricestart <= 0){
    //   this.UtilService.showError("กรุณากรอก <br/> ราคาเริ่มต้น","")
    //   return;
    // } 
    // else if(typeof(this.temp_path_image1) ==='undefined'){
    //   this.UtilService.showError("กรุณา อัพโหลด <br/> รูปภาพให้ครบ ","");
    //   return;
    // }
   
    // else{
 
      Swal.fire({
        title: 'คุณต้องการเปิดประมูลใช่หรือไม่',
        text: "เมื่อทำการลงทะเบียนแล้วสามารถแก้ไขได้  ที่ 'เพิมเติม'",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText:'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.douploadimage(data);   
        }
      }) 

   
      // } 
  }


  insertline(){ 
    
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'ต่อไป &rarr;',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', 
      cancelButtonText:'ยกเลิก',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'กรอก LINE ID',
        text: '(คือ Line ที่ใช้ใน ชีวิตประจำวัน)'
      },
      {
        title: 'กรอก LINE @ID (ไม่มีไม่เป็นไร)',
        text: '(คือ Line ที่ใช้ใน ทางธุรกิจ ที่เรียว่า LINE@)'
      }
      
    ]).then((result) => {
      if (result.value) {
  
        localStorage.setItem("lineid",result.value[0]);
        localStorage.setItem("lineofficialid",result.value[1]);
        const answers = JSON.stringify(result.value)
        Swal.fire({
          title: 'All done!',
          html: `
            LINE ID ที่ใช้ :
            <pre><code>${result.value[0]}</code></pre>
            LINE official ID (LINE@) ที่ใช้ :
            <pre><code>${result.value[1]}</code></pre>
          `,
          confirmButtonText: 'ตกลง'
        })
      }
    })
  //  this.alertinsertdata("กรอก LINE ID",function(data){ 
  //  localStorage.setItem("lineid",data);
  //  });  
  }

  insertfacebook(){

   this.alertinsertdata("กรอก facebook Id",function(data){ 
   localStorage.setItem("facebooklink",data);
   });  
    
  }
  inserttel(){

    this.alertinsertdata("กรอก เบอร์โทร",function(data){ 
    localStorage.setItem("telsale",data);
    });  
     
   }

   insertyoutube(){

    this.alertinsertdata("กรอก ลิ้ง ยูทูป",function(data){ 
    localStorage.setItem("youtube",data);
    });  
     
   }

   insertbank(item){ 
    this.alertinsertdata("กรอก เลขบัญชี",function(data){ 
    localStorage.setItem("bank_"+item,data);
    });   
   }
 





   
  

  insertlinenotify(){ 
    
    this.alertinsertdata("กรอก LINE Notify",function(data){ 
    localStorage.setItem("linenotify",data);
    });  
   }
 
   insertfacebookpixel(){
 
    this.alertinsertdata("กรอก Facebook Pixel code",function(data){ 
    localStorage.setItem("facebookpixel",data);
    });  
     
   }


  insertshopee(){ 
    
    this.alertinsertdata("กรอก ลิ้งร้านค้า Shopee",function(data){ 
    localStorage.setItem("shopeelink",data);
    });  
   }

   insertlazada(){ 
    
    this.alertinsertdata("กรอก ลิ้งร้านค้า LAZADA",function(data){ 
    localStorage.setItem("lazadalink",data);
    });  
   }
  alertinsertdata(text:string,callback){

    Swal.fire({
      title: text,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText:'ยกเลิก',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
      return  login
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        callback(result.value);
        // Swal.fire({
        //   title: `${result.value.login}`,
        //   imageUrl: result.value.avatar_url
        // }) 
      
      }
    })

  }



   
  setupowl(){  
    $('.owl-carousel').owlCarousel({ 
      margin:10,
      items:3,
      loop:true, 
      dot:true,
      autoplay:true,
      autoplayTimeout:1000,
      autoplayHoverPause:true, 
      nav:true 
  })
  }





  public postpra(data,arrayPathfile_product_Posted:Array<String>,arrayPathfile_slide_Posted:Array<String>){
 
    setTimeout(() => {  

      data.access_token = localStorage.getItem("access_token");
      data.id_token = localStorage.getItem("userId"); 
      data.Latitude =   localStorage.getItem("Latitude");
      data.Longitude = localStorage.getItem("Longitude");
      data.ip = localStorage.getItem("ip"); 
      data.status_pramoon_check = "checking";  
      data.pictureUrl = localStorage.getItem("pictureUrl");
      data.displayName= localStorage.getItem("displayName"); 


      // ******** 

      data.product_header =   this.path_header;
      data.product_picture =   this.arrayPathfile_product_Posted;
      data.slide_picture =   this.arrayPathfile_slide_Posted;


      data.lineid= localStorage.getItem("lineid");
      data.facebooklink= localStorage.getItem("facebooklink"); 
      data.linenotify= localStorage.getItem("linenotify"); 
      data.facebookpixel= localStorage.getItem("facebookpixel"); 
      data.shopeelink= localStorage.getItem("shopeelink"); 
      data.lazadalink= localStorage.getItem("lazadalink"); 
      data.telsale= localStorage.getItem("telsale"); 
      data.description= data.description;
      

      // ********


      data.type= "marketing";
      data.pricestart= "0";
    
      data.pricestart= "0";
      // product_picture:Array, 
      // slide_picture:Array, 
      
      data.dateend=(new Date()).toString();
      
      
      this.apiService.postpramoon(data,this.arrayPathfile,this.token).then((response) => { 

       
        setTimeout(() => { 
          this.spinner.hide();
        }, 0);


        Swal.fire(
          'สำเร็จ !',
          'ขอบคุณครับ',
          'success'
        )
        window.location.href = window.location.origin+'/promotion';
         
      }); 
    
    }, 1000); 
  }
  


  
  public douploadimage(data)
  {  
    this.spinner.show();
    // this.arrayfile[0] =this.image1;
    // this.arrayfile[1] =this.image2;
    // this.arrayfile[2] =this.image3;
    // this.arrayfile[3] =this.image4;


 //อัพโหลด path Header
 //อัพโหลด path Header
  
 
    //อัพโหลด path slide
    // setTimeout(() => { 

    //   for (let index = 0; index < this.arrayfile_slide.length; index++) {
    //     this.apiService.uploadimage(this.arrayfile_slide[index]).then((response) => {   
    //     this.resultFile = response; 
    //     this.arrayPathfile_slide_Posted.push(this.resultFile.imageUrl); 
    //     if( index == this.arrayfile_slide.length-1 )
    //     {  
    //       //this.postpra(data);
    //       //this.arrayPathfile_slide_Posted =[];
    //     } 
    //    });    
    //   //  if( this.arrayPathfile.length == 4 ) break;
    //     }
    // }, 1000);  

    //อัพโหลด path slide

     //อัพโหลด path Product
    //  setTimeout(() => { 
 
    //   for (let index = 0; index < this.arrayfile_product.length; index++) {
    //     this.apiService.uploadimage(this.arrayfile_product[index]).then((response) => {   
          
    //     this.resultFile = response; 
    //     this.arrayPathfile_product_Posted.push(this.resultFile.imageUrl); 
    //     if( index == this.arrayfile_slide.length-1 )
    //     {  
          
    //       //this.arrayPathfile_product_Posted =[];
    //     } 
    //     setTimeout(() => {
          
    //       /** spinner ends after 5 seconds */
    //       this.spinner.hide();
    //     }, 0); 
    //    });    
    //   //  if( this.arrayPathfile.length == 4 ) break;
    //     }
    // }, 1000);  

    //อัพโหลด path slide

    setTimeout(() => {
      
      this.postpra(data,this.arrayPathfile_product_Posted,this.arrayPathfile_slide_Posted);
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000); 
  }
  

 clickmap(){

  Swal.fire({
    title: 'คุณต้องการใช้ (ตำแหน่งตรงนี้) แสดงแผนที่ ของร้านค้าใช่หรือไม่',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ตกลง',
    cancelButtonText:'ยกเลิก'
  }).then((result) => {
    if (result.value) {
        this.domap();

    //  this.getip();


    
    }
    else{

        Swal.fire(
            'ท่านไม่ได้ใช้ตำแหน่งตรงนี้ แสดงใน ร้านค้าของท่าน',
            'ขอบคุณครับ',
            'success'
          )
          
    //       setTimeout(() => { 
    //         window.location.href = window.location.origin+'/promotion';
         
    // }, 3000);

    }
  }) 

 }

  domap(){

    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                // this.geolocationPosition = position,
  
                   
                    this.model.Longitude = position.coords.longitude,
                    this.model.Latitude =  position.coords.latitude,
  
                    localStorage.setItem("Longitude",this.model.Longitude);
                    localStorage.setItem("Latitude",this.model.Latitude);
                    console.log(position)
                    // this.lat = 14.598382
                    // this.lng = 100.447521
            },
            error => {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            }
        );
    };
  }
  
}
