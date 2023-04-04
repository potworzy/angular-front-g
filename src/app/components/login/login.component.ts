import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService} from '../../auth/auth.service';
import {ChoosenForm} from "../../share/share.enums";

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
