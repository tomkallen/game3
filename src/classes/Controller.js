import game from '../game'
import Projectile from './Projectile'

class Controller {
  constructor () {

    // Levels
    this.gameLevel = 1
    this.playerLevel = 1
    this.playerXpStep = 0
    this.baseStepsForLevel = 5
    this.readyForNextLevel = false
    this.autoLevelUp = true

    // Waves
    this.currentWave = 1
    this.baseWaveCount = 5

    // Gold
    this.gold = 0

    // Enemy dmg & hp
    this.enemyActive = false
    this.enemyKilled = false

    this.enemyDamageModifier = 1.06
    this.enemyHpModifier = 1.06
    this.enemyGoldModifier = 1.05
    this.baseEnemyDamage = 2
    this.baseEnemyHp = 30
    this.baseEnemyGold = 2

    // Player dmg & hp
    this.playerCritModifier = 2
    this.playerCritChance = 0.05
    this.playerDamageModifier = 1.02
    this.playerProjectileSpeed = 550
    this.basePlayerDamage = 12
    this.basePlayerHp = 100
    this.playerHPModifier = 1.02
  }

  get enemyHp () {
    return this.baseEnemyHp * Math.round((Math.pow(this.gameLevel, this.enemyHpModifier)))
  }

  get playerHp () {
    return this.basePlayerHp * Math.round((Math.pow(this.playerLevel, this.playerHPModifier)))
  }

  get enemyDamage () {
    return this.baseEnemyDamage * Math.round((Math.pow(this.gameLevel, this.enemyDamageModifier)))
  }

  get enemyGold () {
    return this.baseEnemyGold * Math.round((Math.pow(this.gameLevel, this.enemyGoldModifier)))
  }

  get playerDamage () {
    let damage = this.basePlayerDamage * Math.round((Math.pow(this.playerLevel, this.playerDamageModifier)))
    if (Math.random() <= this.playerCritChance) damage *= this.playerCritModifier
    return damage
  }

  get waveCountForLevel () {
    return this.baseWaveCount
  }

  get level () {
    return this.gameLevel
  }

  onEnemyKill () {
    game.log('Enemy dies')
    this.enemyActive = false
    this.addGold()
    this.currentWave += 1
    if (this.currentWave > this.waveCountForLevel) {
      this.readyForNextLevel = true
      if (this.autoLevelUp) this.levelUpGame()
      else this.currentWave = this.waveCountForLevel
    }
  }

  levelUpGame () {
    game.log('Next level')
    this.gameLevel++
    this.currentWave = 1
    this.readyForNextLevel = false
  }

  addGold () {
    game.log(`Got ${this.enemyGold} gold`)
    this.gold += this.enemyGold
  }

  increasePlayerXp () {
    const stepsRequired = this.baseStepsForLevel * Math.floor(this.gameLevel / 100)
    this.playerXpStep += 1
    if (this.playerXpStep > stepsRequired) {
      this.playerXpStep = 0
      this.playerLevel += 1
    }
  }

  update () {
    game.physics.arcade.overlap(this, Projectile, () => console.log(1))
  }
}

export default new Controller()