import game from '../game'
// import {GameObject, Flag, Pool, Blob, BasicBullet, HeavyBullet, Player, Spawner, Chest, Coin} from "../classes";

export default class Main {
  create () {

  }

  update () {
    this.add.text(130, 676, `Hi`)
  }

  reset () {
    game.state.start('Level')
  }
}
