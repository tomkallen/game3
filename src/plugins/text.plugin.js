import game from '../game'

export const Text = {
  level: function (t, color) {
    const text = game.add.text(game.width / 4, game.height / 2, t, {
      font: 'Arial',
      fontSize: '24px',
      fill: color,
      align: 'center',
      stroke: '#000000',
      strokeThickness: 4
    })
    text.anchor.set(0.5)
    game.add.tween(text.scale).to({x: 2, y: 2}, 1000, 'Linear', true)
    game.add.tween(text).to({alpha: 0}, 1000, 'Linear', true)
  },

  combat: function (object, message, event) {
    let style
    let direction
    let x = object.body.x - 75
    let y = object.body.y + 50
    switch (event) {
      case 'crit':
        style = {
          font: '32px Arial',
          fill: '#ff0000',
          align: 'center',
          stroke: '#000000',
          strokeThickness: 6
        }
        direction = {y: y - 60, alpha: 0}
        break

      case 'hit':
        style = {
          font: '24px Arial',
          fill: '#fdffb5',
          align: 'center',
          stroke: '#000000',
          strokeThickness: 3
        }
        direction = {y: y - 100, alpha: 0}
        break

      case 'playerHit':
        style = {
          font: '20px Arial',
          fill: '#22ff22',
          align: 'center',
          stroke: '#000000',
          strokeThickness: 3
        }
        direction = {y: y - 100, alpha: 0}
        break
      case 'info':
        style = {
          font: '30px Arial',
          fill: 'yellow',
          align: 'center',
          stroke: '#000000',
          strokeThickness: 3
        }
        direction = {y: y + 100, alpha: 0}

        break
    }

    const text = game.add.text(x, y, message, style)
    text.anchor.set(0.5)
    const tween = game.add.tween(text).to(direction, 1000, 'Linear', true)
    tween.onComplete.addOnce(() => text.destroy())
  },
  styles: {
    basic: {font: '12px Arial', fill: '#fff', align: 'center'}
  }
}