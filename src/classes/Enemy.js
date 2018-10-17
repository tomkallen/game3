import game, { HealthBar, Text } from '../game'
import Phaser from 'phaser-ce'
import controller from './Controller'
import numeral from "numeral"

export default class Enemy extends Phaser.Sprite {
  constructor (sprite) {
    super(game, 0, 0, sprite)
    this.game = game
    this.exists = false
    this.anchor.setTo(0.5)
    this.game.physics.enable(this)
    this.body.allowGravity = false
    this.body.immovable = false
  }

  spawn () {
    this.reset(200, -50)
    this.alive = true
    this.exists = true
    this.health = controller.getEnemyHP()
    this.maxHP = controller.getEnemyHP()
    this.gold = controller.getEnemyGold()
    game.log(`Creating enemy with ${this.health} hp and ${this.gold} gold`)
    game.add.existing(this)
    game.physics.arcade.enable(this)
    this.healthText = game.add.text(24, 28, '', {
      font: '16px Nanum Gothic',
      fill: '#feeeaa',
      boundsAlignH: 'left',
      boundsAlignV: 'middle'
    })
    this.getTween()
  }

  blink () {
    this.tint = 0xaa5555
    window.setTimeout(() => this.tint = 0xffffff, 40)
  }

  onDeath () {
    this.health = 0
    this.kill()
    this.healthBar.kill()
    this.healthText.kill()
    controller.onEnemyKill()
  }

  update () {
    this.healthBar && this.healthBar.setPercent(Math.round(this.health / this.maxHP * 100))
    this.healthText.text = numeral(this.health).format('0.[00]a')
    this.healthText.visible = controller.enemyActive
  }

  getTween () {
    const tween = game.add.tween(this)
    tween.to({x: 200, y: 100}, 1000, undefined, true)
    tween.onComplete.add(() => {
      this.healthBar = new HealthBar(game, {
        width: 360,
        height: 12,
        x: 200,
        y: 16,
        bg: {color: '#635a65'},
        bar: {color: '#fcffbe'},
        animationDuration: 30
      })

      controller.enemyActive = true
    })
    tween.start()
  }
}
