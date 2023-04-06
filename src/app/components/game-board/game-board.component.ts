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
import {ActivatedRoute, ParamMap} from "@angular/router";

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
  availableGames$:Observable<GameListItem[]> = new Observable<GameListItem[]>()
  constructor(private authService:AuthService , private gameStore: GameStore, private route:ActivatedRoute) {
    this.isLoggedIn = this.authService.isLoginSubject
    this.availableGames$ = this.gameStore.games$
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(){
    this.availableGames$.subscribe({
      next: list => {
        console.log('list1', list)
       if(this.refListAvailable) {
         this.refListAvailable.gamesList = list.filter((game) => !game.finished)
       }
       if(this.refListEnded) {
         this.refListEnded.gamesList = list.filter((game) => game.finished)
       }
      }
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.gameStore.gameDetails(params.get('id'))
      //   else return
    })
  }
}
