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
    this.playerLevel = 1
    this.playerDamageModifier = 1.02
    this.playerXpStep = 0
    this.playerProjectileSpeed = 550
    this.baseStepsForLevel = 5
    this.basePlayerDamage = 3
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

  get level () {
    return this.gameLevel
  }

  levelUpGame () {
    this.addGold()
    this.gameLevel++
  }

  addGold() {
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
}

export default new Controller()