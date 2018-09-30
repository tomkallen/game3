import game from '../game'
import { Player, Enemy, GameObject, Pool } from '../classes'
import controller from '../classes/Controller'

export default class Main {
  create () {
    game.stage.backgroundColor = '#555'
    game.player = Main.createPlayer()
  }

  update () {
    // var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }
    // game.add.text(130, 676, `Hi`, style)
  }

  static createPlayer () {
    const player =  new Player('player')
    player.weapon = new Pool(GameObject, {size: 50, name: 'player bullets', sprites: ['basic bullet']})
      return player.create(100, 100)
  }
}
