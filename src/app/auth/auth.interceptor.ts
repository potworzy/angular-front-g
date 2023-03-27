import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { HttpConfig, HTTP_CONFIG_TOKEN } from './http-config';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    @Inject(HTTP_CONFIG_TOKEN) private httpConfig: HttpConfig,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !request.url.split('/').find(path => path === this.httpConfig.loginUrl)) {
          return this.handle401Error(error, request, next)
        }
        return throwError(error)
      })
    )
  }
  private handle401Error(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshAccessToken().pipe(
      switchMap(accessToken => { 
        return next.handle(request)
      }),
      catchError(refreshError => {
        return throwError(refreshError)
      })
    )
  }
}
