import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { privateDecrypt } from 'crypto';
import { AuthService } from 'src/app/services/auth.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 user: any
  
  constructor(private authService: AuthService, private router: Router ){
 this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  

  onSubmit(formValues:any){
   this.authService.addUser(formValues.email, formValues.password);
   this.router.navigate(['/'])
  }

  onLogout() {
    this.authService.logOut();
  }
  
}
