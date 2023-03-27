import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Account, AuthUser } from './auth-token.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
   private BASE_URL: string = 'http://localhost:3000/api/v1/'

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  getAccounts(authUser?: AuthUser): Observable<Account[]> {
    return this.http.get<Account[]>(this.BASE_URL).pipe(
      catchError(err => {
        return of([])
      })
    )
  }

}
