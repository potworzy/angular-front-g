import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { GameListItem, GameService } from '../../../game/game.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  
  createdGamesList: GameListItem[] = []
  
  created$: Observable<GameListItem[]> = new Observable()
  
  constructor(private gameService: GameService, private datePipe:DatePipe) { }
  ngOnInit(): void {
    this.created$ = this.gameService.getUserCreatedGames()
    this.created$.subscribe(
      games => {
        if (games.length > 0) this.createdGamesList = games;
      }
    );
  }
}
