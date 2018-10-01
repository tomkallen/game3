import BasicBullet from '../classes/BasicBullet'
import game from '../game'
import { Player, Enemy, GameObject, Pool } from '../classes'
import controller from '../classes/Controller'

let timer = 0
let spacing = 500

const style = { font: 'bold 24px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }

export default class Main {
  create () {
    new GameObject('background_1', 0).classSpawnOne(0, 0)
    game.projectiles = []
    game.player = Main.createPlayer()
    game.enemy = Main.createEnemy()
    game.projectiles.push(
      new Pool(BasicBullet, {size: 50, name: 'player bullets', sprites: ['basic bullet']})
    )
    game.textController = {
      levelText: game.add.text(200, 40, '0', style)
    }

  }

  update () {
    game.textController.levelText.text = controller.level
    Main.fire()
    game.physics.arcade.overlap(
      game.projectiles,
      game.enemy,
      (enemy, bullet) => enemy.onHit(bullet))
  }

  static createPlayer () {
    const player = new Player('player')
    player.create(200, 620)
    return player
  }

  static createEnemy () {
    const enemy = new Enemy('enemy')
    enemy.spawn(200, 120)
    return enemy
  }

  static fire () {
    if (game.time.now > timer || 0) {
      const bullet = game.projectiles[0].create(game.player.x, game.player.y)
      bullet.body.velocity.y = -controller.playerProjectileSpeed
      timer = game.time.now + spacing
    }
  }
}
