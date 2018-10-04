import game from '../game'
import Phaser from 'phaser-ce'

export default class Preload {
  preload () {
    game.devMode = true
    game.load.image('enemy', '/src/sprites/enemy_1.png')
    game.load.image('player', '/src/sprites/enemy.png')
    game.load.image('basic bullet', '/src/sprites/bullet.png')
    game.load.image('background_1', '/src/sprites/backgrounds/starry_1.png')

    game.load.image('button96x32', '/src/sprites/buttons/button96x32.png')
    game.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    game.load.audio('low_hit', '/src/sounds/low_hit.wav')
  }

  create () {
    game.log('Loaded Preload Stage')
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.sfx = {lowHit: game.add.audio('low_hit')}
  }

  update () {
    if (game.isLoaded) game.state.start('Main')
  }

  onLoadComplete () {
    game.isLoaded = true
  }

}
