import game from '../game'

export default class Preload {
  preload () {
    game.devMode = true
    game.load.image('enemy', '/src/sprites/enemy.png')
    game.load.image('player', '/src/sprites/enemy.png')
  }

  create () {
    game.log('Loaded Preload Stage')
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.state.start('Main')
  }
}
