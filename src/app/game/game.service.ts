import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { AuthService } from '../auth/auth.service';

export class GameListItem{
  'id': string
  'createDateTime': Date
  'lastChangedDateTime': Date
  'title': string
  'description': string
  'finished': boolean
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private BASE_URL: string = environment.apiURL

  gameList:GameListItem[] = []

  isLoggedIn:Observable<boolean>
  constructor(private authService: AuthService, private http: HttpClient) { 
    this.isLoggedIn = this.authService.isLoggedIn().pipe(
      // tap(data => {
      //   this.getUserCreatedGames().subscribe()
      // })
    )
  }
  getUserCreatedGames() {
    console.log('gamelist in')
    return this.http.get(this.BASE_URL + "/game/mygames", { withCredentials: true }).pipe(
      tap(responseData => {
        //this.gameList = responseData
        console.log('gamelist',responseData)
      }),
      catchError(err => throwError(err))
    );
  }
}
