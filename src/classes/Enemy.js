import game from '../game'
import Phaser from 'phaser-ce'

export default class Enemy extends Phaser.Sprite {
  constructor (sprite) {
    super(game, 0, 0, sprite)
    this.game = game
    this.exists = false
    this.anchor.setTo(0.5, 0.5)
    this.game.physics.enable(this)
    this.body.immovable = false
    this.maxHealth = 1
    this.damageOnContact = 1
    this.alive = false
  }

  update () { }
}
