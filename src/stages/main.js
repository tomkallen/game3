import BasicBullet from '../classes/BasicBullet'
import game, { HealthBar } from '../game'
import { Player, Enemy, GameObject, Pool } from '../classes'
import controller from '../classes/Controller'

let gameTimer = 0

const style = {font: 'bold 16px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle'}

export default class Main {
  create () {
    new GameObject('background_1', 0).classSpawnOne(0, 0)

    Main.createPlayer()
    Main.createEnemy()
    Main.createXPBar()
    Main.createButtons()
    Main.createText()
    game.projectiles = new Pool(BasicBullet, {size: 50, name: 'player bullets', sprites: ['basic bullet']})
  }

  static onLevelUpClick () {
    if (controller.player.gold >= controller.upgradeCost) controller.upgrade()
  }

  static onNextLevelClick () {
    game.buttons.nextLevel.visible = true
    controller.levelUpGame()
    game.enemy.onNextLevel()
  }

  update () {
    const {world} = controller
    if (controller.readyForNextLevel) game.buttons.nextLevel.visible = true
    if (controller.player.gold < controller.upgradeCost) {
      game.buttons.upgrade.setAll('tint', 0x555555)
    } else game.buttons.upgrade.setAll('tint', 0xffffff)

    Main.fire()
    game.physics.arcade.overlap(
      game.projectiles,
      game.enemy,
      (enemy, bullet) => enemy.onHit(bullet))

    game.bars.xp.setPercent(Math.round(controller.player.xp / controller.player.xpNeeded * 100))
    game.textController.worldInfo.text = `Wave ${world.wave} / ${world.wavesPerZone} | Zone ${world.zone} / ${world.zonesPerLevel} | World ${world.level}`
    game.textController.progress.text = `Level ${controller.player.level}, upgrade ${controller.currentUpgradeStep} / ${controller.stepsForLevel}`
    game.textController.stats.text = `damage ${controller.player.damage.current}`
    game.textController.cost.text = `Gold ${controller.player.gold}, cost ${controller.upgradeCost}`
  }

  static createPlayer () {
    const player = new Player('player')
    player.create(200, 620)
    game.player = player
  }

  static createEnemy () {
    const enemy = new Enemy('enemy')
    enemy.spawn()
    game.enemy = enemy
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
        width: 240,
        height: 16,
        x: 560,
        y: 160,
        bg: {color: '#651828'},
        bar: {color: '#30b920'}

      })
    }
  }

  static createButtons () {
    const nextLevel = game.add.group()
    nextLevel.add(game.add.button(300, 80, 'button96x32', Main.onNextLevelClick, this))
    nextLevel.add(game.add.text(330, 86, 'next', {font: '16px Arial', fill: '#000'}))

    const upgrade = game.add.group()
    upgrade.add(game.add.button(684, 144, 'button96x32', Main.onLevelUpClick, this))

    game.buttons = {nextLevel, upgrade}
    game.buttons.nextLevel.visible = false
  }

  static createText () {
    game.textController = {
      worldInfo: game.add.text(20, 40, '', style),
      upgradeText: game.add.text(702, 150, 'upgrade', {font: '16px Arial', fill: '#000'}),
      progress: game.add.text(500, 300, 'text', {font: '16px Arial', fill: '#fff'}),
      stats: game.add.text(500, 340, 'text', {font: '16px Arial', fill: '#fff'}),
      cost: game.add.text(500, 380, 'text', {font: '16px Arial', fill: '#fff'})
    }
  }
}
