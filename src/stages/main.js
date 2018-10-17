import BasicBullet from '../classes/BasicBullet'
import game, { HealthBar, Text } from '../game'
import { Player, Enemy, Pool } from '../classes'
import controller from '../classes/Controller'

let gameTimer = 0

const style = {font: '14px Nanum Gothic', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle'}

export default class Main {
  create () {

    game.stage.backgroundColor = '#657e83'
    Main.createPlayer()
    Main.createXPBar()
    Main.createText()
    Main.createEnemy()
    game.projectiles = new Pool(BasicBullet, {size: 50, name: 'player bullets', sprites: ['basic bullet']})
  }

  update () {
    const {world} = controller

    Main.fire()
    game.physics.arcade.overlap(
      game.projectiles,
      game.enemy,
      (enemy, bullet) => this.onEnemyHit(bullet, enemy))

    Main.renderBars()
    game.textController.worldInfo.text = `Wave ${world.wave} / ${world.wavesPerZone} — Zone ${world.zone} / ${world.zonesPerLevel} — World ${world.level}`
  }

  static createPlayer () {
    const player = new Player('player')
    player.create(200, 660)
    game.player = player
  }

  static createEnemy (oldEnemy) {
    const enemy = new Enemy('enemy')
    enemy.spawn()
    game.enemy = enemy
    oldEnemy && oldEnemy.destroy(true)
  }

  static fire () {
    if (!controller.enemyActive) return
    if (game.time.now > gameTimer || 0) {
      const bullet = game.projectiles.create(game.player.x, game.player.y)
      bullet.body.velocity.y = -controller.playerProjectileSpeed
      gameTimer = game.time.now + controller.playerProjectileSpacing
    }
  }

  static createXPBar () {
    game.bars = {
      xp: new HealthBar(game, {
        width: 360,
        height: 12,
        x: 200,
        y: 700,
        bg: {color: '#635a65'},
        bar: {color: '#fcffbe'},
        animationDuration: 30
      })
    }
  }

  static createText () {
    game.textController = {
      worldInfo: game.add.text(500, 16, '', style),
      enemyHP: game.add.text(20, 80, '', {
        font: '24px Nanum Gothic',
        fill: '#000',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
      })
    }
  }

  static renderBars () {
    game.bars.xp.setPercent(Math.round(controller.player.xp / controller.player.xpNeeded * 100))
  }

  onEnemyHit (bullet, enemy) {
    if (!controller.enemyActive) return
    enemy.blink()
    bullet.kill()
    game.sfx.lowHit.play()
    const data = controller.playerDamage
    const damage = data.damage
    const critical = data.critical
    const type = critical ? 'crit' : 'hit'
    enemy.health -= damage
    Text.combat(enemy, damage, type)
    if (enemy.health <= 0) this.onEnemyDeath(enemy)
  }

  onEnemyDeath (enemy) {
    enemy.onDeath()
    window.setTimeout(() => Main.createEnemy(enemy), 2000)
  }
}
