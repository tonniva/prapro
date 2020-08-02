import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyoupage',
  templateUrl: './thankyoupage.component.html',
  styleUrls: ['./thankyoupage.component.scss']
})
export class ThankyoupageComponent implements OnInit {

  constructor() { }
  pixel_customer_data:any;
  Pixelfacebook:string;
  ngOnInit(): void {
  this.pixel_customer_data  = localStorage.getItemt("pixel_customer_data");
  }
  pixel_customer() { 
    if(!this.pixel_customer_data){
      return;
    }

    this.Pixelfacebook ="<script>   ! function(f, b, e, v, n, t, s) {        if (f.fbq) return;        n = f.fbq = function() {            n.callMethod ?                n.callMethod.apply(n, arguments) : n.queue.push(arguments)        };        if (!f._fbq) f._fbq = n;        n.push = n;        n.loaded = !0;        n.version = '2.0';        n.queue = [];        t = b.createElement(e);        t.async = !0;        t.src = v;        s = b.getElementsByTagName(e)[0];        s.parentNode.insertBefore(t, s)    }(window, document, 'script',        'https://connect.facebook.net/en_US/fbevents.js');    fbq('init', '"+ this.pixel_customer_data+"');    fbq('track', 'Preview');</script><noscript><img height='1' width='1' style='display:none'        src='https://www.facebook.com/tr?id="+ this.pixel_customer_data+"&ev=PageView&noscript=1'      /></noscript>";
      
    return  this.Pixelfacebook; 
  }
}
