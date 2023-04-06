import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, filter, map, Observable, shareReplay, tap, throwError} from "rxjs";
import {CurrentGame, GameListItem} from "../share/share.class-from-api";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class GameStore{
  private BASE_URL: string = environment.apiURL
  private gamesSubject = new BehaviorSubject<GameListItem[]>([])
  games$: Observable<GameListItem[]> = this.gamesSubject.asObservable()
  private currentGameSubject = new BehaviorSubject<CurrentGame>(new CurrentGame())
  currentGame$:Observable<CurrentGame> = this.currentGameSubject.asObservable()

  constructor(private http:HttpClient) {
    this.loadAvailableGames()
  }

  gameDetails(gameId: string | null){
    if(!gameId) return
    this.http.get<CurrentGame>(`${this.BASE_URL}/game/mygames/${gameId}`, {withCredentials: true}).pipe(
      tap(response => {
        console.log('details', response)
        this.currentGameSubject.next(response)
      }),
      shareReplay(),
      catchError(err => {
        const message = 'Loading game error'
        console.error(message, err)
        return throwError(err)
      }),
    ).subscribe()
  }
  //todo docelowo loading wszystkich gier dla użytkownika
  private loadAvailableGames(){
    this.http.get<GameListItem[]>(this.BASE_URL + "/game/mygames", {withCredentials: true}).pipe(
      map(response => {
        this.gamesSubject.next(response)
      }),
      catchError(err => {
        const message = 'Loading games list error'
        //todo zrobić ogólne wyświetlanie komunikatów
        console.error(message, err)
        return throwError(err)
      }),
    ).subscribe()
  }
}
