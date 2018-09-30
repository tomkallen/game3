import 'pixi';
import 'p2';
import Phaser from 'phaser-ce'
import Main from './stages/main'
// import {Text} from './text.plugin'
// import {HealthBar} from './bar.plugin'

const game = new Phaser.Game(1216, 760, Phaser.AUTO)

game.state.add('Main', Main)
// game.state.add('Level', Level)
game.state.start('Main')
// export {Text, HealthBar}
export default game
