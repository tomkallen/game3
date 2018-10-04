import BasicBullet from '../classes/BasicBullet'
import game, { Text } from '../game'
import { Player, Enemy, GameObject, Pool } from '../classes'
import controller from '../classes/Controller'

let timer = 0
let spacing = 500

const style = {font: 'bold 16px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle'}

export default class Main {
  create () {
    new GameObject('background_1', 0).classSpawnOne(0, 0)
    game.projectiles = []
    game.player = Main.createPlayer()
    Main.createEnemy()
    game.projectiles = new Pool(BasicBullet, {size: 50, name: 'player bullets', sprites: ['basic bullet']})
    const nextLevel = game.add.group()
    nextLevel.add(game.add.button(300, 80, 'button96x32', this.onNextLevelClick, this))
    nextLevel.add(game.add.text(330, 86, 'next', {font: '16px Arial', fill: '#000'}))

    game.buttons = {nextLevel}
    game.buttons.nextLevel.visible = false

    game.textController = {
      levelText: game.add.text(320, 40, '0', style),
      goldText: game.add.text(600, 40, '0', style),
      waveText: game.add.text(20, 40, 'Wave 1', style)
    }
  }

  onNextLevelClick () {
    game.buttons.nextLevel.visible = false
    game.enemy.onDeath()
    controller.levelUpGame()
  }

  update () {
    game.textController.levelText.text = `Level ${controller.level}`
    game.textController.goldText.text = controller.gold
    game.textController.waveText.text = `Wave ${controller.currentWave} / ${controller.waveCountForLevel}`

    if (controller.readyForNextLevel) game.buttons.nextLevel.visible = true

    Main.fire()
    game.physics.arcade.overlap(
      game.projectiles,
      game.enemy,
      (enemy, bullet) => enemy.onHit(bullet))
  }

  static createPlayer () {
    const player = new Player('player')
    player.create(200, 580)
    return player
  }

  static createEnemy () {
    const enemy = new Enemy('enemy')
    enemy.spawn()
    game.enemy = enemy

  }

  static fire () {
    if (!controller.enemyActive) return
    if (game.time.now > timer || 0) {
      const bullet = game.projectiles.create(game.player.x, game.player.y)
      bullet.body.velocity.y = -controller.playerProjectileSpeed
      timer = game.time.now + spacing
    }
  }
}
