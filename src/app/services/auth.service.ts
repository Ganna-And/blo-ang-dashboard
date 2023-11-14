import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  accsessGuard:boolean = false;
  user: any;

  constructor(private auth: AngularFireAuth, 
    private toastr:ToastrService,
    private router: Router) { 
   this.loadUser()
    }

  addUser(email:string, password:string){
    this.auth.signInWithEmailAndPassword(email,password).then(logRef=>{
this.toastr.success('You are logged in!');
this.loadUser()
this.isLoggedIn.next(true);
this.router.navigate(['/']);
this.accsessGuard = true;
localStorage.setItem('accessGuard', 'true');

    }).catch(e=>{
      this.toastr.warning('Wrong email or password')
    })
  }

  loadUser(){
   return  this.auth.authState.subscribe(user=>{
     this.user= user 
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user)
      if (user) {
        this.isLoggedIn.next(true);
        this.accsessGuard = true;
      }

    })
  }

  logOut(){
    this.auth.signOut().then(()=>{
      this.toastr.success('User sign out sucsessfuly!');
      localStorage.removeItem('user');
      this.isLoggedIn.next(false);
      this.router.navigate(['/login']);
        this.accsessGuard = false;
        localStorage.removeItem('accessGuard')
     
    })
  }

  loggedIn(){
    return this.isLoggedIn.asObservable()
  }
}
