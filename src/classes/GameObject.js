import game from '../game'

export default class GameObject extends Phaser.Sprite {
  constructor (sprite, anchor = 0.5) {
    super(game, 0, 0, sprite)
    this.game = game
    this.exists = false
    this.sprite = sprite
    this.anchor.setTo(anchor, anchor)
    this.game.physics.enable(this)
    this.body.allowGravity = false
    this.body.immovable = false
  }

  classReset (x, y) {
    this.reset(x, y)
    this.exists = true
    this.active = true
  }

  classSpawnOne (x, y) {
    this.x = x
    this.y = y
    this.exists = true
    this.active = true
    this.game.add.existing(this)
  }
}