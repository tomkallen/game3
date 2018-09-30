import game from '../game'
import {Player, Enemy} from "../classes";
import controller from "../classes/Controller"

export default class Main {
  create () {
    game.stage.backgroundColor = '#555'

  }

  update () {
    // var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }
    // game.add.text(130, 676, `Hi`, style)
  }

  reset () {
    game.state.start('Level')
  }

  setupPlayer(){
    game.player = new Player('player')
    game.player.hp = controller.playerHp
    game.player.gold = controller.gold
    game.player.create(100,100)
  }
}
