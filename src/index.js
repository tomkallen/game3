import Game from './game'
import WebFont from 'webfontloader'

const WebFontConfig = {
  active () { Game },
  google: {
    families: ['Nanum Gothic', 'Press Start 2P', 'Monoton', 'Text Me One']
  }
}

WebFont.load(WebFontConfig)
