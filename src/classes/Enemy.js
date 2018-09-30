import game from '../game'
import Phaser from 'phaser-ce'
import controller from './Controller'

export default class Enemy extends Phaser.Sprite {
  constructor (sprite) {
    super(game, 0, 0, sprite)
    this.game = game
    this.exists = false
    this.anchor.setTo(0.5, 0.5)
    this.game.physics.enable(this)
    this.body.immovable = false
    this.alive = false
  }

  spawn (x, y) {
    this.reset(x, y)
    this.alive = true
    this.exists = true
    this.health = controller.enemyHp
    this.gold = controller.enemyGold
    this.damage = controller.enemyDamage
    game.log(`Creating enemy with ${this.health} hp and ${this.gold} gold`)
    this.game.add.existing(this)
  };

  update () { }
}
