import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent {
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
  constructor(private authService: AuthService){}

  onFormSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe()
  }
}
