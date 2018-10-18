import game from '../game'
import numeral from 'numeral'

export const Text = {
  level: function (t) {
    const text = game.add.text(game.width / 4, game.height / 2, t,{
      font: '46px Monoton',
      fill:  '#ffe6dc',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 3
    })
    text.anchor.set(0.5)
    game.add.tween(text).to({alpha: 0}, 3000, 'Linear', true)
  },
  combat: function (object, message, event) {
    let style
    let direction
    let x = object.body.x - 40
    let y = object.body.y + 80
    switch (event) {
      case 'crit':
        x = 380
        y = 60
        style = {font: '26px Monoton', fill: '#ff5c4f', align: 'right', strokeThickness: 3}
        direction = {alpha: 0}
        message = `–${numeral(message).format('0.[00]a')}!`
        break
      case 'hit':
        x = 380
        y = 60
        style = {font: '26px Monoton', fill: '#fff277', align: 'right', strokeThickness: 3}
        direction = {alpha: 0}
        message = `–${numeral(message).format('0.[00]a')}`
        break

      case 'gold':
        x = object.body.x + 75
        y = object.body.y + 75
        style = {
          font: '32px Text Me One',
          fill: '#ffdf6c',
          align: 'center'
        }
        direction = {x: x + 40, y: y + 100, alpha: 0}
        message = numeral(message).format('0.[00]a')
        break

      case 'info':
        style = {
          font: '46px Monoton',
          fill:  '#ffe6dc',
          align: 'center',
          stroke: '#000000',
          strokeThickness: 3
        }
        direction = {y: y + 100, alpha: 0}
        break
    }

    const text = game.add.text(x, y, message, style)
    text.anchor.set(1)
    const tween = game.add.tween(text).to(direction, 360, 'Linear', true)
    tween.onComplete.addOnce(() => text.destroy())
  },
  styles: {
    basic: {font: '18px Text Me One', fill: '#fff', align: 'center'},
    ui: {font: '26px Monoton', fill: '#ffe6dc', align: 'center', strokeThickness: 3}
  }
}