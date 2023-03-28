import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthToken } from './auth-token.model';
import { HttpConfig, HTTP_CONFIG_TOKEN } from './http-config';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from '../../environments/environments';
import { GameService } from '../game/game.service';


export interface AuthResponseData {
  id: string,
  name: string,
  email: string,
  authToken:string,
  refreshToken: string,
  expiresIn: string,
  registered?: boolean
}
export enum ChoosenForm{
  hidden = 'hidden',
  loginF = 'login',
  registerF = 'register',
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = environment.apiURL

  isLoginSubject = new BehaviorSubject<boolean>(this.username ? true : false)
  loginOrRegisterToShow = new BehaviorSubject<ChoosenForm>(ChoosenForm.hidden)
  loginOrRegister():Observable<ChoosenForm> {
    return this.loginOrRegisterToShow.asObservable()
  }
  loginToShow() {
    this.loginOrRegisterToShow.next(ChoosenForm.loginF)
  }
  registerToShow() {
    this.loginOrRegisterToShow.next(ChoosenForm.registerF)
  }
  
  get username(): string | null{
    return localStorage.getItem('username')
  }
  set id(id: string | null) {
    if (id) localStorage.setItem('id', id);
    else {
      localStorage.removeItem('username');
      localStorage.removeItem('id');
    }
  }

  set username(username: string | null) {
    if (username) {
      localStorage.setItem('username', username);
    }
    else {
      localStorage.removeItem('username')
      localStorage.removeItem('id')
    }
  }

  get loginUrl() {
    return this.httpConfig.loginUrl
  }

  constructor(@Inject(HTTP_CONFIG_TOKEN) private httpConfig: HttpConfig, private http: HttpClient, private router: Router) { }

  isLoggedIn(): Observable<boolean>{
    return this.isLoginSubject.asObservable()
  }

  fetchAccessToken(username: string, password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(`${this.BASE_URL}/auth/login`, { username, password },{ withCredentials: true }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  refreshAccessToken(): Observable<String>{
    return this.http.get<String>(`${this.BASE_URL}/auth/refresh/`,{withCredentials: true}).pipe(
      catchError((err) => throwError(err))
    )
  }

  gotoLoginPage(router: Router, extraParam?: any, extras?: NavigationExtras) {
    let params: any[] = [this.loginUrl]
    if (extraParam) params.push(extraParam)
    router.navigate(params, extras)
  }


  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.BASE_URL + "/auth/login", {
      email: email,
      password: password,
    }, { withCredentials: true }).pipe(
      tap(responseData => {
        this.username = responseData.name
        this.id = responseData.id
        this.isLoginSubject.next(true)
        this.loginOrRegisterToShow.next(ChoosenForm.hidden)
        this.router.navigate(['/game'])
      }),
      catchError(err => throwError(err))
    );
  }
  logout() {
    return this.http.get(this.BASE_URL + "/auth/logout", { withCredentials: true }).pipe(
      tap(responseData => {
        this.username = null
        this.isLoginSubject.next(false)
      }),
      catchError(err => throwError(err))
    );
  }
  register(email: string, password: string, repassword:string, name: string) {
    return this.http.post<AuthResponseData>(this.BASE_URL + "/auth/register", {
      email: email,
      password: password,
      confirmPassword: repassword,
      name: name,
    }, { withCredentials: true }).pipe(
      tap(responseData => {
        this.username = responseData.name
        this.id = responseData.id
        this.isLoginSubject.next(true)
        this.loginOrRegisterToShow.next(ChoosenForm.hidden)
        this.router.navigate(['/game'])
      }),
      catchError(err => throwError(err))
    );
  }
}
