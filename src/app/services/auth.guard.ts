import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';




export const authGuard: CanActivateFn = (route,state) => {

const router = inject(Router);
const user = JSON.parse(localStorage.getItem('user') || '{}');


if(user&&user.email){ 
  return true
} 
  else{
   
    console.log(' not welsome');
    router.navigate(['/login'])
return false

  }
  
}





