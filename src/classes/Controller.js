import game, { Text } from '../game'

const ENEMY_GOLD = 50
const ENEMY_GOLD_MODIFIER = 1.11
const ENEMY_HP = 25
const ENEMY_HP_MODIFIER = 1.125
const PLAYER_XP = 200
const PLAYER_XP_MODIFIER = 1.15

class Controller {

  constructor () {
    this.world = {
      level: 1,
      zone: 1,
      wave: 1,
      wavesPerZone: 2,
      zonesPerLevel: 100
    }

    this.readyForNextLevel = false
    this.respawnTimer = 250

    // Gold
    this.gold = 0

    // Enemy dmg & hp
    this.enemyActive = false

    // Player dmg & hp
    this.playerProjectileSpeed = 1500
    this.playerProjectileSpacing = 250

    this.player = {
      gold: 0,
      level: 1,
      xp: 0,
      xpNeeded: 100,
      damage: {
        current: 12,
        modifierPerUpgrade: 1.015,
        modifierPerLevel: 2
      },
      critical: {
        chance: 0.05,
        multiplier: 2
      }
    }
  }

  getEnemyGold () {
    return Math.round(ENEMY_GOLD * Math.pow(ENEMY_GOLD_MODIFIER, this.world.zone))
  }

  getKillsForLevel () {
    return Math.round(PLAYER_XP * Math.pow(PLAYER_XP_MODIFIER, this.player.level))
  }

  getEnemyHP () {
    return Math.round(ENEMY_HP * Math.pow(ENEMY_HP_MODIFIER, this.world.zone))
  }

  get playerDamage () {
    let damage = this.player.damage.current
    const critical = Math.random() <= this.player.critical.chance
    if (critical) damage *= this.player.critical.multiplier
    return {damage, critical}
  }

  onEnemyKill () {
    this.enemyActive = false
    this.addGold()
    this.player.xp += 1
    if (this.player.xp > this.player.xpNeeded) this.onPlayerLevelUp()
    this.world.wave += 1
    if (this.world.wave > this.world.wavesPerZone) {
      this.world.wave = 1
      this.world.zone += 1
      if (this.world.zone > this.world.zonesPerLevel) this.onGameLevelChange()
    }
  }

  onGameLevelChange () {
    this.world.zone = 1
    this.world.level += 1
  }

  onPlayerLevelUp () {
    this.player.xp = 0
    this.player.level += 1
    this.player.xpNeeded = this.getKillsForLevel()
  }

  levelUpGame () {
    game.log('Next level')
    Text.level(`Next Level`, 'gold')
    this.readyForNextLevel = false
  }

  addGold () {
    game.log(`Got ${this.getEnemyGold()} gold`)
    this.player.gold += this.getEnemyGold()
  }
}

export default new Controller()