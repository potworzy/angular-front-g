import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../game/game.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  constructor(private gameService: GameService) { }
  ngOnInit(): void {
    this.gameService.getUserCreatedGames().subscribe()
    
  }
}
