import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
export class Round{
  createDateTime:Date = new Date()
  description:string = ''
  finished:boolean = false
  id:string = ''
  lastChangedDateTime:Date = new Date()
  name: string = ''
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private BASE_URL: string = environment.apiURL

  isLoggedIn:Observable<boolean>
  constructor(private authService: AuthService, private http: HttpClient, private route: ActivatedRoute) { 
    this.isLoggedIn = this.authService.isLoggedIn()
    this.route.firstChild?.params.subscribe(params => {
      console.log('game id', params)
      this.visitGame(params['id'])
    })
  }
  getUserCreatedGames() {
    return this.http.get<GameListItem[]>(this.BASE_URL + "/game/mygames", { withCredentials: true }).pipe(
      catchError(err => throwError(err)),
      shareReplay(),
    )
  }
  visitGame(id:string) {
    return this.http.get(this.BASE_URL + `/game/mygames/${id}`, { withCredentials: true }).subscribe(data => {
      console.log('game data', data)
      this.getRounds(id)
    })
  }
  getRounds(id: string) {
    return this.http.get<Round[]>(this.BASE_URL + `/round/${id}`, { withCredentials: true }).subscribe(data => {
      console.log('rounds', data);
      if (Array.isArray(data)) {
        for (let d of data) {
          this.getVotes(d.id);
        }
      }
    }
      //this.getVotes(data[0].id)
    )
  }
  getVotes(id: string) {
    return this.http.get<Round>(this.BASE_URL + `/vote/${id}`, { withCredentials: true }).subscribe(data => {
      console.log('votes', data);
    })
  }
}
