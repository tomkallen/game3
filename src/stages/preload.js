import game from '../game'
import Phaser from 'phaser-ce'

export default class Preload {
  preload () {
    game.devMode = true
    game.load.image('enemy', '/src/sprites/enemy.png')
    game.load.image('player', '/src/sprites/enemy.png')
    game.load.image('basic bullet', '/src/sprite/bullet.png')
  }

  create () {
    game.log('Loaded Preload Stage')
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.state.start('Main')
  }
}
