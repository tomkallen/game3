import BasicBullet from '../classes/BasicBullet'
import game, { HealthBar, Text } from '../game'
import { Player, Enemy, Pool } from '../classes'
import controller from '../classes/Controller'
import numeral from "numeral"

let gameTimer = 0

export default class Main {
  create () {
    game.stage.backgroundColor = '#657e83'
    Main.createPlayer()
    Main.createXPBar()
    Main.createText()
    Main.createEnemy()
    game.projectiles = new Pool(BasicBullet, {size: 50, name: 'player bullets', sprites: ['basic bullet']})
    Text.level('World 1')
  }

  update () {
    const {world} = controller
    Main.renderBars()
    Main.fire()
    game.physics.arcade.overlap(game.projectiles, game.enemy, (e, b) => this.onEnemyHit(e, b))
    game.textController.worldInfo.text = `Wave ${world.wave} / ${world.wavesPerZone} — Zone ${world.zone} / ${world.zonesPerLevel} — World ${world.level}`
    game.textController.gold.text = `Gold:  ${numeral(controller.player.gold).format('0.[00]a')}`
  }

  static createPlayer () {
    game.player = new Player('player').create(200, 660)
  }

  static createEnemy (oldEnemy) {
    game.enemy = new Enemy('enemy').spawn()
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
      worldInfo: game.add.text(460, 16, '', Text.styles.basic),
      enemyHP: game.add.text(20, 80, '', Text.styles.basic),
      gold: game.add.text(480, 660, `Gold:  0`, Text.styles.ui)
    }
  }

  static renderBars () {
    game.bars.xp.setPercent(Math.round(controller.player.xp / controller.player.xpNeeded * 100))
  }

  onEnemyHit (enemy, bullet) {
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
    window.setTimeout(() => Main.createEnemy(enemy), 200)
  }
}
