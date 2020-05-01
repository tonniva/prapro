import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { } 
//https://fineuploader.com/demos.html

  Getweb(){
    //fo dev
    return "http://localhost:4200/home";  
    //for test
    //production
     //return "https://web-pra.firebaseapp.com/home";  
    //production
  }
  client_id(){
     //fo dev
    return "1654042871"; 
    //production
     //return "1653915528";  
  }
  GetSecretCode(){
    //fo dev
    return "a6b04fa327cca94b9c01cd76dc02c19b"; 
    //production
    //return "e394b8a72a9bcdf28d44e6867e8c878c";  

  } 

  tokenNotify(){
    //Token ของ Toniva
    return "E5RtSWRlJNG3TujtMM2iUTdfNwsJUlOgeGfNfF5hUjt";  
  } 
  
  GetAPIurl(){
      return "https://pro-nestjs.herokuapp.com"; 
  } 
  GetAPIuploadUrl(){ 
     return "https://mighty-ocean-48427.herokuapp.com";  
  }

  



  showError(title,text){ 
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonText: 'ตกลง'
    })
  }

  showSuccess(title){ 
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  showConfirm(title,text,callback){ 
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        if (callback) {
          callback(true);
      }
       
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

 


  






ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}
 


 CheckMobileNumber(data) {

	var s = new String(data);

	if ( s.length != 10)
	{

		return false;
	}

	for (var i = 0; i < s.length; i++ ) {					
		if ( s.charCodeAt(i) < 48 || s.charCodeAt(i) > 57 ) {
		
			return false;
		} else {
			
			if ( ((i == 0) && (s.charCodeAt(i) != 48)) || ((i == 1) && (s.charCodeAt(i) != 56)) )
			{
			
				return false;
			}
		}
	}				
	return true;
}

CheckBankNumber(data) {

	var s = new String(data);

	if ( s.length != 10)
	{

		return false;
	}

	for (var i = 0; i < s.length; i++ ) {					
		if ( s.charCodeAt(i) < 48 || s.charCodeAt(i) > 57 ) {
		
			return false;
		} else {
			

		}
	}				
	return true;
}
  
}

 