import BasicBullet from '../classes/BasicBullet'
import game from '../game'
import { Player, Enemy, GameObject, Pool } from '../classes'
import controller from '../classes/Controller'

let gameTimer = 0

const style = {font: 'bold 16px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle'}

export default class Main {
  create () {
    new GameObject('background_1', 0).classSpawnOne(0, 0)

    Main.createPlayer()
    Main.createEnemy()

    game.projectiles = new Pool(BasicBullet, {size: 50, name: 'player bullets', sprites: ['basic bullet']})
    const nextLevel = game.add.group()
    nextLevel.add(game.add.button(300, 80, 'button96x32', Main.onNextLevelClick, this))
    nextLevel.add(game.add.text(330, 86, 'next', {font: '16px Arial', fill: '#000'}))

    const upgrade = game.add.group()
    upgrade.add(game.add.button(630, 120, 'button96x32', Main.onLevelUpClick, this))

    game.buttons = {nextLevel, upgrade}
    game.buttons.nextLevel.visible = false
    game.buttons.upgrade.visible = false

    game.textController = {
      levelText: game.add.text(320, 40, '0', style),
      waveText: game.add.text(20, 40, 'Wave 1', style),
      upgradeText: game.add.text(650, 126, 'upgrade', {font: '16px Arial', fill: '#000'}),
      progress: game.add.text(500, 300, 'text', {font: '16px Arial', fill: '#fff'}),
      stats: game.add.text(500, 340, 'text', {font: '16px Arial', fill: '#fff'}),
      cost:  game.add.text(500, 380, 'text', {font: '16px Arial', fill: '#fff'}),
    }
  }

  static onLevelUpClick () {
    game.buttons.upgrade.visible = false
    controller.upgrade()
  }

  static onNextLevelClick () {
    game.buttons.nextLevel.visible = false
    controller.levelUpGame()
    game.enemy.onNextLevel()
  }

  update () {
    game.textController.levelText.text = `Level ${controller.level}`
    game.textController.waveText.text = `Wave ${controller.currentWave} / ${controller.waveCountForLevel}`
    game.textController.progress.text = `Level ${controller.player.level}, upgrade ${controller.currentUpgradeStep} / ${controller.stepsForLevel}`
    game.textController.stats.text = `hp ${controller.player.health.max} damage ${controller.player.damage.current}`
    game.textController.cost.text = `Gold ${controller.player.gold}, cost ${controller.upgradeCost} `

    if (controller.readyForNextLevel) game.buttons.nextLevel.visible = true
    if (controller.player.gold >= controller.upgradeCost) game.buttons.upgrade.visible = true

    Main.fire()
    game.physics.arcade.overlap(
      game.projectiles,
      game.enemy,
      (enemy, bullet) => enemy.onHit(bullet))
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
}
