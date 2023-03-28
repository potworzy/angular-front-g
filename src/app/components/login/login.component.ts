import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService, ChoosenForm } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  chooseForm:Observable<ChoosenForm>
  constructor(private authService: AuthService) {
    this.chooseForm = this.authService.loginOrRegister()
  }
  ngOnInit(): void {
    this.chooseForm.subscribe()
  }
}
