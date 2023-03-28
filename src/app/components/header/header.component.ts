import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn:Observable<boolean>
  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn()
  }
  logout() {
    this.authService.logout().subscribe()
  }
  showLoginPage() {
    this.authService.loginToShow()
  }
  showRegisterPage() {
    this.authService.registerToShow()
  }
}
