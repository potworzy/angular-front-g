import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Observable} from 'rxjs';
import {GameListItem} from "../../share/share.class-from-api";
import {GameStore} from "../../game/game.store";
import {OwnerComponent} from "./owner/owner.component";
import {GameListByAvailability} from "../../share/share.enums";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, AfterViewInit {
  @ViewChild('refListAvailable') refListAvailable: OwnerComponent | undefined
  @ViewChild('refListEnded') refListEnded: OwnerComponent | undefined
  listAvailable = GameListByAvailability.GAME_IN_PROGRESS
  listEnded = GameListByAvailability.GAME_ENDED
  isLoggedIn:Observable<boolean>
  ownerEndedGames$:Observable<GameListItem[]> = new Observable<GameListItem[]>()
  ownerAvailableGames$:Observable<GameListItem[]> = new Observable<GameListItem[]>()
  constructor(private authService:AuthService , private gameStore: GameStore) {
    this.isLoggedIn = this.authService.isLoginSubject
  }
  ngOnInit(): void {
    this.updateGamesLists()
  }
  ngAfterViewInit(){
    this.ownerAvailableGames$.subscribe({
      next: list => {
       if(this.refListAvailable) this.refListAvailable.gamesList = list
      }
    })
  }

  updateGamesLists(){
    this.ownerAvailableGames$ = this.gameStore.filterByGameState(false)
    this.ownerEndedGames$ = this.gameStore.filterByGameState(true)
  }
}
