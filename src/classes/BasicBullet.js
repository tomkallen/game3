import game from '../game'
import Projectile from './Projectile'

export default class BasicBullet extends Projectile {

  constructor (sprite) {
    super(sprite)
    this.game = game
    //this.sound = this.game.add.audio('gunShot')
  };

  spawn (x, y) {
    this.classReset(x, y)
  };
}