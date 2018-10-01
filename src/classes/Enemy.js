import game, {HealthBar} from '../game'
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
    this.healthBar = new HealthBar(game, {
      width: 300,
      height: 20,
      x: 200,
      y: 24,
      bg: {color: '#651828'},
      bar: {color: '#FEFF03'},
      animationDuration: 100
    });
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
  }

  onHit (bullet) {
    const damage = controller.playerDamage
    this.health -= damage
    if (this.health < 0) this.health = 0
    game.log(`Enemy hit for ${damage}, got his hp to ${this.health} on level ${controller.level}`)
    bullet.kill()
    if (this.health === 0) {
      controller.levelUpGame()
      this.health = controller.enemyHp
    }
  }

  update () {
    this.healthBar.setPercent(this.health / controller.enemyHp * 100);
  }
}
