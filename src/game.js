import 'pixi'
import 'p2'
import Phaser from 'phaser-ce'
import Preload from './stages/preload'
import Main from './stages/main'
import { HealthBar } from './plugins/bar.plugin'
import {Text} from './plugins/text.plugin'

Phaser.Game.prototype.log = function (message) {
  this.devMode && console.log(message)
}

const game = new Phaser.Game(800, 720, Phaser.AUTO)

game.state.add('Main', Main)
game.state.add('Preload', Preload)
game.state.start('Preload')

export { HealthBar , Text}
export default game
