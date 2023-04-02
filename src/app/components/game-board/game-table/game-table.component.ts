import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { GameService } from '../../../game/game.service';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements OnInit {
  currentGame: Observable<Params> = new Observable<Params>();
  constructor(private gameService: GameService) {
    //this.currentGame = this.gameService.currentGame;
  }
  ngOnInit(): void {
      this.currentGame.subscribe(params => console.log('game table id', params))
  }

}
