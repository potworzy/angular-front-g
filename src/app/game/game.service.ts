import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { AuthService } from '../auth/auth.service';
import {GameListItem} from "../share/share.class-from-api";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private BASE_URL: string = environment.apiURL

  isLoggedIn:Observable<boolean>
  constructor(private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = this.authService.isLoggedIn()
  }
  // getUserCreatedGames() {
  //   return this.http.get<GameListItem[]>(this.BASE_URL + "/game/mygames", {withCredentials: true}).pipe(
  //     catchError(err => throwError(err)),
  //     shareReplay()
  //   );
  // }
}
