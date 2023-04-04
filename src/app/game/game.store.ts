import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, throwError} from "rxjs";
import {GameListItem} from "../share/share.class-from-api";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class GameStore{
  private BASE_URL: string = environment.apiURL
  private gamesSubject = new BehaviorSubject<GameListItem[]>([])
  games$: Observable<GameListItem[]> = this.gamesSubject.asObservable()

  constructor(private http:HttpClient) {
    this.loadAvailableGames()
  }
  filterByGameState(finished: boolean): Observable<GameListItem[]>{
    return this.games$.pipe(
      map(games => games.filter(
        game => game.finished === finished
      ))
    )
  }
  //todo docelowo loading wszystkich gier dla użytkownika
  private loadAvailableGames(){
    this.http.get<GameListItem[]>(this.BASE_URL + "/game/mygames", {withCredentials: true}).pipe(
      map(response => {
        console.log(response)
        this.gamesSubject.next(response)
      }),
      catchError(err => {
        const message = 'Loading games list error'
        //todo zrobić ogólne wyświetlanie komunikatów
        console.error(message, err)
        return throwError(err)
      }),
      //tap((gamesList<GamesListItem[]>) => this.gamesSubject.next(gamesList))
    ).subscribe()
  }
}
