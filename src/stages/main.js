import game from '../game'
import {Player, Enemy} from "../classes";

export default class Main {
  create () {
    game.stage.backgroundColor = '#555'
    game.player = new Player('player')
    game.player.create(100,100)
  }

  update () {
    var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }
    game.add.text(130, 676, `Hi`, style)
  }

  reset () {
    game.state.start('Level')
  }
}
