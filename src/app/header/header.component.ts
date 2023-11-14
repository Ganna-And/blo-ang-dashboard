import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;  
  userEmail!: string; 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  
   this.userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
   this.isLoggedIn$ = this.authService.loggedIn()
  console.log(this.userEmail)
  }

  onLogout() {
    this.authService.logOut();
  }
}
