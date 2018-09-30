import game from '../game'
import Phaser from 'phaser-ce'

export default class Player extends Phaser.Sprite {
  constructor (sprite) {
    super(game, 0, 0, sprite)
    this.game = game
    this.exists = true
    this.anchor.setTo(0.5, 0.5)
    this.game.physics.enable(this)
    this.timer = 0
    this.spacing = 300 // FIX LATER
  }

  create (x, y) {
    this.x = x
    this.y = y
    this.alive = true

    this.game.add.existing(this)
    game.log(`Player created`)
  };

  update () { }


}