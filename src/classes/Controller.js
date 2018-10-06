import game, { Text } from '../game'
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
    this.respawnTimer = 500

    // Waves
    this.currentWave = 1
    this.baseWaveCount = 3

    // Gold
    this.gold = 0

    // Enemy dmg & hp
    this.enemyActive = false

    this.enemyDamageModifier = 1.2
    this.enemyHpModifier = 1.2
    this.enemyGoldModifier = 1.04
    this.baseEnemyDamage = 2
    this.baseEnemyHp = 50
    this.baseEnemyGold = 2

    // Player dmg & hp
    this.playerProjectileSpeed = 550
    this.playerProjectileSpacing = 750

    this.player = {
      gold: 0,
      level: 1,
      upgradesPerLevel: 5,
      damage: {
        current: 12,
        modifierPerUpgrade: 1.015,
        modifierPerLevel: 2
      },
      critical: {
        chance: 0.05,
        multiplier: 2
      },
      health: {
        current: 100,
        max: 100,
        modifierPerUpgrade: 1.015,
        modifierPerLevel: 2,
        regenRate: 1.02
      }
    }
  }

  get enemyHp () {
    return this.baseEnemyHp
  }

  get playerHp () {
    return this.player.health.current
  }

  get enemyDamage () {
    return this.baseEnemyDamage * Math.round((Math.pow(this.gameLevel, this.enemyDamageModifier)))
  }

  get enemyGold () {
    return this.baseEnemyGold * Math.round((Math.pow(this.gameLevel, this.enemyGoldModifier)))
  }

  get playerDamage () {
    let damage = this.player.damage.current
    const critical = Math.random() <= this.player.critical.chance
    if (critical) damage *= this.player.critical.multiplier
    return {damage, critical}
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
    Text.level(`Next Level`, 'gold')
    this.gameLevel++
    this.currentWave = 1
    this.readyForNextLevel = false
    this.baseEnemyHp = Math.round(this.baseEnemyHp * this.enemyHpModifier)
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