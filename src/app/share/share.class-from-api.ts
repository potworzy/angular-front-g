export class GameListItem{
  id: string = ''
  createDateTime: Date = new Date()
  lastChangedDateTime: Date = new Date()
  title: string = ''
  description: string = ''
  finished: boolean = false
}
export class CurrentGame{
  game: GameListItem = new GameListItem()
  rounds:Round[] = [new Round()]
}
export class Round {
  createDateTime = new Date()
  title = ''
  description = ''
  finished = false
  votes:Vote[] = [new Vote()]
}

export class Vote{
  value = -1
  user = new Voted()
}
export class Voted{
  name:string = ''
  email:string = ''
}
