import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, shareReplay, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { AuthService } from '../auth/auth.service';

export class GameListItem{
  id: string = ''
  createDateTime: Date = new Date()
  lastChangedDateTime: Date = new Date()
  title: string = ''
  description: string = ''
  finished: boolean = false
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private BASE_URL: string = environment.apiURL

  isLoggedIn:Observable<boolean>
  constructor(private authService: AuthService, private http: HttpClient) { 
    this.isLoggedIn = this.authService.isLoggedIn()
  }
  getUserCreatedGames() {
    return this.http.get<GameListItem[]>(this.BASE_URL + "/game/mygames", { withCredentials: true }).pipe(
      catchError(err => throwError(err)),
      shareReplay()
    )
  }
}
