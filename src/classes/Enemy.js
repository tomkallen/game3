import game, { HealthBar, Text } from '../game'
import Phaser from 'phaser-ce'
import controller from './Controller'

export default class Enemy extends Phaser.Sprite {
  constructor (sprite) {
    super(game, 0, 0, sprite)
    this.game = game
    this.exists = false
    this.anchor.setTo(0.5)
    this.game.physics.enable(this)
    this.body.immovable = false
    this.alive = false
  }

  spawn () {
    this.reset(200, 0)
    this.alive = true
    this.exists = true
    this.health = controller.enemyHp
    this.gold = controller.enemyGold
    this.damage = controller.enemyDamage
    game.log(`Creating enemy with ${this.health} hp and ${this.gold} gold`)
    game.add.existing(this)
    game.physics.arcade.enable(this)
    this.getTween()
  }

  onDeath () {
    this.healthBar.kill()
    this.kill()
    controller.enemyActive = false
    setTimeout(Enemy.respawn, controller.respawnTimer)
  }

  onHit (bullet) {
    if (!controller.enemyActive) return
    this.blink()
    bullet.kill()
    game.sfx.lowHit.play()
    const data = controller.playerDamage
    const damage = data.damage
    const critical = data.critical
    const type = critical ? 'crit' : 'hit'
    this.health -= damage
    Text.combat(this, damage, type)
    if (this.health <= 0) {
      this.onDeath()
      controller.onEnemyKill()
    }
  }

  blink () {
    this.tint = 0xff0000
    window.setTimeout(() => this.tint = 0xffffff, 40)
  }

  update () {
    this.healthBar && this.healthBar.setPercent(this.health / controller.enemyHp * 100)
  }

  static respawn () {
    const enemy = new Enemy('enemy')
    enemy.spawn()
    game.enemy = enemy
  }

  getTween () {
    const tween = game.add.tween(this)
    tween.to({x: 200, y: 120}, 1000, undefined, true)
    tween.onComplete.add(() => {
      this.healthBar = new HealthBar(game, {
        width: 360,
        height: 10,
        x: 200,
        y: 24,
        bg: {color: '#651828'},
        bar: {color: '#FEFF03'},
        animationDuration: 50
      })
      controller.enemyActive = true
    })
    tween.start()
  }
}
