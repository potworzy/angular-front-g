import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthToken } from './auth-token.model';
import { HttpConfig, HTTP_CONFIG_TOKEN } from './http-config';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = 'http://localhost:3000/api/v1/'
  
  get username(): string | null{
    return sessionStorage.getItem('username')
  }

  set username(username: string | null) {
    if (username) {
      sessionStorage.setItem('username', username)
    }
  }

  get loginUrl() {
    return this.httpConfig.loginUrl
  }

  constructor(@Inject(HTTP_CONFIG_TOKEN) private httpConfig: HttpConfig, private http: HttpClient) { }

  fetchAccessToken(username: string, password: string): Observable<AuthToken>{
    return this.http.post<AuthToken>(`${this.BASE_URL}/auth/login/`, { username, password }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  refreshAccessToken(): Observable<String>{
    return this.http.get<String>(`${this.BASE_URL}/auth/refresh/`).pipe(
      tap(res => this.username = this.username),
      catchError((err) => throwError(err))
    )
  }

  gotoLoginPage(router: Router, extraParam?: any, extras?: NavigationExtras) {
    let params: any[] = [this.loginUrl]
    if (extraParam) params.push(extraParam)
    router.navigate(params, extras)
  }
}
