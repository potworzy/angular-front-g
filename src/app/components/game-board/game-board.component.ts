import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GameService } from '../../game/game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  isLoggedIn:Observable<boolean>
  constructor(private gameService: GameService) {
    this.isLoggedIn = this.gameService.isLoggedIn
  }
  ngOnInit(): void {
      this.gameService.getUserCreatedGames().subscribe()
  }
}
