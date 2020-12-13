import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';

import { RestService } from '../rest.service';
import { UtilService } from '../util.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
import { ScaleControlStyle } from '@agm/core';

import { Ng2ImgMaxService } from 'ng2-img-max';
import { start } from 'repl';
declare let $: any;
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  constructor(private ng2ImgMax: Ng2ImgMaxService, public sanitizer:DomSanitizer,private ref: ChangeDetectorRef,private apiService: RestService,private UtilService:UtilService,private route: ActivatedRoute,private spinner: NgxSpinnerService) { }
  istypeservice:boolean = true;
  Isshowsoldout:any;
  id_token:string;
  Registerdetail:any;
  listdetail:any=null;
  listdetail_update:any;
  imageheader:string;
  codeInput:string;

  urlyoutube:SafeResourceUrl;
  Ishideyoutube:boolean=false;
  Ishidefacebook:boolean=false;
  Ishidemap:boolean=false;

  productimage:any;
  productlistdetail:any;
  slideimage:any;
  urlpagefacebook:SafeResourceUrl;
  showiframefacebook:boolean=false;

  Pixelfacebook:string;
  pixel_customer_data:any;


  urlmap:SafeResourceUrl;

  countproduct:any=0;

  product_count_current:any;

  temp_path_image1:any="http://placehold.it/180";
  slipresizefile:any;
  path_slip:any;
  regsiterprofile:any;
  Isshowbank:boolean;

  listdetail_index:any = true;


  ordernowproduct:any;

  ngOnInit(): void {

    // this.startcountdown();
    this.Isshowsoldout=false;
    this.Ishidemap=false;
    this.spinner.show();

    window.scrollTo(0,0);
    setTimeout(() => {
      this.spinner.show();
    }, 0);

const urlParams = new URLSearchParams(window.location.search);

    this.id_token = urlParams.get('token');

    this.listdetail_index = urlParams.get('listdetail');


    this.GetProfile(this.id_token);

    this.apiService.getlistdetail(this.id_token).then((response) => {



      this.listdetail  = response;

      if(this.listdetail_index){
        this.listdetail = this.listdetail[this.listdetail_index]
        debugger
      }
      else
      {
        this.listdetail = this.listdetail[this.listdetail.length-1]
        debugger
      }

      if(this.listdetail.typewebsite !="บริการ") this.istypeservice = true;

      this.checksoldout(this.listdetail);


 if(this.listdetail.facebookpixelkey){

   this.pixel_customer_data =this.listdetail.facebookpixelkey
   localStorage.setItem("pixel_customer_data",this.pixel_customer_data);
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

      this.productimage = this.listdetail.product_picture;

      //  this.productlistdetail = JSON.parse(this.listdetail.product_list_detail[0]);

      this.slideimage = this.listdetail.slide_picture;

      // this.pagefacebook(this.listdetail.facebook);
      setTimeout(() => {

        this.setupowl()
      }, 100);

      setTimeout(() => {
        window.scrollTo(0,0);
        $('.img-preload').fadeOut(3000);
        $('.img-preload-image-title').fadeOut(4000);
        this.spinner.hide();
      }, 1000);


      this.ref.detectChanges();
      console.log(this.listdetail)
   });


  }

  checksoldout(data){

    if(data.bought >= data.quota){
       this.Isshowsoldout = true;
       this.product_count_current = 0;
    }
    else
    {
      this.product_count_current = parseInt(data.quota) - parseInt(data.bought || 0);
      this.Isshowsoldout = false;
    }
  }

  GetProfile(id_token){
    this.apiService.getdetailRegister(id_token).then((response) => {

      this.regsiterprofile = response[0];
    })
  }

  // mypixel() {
  //   if(!this.pixel_customer_data){
  //     return;
  //   }

  //   this.Pixelfacebook ="<script>   ! function(f, b, e, v, n, t, s) {        if (f.fbq) return;        n = f.fbq = function() {            n.callMethod ?                n.callMethod.apply(n, arguments) : n.queue.push(arguments)        };        if (!f._fbq) f._fbq = n;        n.push = n;        n.loaded = !0;        n.version = '2.0';        n.queue = [];        t = b.createElement(e);        t.async = !0;        t.src = v;        s = b.getElementsByTagName(e)[0];        s.parentNode.insertBefore(t, s)    }(window, document, 'script',        'https://connect.facebook.net/en_US/fbevents.js');    fbq('init', '"+ this.pixel_customer_data+"');    fbq('track', 'Preview');</script><noscript><img height='1' width='1' style='display:none'        src='https://www.facebook.com/tr?id="+ this.pixel_customer_data+"&ev=PageView&noscript=1'      /></noscript>";

  //   return  this.Pixelfacebook;
  // }
  pixel_customer() {
    if(!this.pixel_customer_data){
      return;
    }

    this.Pixelfacebook ="<script>   ! function(f, b, e, v, n, t, s) {        if (f.fbq) return;        n = f.fbq = function() {            n.callMethod ?                n.callMethod.apply(n, arguments) : n.queue.push(arguments)        };        if (!f._fbq) f._fbq = n;        n.push = n;        n.loaded = !0;        n.version = '2.0';        n.queue = [];        t = b.createElement(e);        t.async = !0;        t.src = v;        s = b.getElementsByTagName(e)[0];        s.parentNode.insertBefore(t, s)    }(window, document, 'script',        'https://connect.facebook.net/en_US/fbevents.js');    fbq('init', '"+ this.pixel_customer_data+"');    fbq('track', 'Preview');</script><noscript><img height='1' width='1' style='display:none'        src='https://www.facebook.com/tr?id="+ this.pixel_customer_data+"&ev=PageView&noscript=1'      /></noscript>";

    return  this.Pixelfacebook;
  }


  setupowl(){
    $('.owl-carousel').owlCarousel('destroy');
    $('.owl-carousel').owlCarousel({
      margin:10,
      items:1,
      loop:true,
      dot:false,
      autoplay:true,
      autoplayTimeout:1500,
      autoplayHoverPause:true,
      nav:false,
      responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    }
  })
  }


clickline(line:string){
  debugger
  if(line.substring(0,1) =="@"){
    window.location.replace("https://line.me/R/ti/p/"+line);
  }
  else if(line.length == 10){
    window.location.replace("https://line.me/ti/p/"+line);
  }
    else{
      window.location.replace("https://line.me/ti/p/~"+line);
    }
}
clicklineofficialid(line:string){
  debugger
  if(line.substring(0,1) =="@"){
    window.location.replace("https://line.me/R/ti/p/"+line);
  }
  else if(line.length == 10){
    window.location.replace("https://line.me/ti/p/"+line);
  }
    else{
      window.location.replace("https://line.me/ti/p/~"+line);
    }
}
clickfacebook(facebook){
  window.open("http://m.me/"+facebook);
  // window.location.replace("m.me/"+facebook);
}
clickshopee(shopee){
  window.open(shopee);
  // window.location.replace("m.me/"+facebook);
}

showshopee(shopee){
if( shopee != "null"){
return true;
}else
{
 return false;
}

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

    if(parseInt(data.countproduct) > parseInt(this.product_count_current)){
      this.UtilService.showError("ขออภัย สิค้าไม่เพียงพอ รบกวนสั่งไม่เกิน "+this.product_count_current+" ชิ้น","")
    //call update จำนวน สินค้า
      this.apiService.getlistdetail(this.id_token).then((response) => {

        this.listdetail_update  = response;
        this.listdetail_update = this.listdetail[this.listdetail_update.length-1]
        this.product_count_current =parseInt(this.listdetail_update.quota) - parseInt(this.listdetail_update.bought);
        this.ref.detectChanges();
      });
      //call update จำนวน สินค้า
      return;
    }
    if(data.type == ""){
      this.UtilService.showError("กรุณาเลือก <br/> ประเภทการชำระเงิน","")
      return;
    }

    if(data.name_order == ""){
      this.UtilService.showError("กรุณากรอก ชื่อนามสกุล","")
      return;
    }

    if(data.tel == ""){
      this.UtilService.showError("กรุณากรอกเบอร์ติดต่อกลับ","")
      return;
    }
    if(data.deliveryaddress == ""){
      this.UtilService.showError("กรุณากรอกที่อยู่การจัดส่ง","")
      return;
    }
    if(data.type == "โอนเงิน" && this.temp_path_image1 == "http://placehold.it/180"){
      this.UtilService.showError("กรุณาอัพโหลดสลิป","")
      return;
    }


  data.message =  "\r\n\r\nจำนวนสินค้าที่สั่ง  : "+data.countproduct+" ชิ้น\r\n\r\nโอนเงิน : "+data.pricepay+" บาท  \r\nสั่งแบบ : "+data.type +"\r\nรายละเอียด ::\r\n\r\n"+data.description+"\r\n\r\nที่อยู่จัดส่ง ::\r\n\r\nคุณ "+data.name_order+"\r\n"+data.deliveryaddress+"\r\n\r\nเบอร์ติดต่อกลับ : "+data.tel+"";
  data.imageThumbnail =  this.path_slip;
  data.imageFile = this.slipresizefile;
  data.linetoken = this.listdetail.linenotifytoken;



  this.apiService.linenotifyPaybill(data).then((response) => {
   var total_buy = this.countproduct + this.listdetail.bought;

    this.apiService.updateBuy(this.listdetail._id,total_buy).then((response) => {


      // window.history.back();
      setTimeout(() => {
        location.reload();
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.success();

    });

   });


}

success(){
  Swal.fire(
    'ทำรายการสั่งซื้อสำเร็จ !',
    'ขอบคุณครับ',
    'success'
  )

  setTimeout(() => {
    window.location.href = window.location.origin+ "/thankyoupage?token="+this.id_token;
    this.spinner.hide();
  }, 1000);
}

checkIsshowbank(select){
  if(select=="1"){
    this.Isshowbank = true;
  }
  else{
    this.Isshowbank = false;
  }

}

showprice(data){

return JSON.parse(data)[0];
}
showdesc(data){

  return JSON.parse(data)[1];
}

showcount(data){

  return JSON.parse(data)[2];
}

ordernow(img,data){
  this.ordernowproduct = data;
  localStorage.setItem("ordernow", this.ordernowproduct)
  localStorage.setItem("ordernow_img",img)

  window.location.href = window.location.origin+ "/previeworderproduct"+window.location.search;


}
startcountdown(){

// // Set the date we're counting down to
// var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();

//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds

//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Display the result in the element with id="demo"

//   // document.getElementById("days").innerHTML = days.toString();
//   document.getElementById("hours").innerHTML = hours.toString()  ;
//   document.getElementById("minutes").innerHTML = minutes.toString()  ;
//   document.getElementById("seconds").innerHTML = seconds.toString();

//   // If the count down is finished, write some text
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);
// }

this.makeid(4);
var countdown = 5 * 60 * 1000;
var timerId = setInterval(function(){

  countdown -= 1000;
  var min = Math.floor(countdown / (60 * 1000));
  //var sec = Math.floor(countdown - (min * 60 * 1000));  // wrong
  var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct

  if (countdown <= 0) {
    //document.getElementById("codeendt").innerHTML = "CODE โปรโมชั่น  <br><mark>รหัสหมดอายุ</mark>";
    document.getElementById("codeend").innerHTML = "CODE โปรโมชั่น  <br><mark>รหัสหมดอายุ</mark>";
     clearInterval(timerId);
     //doSomething();
  } else {
     $("#countTime").html(min + " : " + sec);
  }

    // document.getElementById("days").innerHTML = days.toString();
    //document.getElementById("hourst").innerHTML = "00"  ;
    //document.getElementById("minutest").innerHTML = min.toString()  ;
    //document.getElementById("secondst").innerHTML = sec.toString();

  document.getElementById("hours").innerHTML = "00"  ;
  document.getElementById("minutes").innerHTML = min.toString()  ;
  document.getElementById("seconds").innerHTML = sec.toString();

}, 1000); //1000ms. = 1sec.
}

 makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  //document.getElementById("codet").innerHTML = result.toString();
  document.getElementById("code").innerHTML = result.toString();
  this.codeInput =  result.toString();
  return result;
}

}



