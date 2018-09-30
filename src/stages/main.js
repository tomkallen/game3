import BasicBullet from '../classes/BasicBullet'
import game from '../game'
import { Player, Enemy, GameObject, Pool } from '../classes'
import controller from '../classes/Controller'

let timer = 0
let spacing = 1000

export default class Main {
  create () {
    new GameObject('background_1', 0).classSpawnOne(0, 0)
    game.player = Main.createPlayer()
    game.enemy = Main.createEnemy()
  }

  update () {
    // var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }
    // game.add.text(130, 676, `Hi`, style)
    //game.player.weapon.
    Main.fire()
  }

  static createPlayer () {
    const player = new Player('player')
    player.weapon = new Pool(BasicBullet, {size: 50, name: 'player bullets', sprites: ['basic bullet']})
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
      const bullet = game.player.weapon.create(game.player.x, game.player.y)
      bullet.body.velocity.y = -controller.playerProjectileSpeed
      timer = game.time.now + spacing
    }
  }
}
