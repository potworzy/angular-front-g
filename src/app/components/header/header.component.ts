import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn: Observable<boolean>
  constructor(private authService: AuthService, private router:Router) {
    this.isLoggedIn = this.authService.isLoggedIn()
  }
  logout() {
    this.authService.logout().subscribe()
  }
  showLoginPage() {
    this.authService.loginToShow()
    this.router.navigate(['/login'])
  }
  showRegisterPage() {
    this.authService.registerToShow()
    this.router.navigate(['/login'])
  }
}
