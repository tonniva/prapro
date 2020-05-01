import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
 
import { RestService } from '../rest.service';
import { UtilService } from '../util.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
import { ScaleControlStyle } from '@agm/core';
 
import { Ng2ImgMaxService } from 'ng2-img-max';  
declare let $: any;
@Component({
  selector: 'app-preview', 
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  constructor(private ng2ImgMax: Ng2ImgMaxService, public sanitizer:DomSanitizer,private ref: ChangeDetectorRef,private apiService: RestService,private UtilService:UtilService,private route: ActivatedRoute,private spinner: NgxSpinnerService) { }
  id_token:string; 
  Registerdetail:any;
  listdetail:any;
  imageheader:string;
  
  urlyoutube:SafeResourceUrl;
  Ishideyoutube:boolean=false;
  Ishidefacebook:boolean=false;
  Ishidemap:boolean=false;

  productimage:any;
  slideimage:any;
  urlpagefacebook:SafeResourceUrl;
  showiframefacebook:boolean=false;

  Pixelfacebook:string;
  pixel_customer_data:any;
  

  urlmap:SafeResourceUrl;



  temp_path_image1:any="http://placehold.it/180";
  slipresizefile:any;
  path_slip:any;

  Isshowbank:boolean; 
  ngOnInit(): void {
   
    this.Ishidemap=false;
    this.spinner.show();
   
    window.scrollTo(0,0);
    setTimeout(() => { 
      this.spinner.show();
    }, 0);

    this.id_token = this.route.snapshot.params.id_token; 
    this.id_token = this.id_token.split('?')[0];
   
    this.apiService.getlistdetail(this.id_token).then((response) => {

      
      this.listdetail  = response; 
      this.listdetail = this.listdetail[this.listdetail.length-1]
      
  
 if(!this.listdetail.facebookpixelkey){ 
   this.pixel_customer_data =this.listdetail.facebookpixelkey
 }
      

      if(this.listdetail.youtube && this.listdetail.youtube !="null"){
      this.urlyoutube= this.sanitizer.bypassSecurityTrustResourceUrl(this.listdetail.youtube+"?autoplay=1&cc_load_policy=1");
      this.Ishideyoutube=true;
   
    }
    
    if(this.listdetail.Latitude && this.listdetail.Latitude !="null"){
      this.urlmap= this.sanitizer.bypassSecurityTrustResourceUrl("https://maps.google.com/maps?q="+this.listdetail.Latitude+"%2C"+this.listdetail.Longitude+"&t=&z=19&ie=UTF8&iwloc=&output=embed");
      this.Ishidemap=true; 
    }

    if(this.listdetail.facebook && this.listdetail.facebook != "null"){
      this.urlpagefacebook = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.facebook.com/plugins/page.php?href="+this.listdetail.facebook+"?epa=SEARCH_BOX&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId");
      this.Ishidefacebook=true;
    }

      this.imageheader = this.listdetail.product_header;

      this.productimage = this.listdetail.product_picture[0].split(',');
      this.slideimage = this.listdetail.slide_picture[0].split(',');
     
      // this.pagefacebook(this.listdetail.facebook);
      setTimeout(() => {
        this.setupowl()
      }, 100); 

      setTimeout(() => { 
        window.scrollTo(0,0);
        this.spinner.hide();
      }, 0);
  
     
      this.ref.detectChanges(); 
      console.log(this.listdetail)
   }); 
 
 
  }

  mypixel() { 
    this.Pixelfacebook ="<script>   ! function(f, b, e, v, n, t, s) {        if (f.fbq) return;        n = f.fbq = function() {            n.callMethod ?                n.callMethod.apply(n, arguments) : n.queue.push(arguments)        };        if (!f._fbq) f._fbq = n;        n.push = n;        n.loaded = !0;        n.version = '2.0';        n.queue = [];        t = b.createElement(e);        t.async = !0;        t.src = v;        s = b.getElementsByTagName(e)[0];        s.parentNode.insertBefore(t, s)    }(window, document, 'script',        'https://connect.facebook.net/en_US/fbevents.js');    fbq('init', '509997103029704');    fbq('track', 'Preview');</script><noscript><img height='1' width='1' style='display:none'        src='https://www.facebook.com/tr?id=509997103029704&ev=PageView&noscript=1'      /></noscript>";
    return  this.Pixelfacebook;
  }
  pixel_customer() { 
    return  this.pixel_customer_data;
  }
     
  setupowl(){  
    $('.owl-carousel').owlCarousel('destroy'); 
    $('.owl-carousel').owlCarousel({ 
      margin:10,
      items:1,
      loop:true, 
      dot:true,
      autoplay:true,
      autoplayTimeout:500,
      autoplayHoverPause:true, 
      nav:false
  })
  }


clickline(line:string){
  window.location.replace("https://line.me/ti/p/~"+line);
}
clicklineofficialid(lineofficialid:string){
  window.location.replace("https://line.me/R/ti/p/"+lineofficialid);
}
clickfacebook(facebook){
  window.open("http://m.me/"+facebook);
  // window.location.replace("m.me/"+facebook);
}
clickshopee(shopee){ 
  window.location = shopee;
}
clicklazada(lazada){
  window.location = lazada;
}
clicktel(tel){  
  window.location.replace("tel:"+tel);
} 
 


isUndefined(thing) {
  
  return (typeof thing === "undefined");
}


readURL($event) : void { 
   
   
  const slipfile =  this.readThis($event.target); 
  this.temp_path_image1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(slipfile));  
    
  this.ng2ImgMax.resizeImage(slipfile, 240, 240).subscribe(
    result => { 
      this.slipresizefile = slipfile; 
      this.apiService.uploadimage(this.slipresizefile).then((response) => {   
        this.path_slip = response;
        this.path_slip = this.path_slip.imageUrl; 
       
       }); 
  
      
    },
    error => {
      console.log('😢 Oh no!', error);
    }
  );

}

readThis(inputValue: any) { 
  var file:File = inputValue.files[0];
  return file;
  
}
onClickSubmit(data) { 
  var firstname = localStorage.getItem('firstname');
  var lastname = localStorage.getItem('firstname');
  var email = localStorage.getItem('email'); 
  var tel = localStorage.getItem('tel');

  data.message =  "โอนเงิน : "+data.pricepay+" บาท  \r\nสมัคแบบ : "+data.type +"\r\nรายละเอียด ::\r\n\r\n"+data.description+"\r\n\r\nข้อมูลลูกค้า คุณ "+firstname+" "+lastname+"\r\nemail : "+email+"\r\nเบอร์ ติดต่อ : "+tel;
  data.imageThumbnail =  this.path_slip;
  data.imageFile = this.slipresizefile; 

  this.apiService.linenotifyPaybill(data).then((response) => {   
 
   
   });  


}

checkIsshowbank(select){ 
  if(select=="1"){
    this.Isshowbank = true; 
  }
  else{
    this.Isshowbank = false;
  }

}

}



