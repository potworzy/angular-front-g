import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  registerForm = new FormGroup({
    email: new FormControl(),
    name: new FormControl(),
    password: new FormControl(),
    repassword: new FormControl()
  })
  constructor(private authService: AuthService){}
  
  onFormSubmit() {
    if (!this.registerForm.valid) { 
      return;
    }
    //console.log("onFormSubmit", String(this.loginForm.value.email), String(this.loginForm.value.password));
    this.authService.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.repassword, this.registerForm.value.name).subscribe({
      next: (data) => console.log('data', data),
      error: (err) => console.log('error', err)
    })
  }
}
