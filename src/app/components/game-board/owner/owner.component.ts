import {DatePipe} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {GameStore} from "../../../game/game.store";
import {GameListByAvailability} from "../../../share/share.enums";
import {GameListItem} from "../../../share/share.class-from-api";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  @Input()  typeList = GameListByAvailability.GAME_ENDED
  @Input() gamesList:GameListItem[] = []
  constructor(private gameStore:GameStore, private datePipe:DatePipe) { }
  ngOnInit(): void {

  }
}
