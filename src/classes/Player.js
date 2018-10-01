import game, { HealthBar } from '../game'
import controller from './Controller'
import Phaser from 'phaser-ce'

export default class Player extends Phaser.Sprite {
  constructor (sprite) {
    super(game, 0, 0, sprite)
    this.game = game
    this.exists = true
    this.anchor.setTo(0.5, 0.5)
    this.game.physics.enable(this)
    this.health = controller.playerHp

    this.healthBar = new HealthBar(game, {
      width: 360,
      height: 20,
      x: 200,
      y: 680,
      bg: {color: '#651828'},
      bar: {color: '#9ad5ff'},
      animationDuration: 100
    })
  }

  create (x, y) {
    this.x = x
    this.y = y
    this.alive = true

    this.game.add.existing(this)
    game.log(`Player created`)
  };

  update () {
    this.healthBar.setPercent(this.health / controller.playerHp * 100)
  }

}