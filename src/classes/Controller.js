import game from '../game'

class Controller {
  constructor () {
    this.gameLevel = 1
    this.playerLevel = 1

    this.gold = 0

    this.enemyDamageModifier = 1.06
    this.enemyHpModifier = 1.06
    this.enemyGoldModifier = 1.05
    this.baseEnemyDamage = 2
    this.baseEnemyHp = 100
    this.baseEnemyGold = 2

    this.playerCritModifier = 2
    this.playerCritChance = 0.05
    this.basePlayerDamage = 3
    this.playerLevel = 1
    this.playerDamageModifier = 1.02
    this.baseStepsForLevel = 5
    this.playerXpStep = 0
  }

  get enemyHp () {
    return this.baseEnemyHp * (Math.pow(this.gameLevel, this.enemyHpModifier))
  }

  get enemyDamage () {
    return this.baseEnemyDamage * (Math.pow(this.gameLevel, this.enemyDamageModifier))
  }

  get enemyGold () {
    return this.baseEnemyGold * (Math.pow(this.gameLevel, this.enemyGoldModifier))
  }

  get playerDamage () {
    let damage = this.basePlayerDamage * (Math.pow(this.playerLevel, this.playerDamageModifier))
    if (Math.random() <= this.playerCritChance) damage *= this.playerCritModifier
    return damage
  }

  levelUpGame () {
    this.gameLevel++
  }

  increasePlayerXp () {
    const stepsRequired = this.baseStepsForLevel * Math.floor(this.gameLevel / 100)
    this.playerXpStep += 1
    if (this.playerXpStep > stepsRequired) {
      this.playerXpStep = 0
      this.playerLevel += 1
    }
  }
}

export default new Controller()