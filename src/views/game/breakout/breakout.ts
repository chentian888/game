import { Scene, Game } from 'phaser'

class Example extends Scene {
  constructor() {
    super('Example')
  }
}

const config: Phaser.Types.Core.GameConfig = {
  parent: 'game',
  width: 800,
  height: 600,
  scene: Example
}

new Game(config)
