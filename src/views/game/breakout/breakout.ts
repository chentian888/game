import { Scene } from 'phaser'

export default class Breakout extends Scene {
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ball!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  violetBricks!: Phaser.Physics.Arcade.Group
  yellowBricks!: Phaser.Physics.Arcade.Group
  redBricks!: Phaser.Physics.Arcade.Group
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  openingText!: Phaser.GameObjects.Text
  gameOverText!: Phaser.GameObjects.Text
  playerWonText!: Phaser.GameObjects.Text

  gameStarted: boolean = false

  constructor() {
    super('breakout')
  }

  preload() {
    this.load.image('ball', new URL('./image/ball_32_32.png', import.meta.url).href)
    this.load.image('paddle', new URL('./image/paddle_128_32.png', import.meta.url).href)
    this.load.image('brick1', new URL('./image/brick1_64_32.png', import.meta.url).href)
    this.load.image('brick2', new URL('./image/brick2_64_32.png', import.meta.url).href)
    this.load.image('brick3', new URL('./image/brick3_64_32.png', import.meta.url).href)
  }

  create() {
    this.player = this.physics.add.sprite(400, 600, 'paddle')
    this.player.setCollideWorldBounds(true)
    this.player.setImmovable(true)
    this.ball = this.physics.add.sprite(400, 565, 'ball')
    this.ball.setCollideWorldBounds(true)
    this.ball.setBounce(1, 1)
    this.physics.world.checkCollision.down = false

    this.violetBricks = this.physics.add.group({
      key: 'brick1',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 140,
        stepX: 70
      }
    })
    this.yellowBricks = this.physics.add.group({
      key: 'brick2',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 90,
        stepX: 70
      }
    })
    this.redBricks = this.physics.add.group({
      key: 'brick3',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 40,
        stepX: 70
      }
    })
    const textCenterX = this.physics.world.bounds.width / 2
    const textCenterY = this.physics.world.bounds.height / 2
    const textStyle = {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '50px',
      color: '#fff'
    }
    this.openingText = this.add.text(textCenterX, textCenterY, '按下 SPACE 开始游戏', textStyle)
    this.openingText.setOrigin(0.5)

    this.gameOverText = this.add.text(textCenterX, textCenterY, '游戏结束', textStyle)
    this.gameOverText.setOrigin(0.5)
    this.gameOverText.setVisible(false)

    this.playerWonText = this.add.text(textCenterX, textCenterY, '成功', textStyle)
    this.playerWonText.setOrigin(0.5)
    this.playerWonText.setVisible(false)

    this.cursors = this.input.keyboard?.createCursorKeys()
    this.physics.add.collider(this.ball, this.violetBricks, this.hitBrick, () => {}, this)
    this.physics.add.collider(this.ball, this.yellowBricks, this.hitBrick, () => {}, this)
    this.physics.add.collider(this.ball, this.redBricks, this.hitBrick, () => {}, this)
    this.physics.add.collider(this.ball, this.player, this.hitPlayer, () => {}, this)
  }

  update(): void {
    if (this.isGameOver()) {
      // 失败
      this.gameOverText.setVisible(true)
      this.ball.disableBody(true, true)
    } else if (this.isWin()) {
      // 成功
      this.ball.disableBody(true, true)
      this.playerWonText.setVisible(true)
    } else {
      // 游戏进行中
      if (!this.gameStarted) {
        this.ball.setX(this.player.x)
      }
      if (this.cursors?.space.isDown) {
        this.gameStarted = true
        this.openingText.setVisible(false)
        this.ball.setVelocityY(-200)
      }
      this.player.setVelocityX(0)
      if (this.cursors?.left.isDown) {
        this.player.setVelocityX(-300)
      } else if (this.cursors?.right.isDown) {
        this.player.setVelocityX(300)
      }
    }
  }

  // 游戏是否结束
  isGameOver(): boolean {
    return this.ball.body.y > this.physics.world.bounds.height
  }

  // 游戏是否胜利
  isWin(): boolean {
    return !(
      this.violetBricks.countActive() +
      this.yellowBricks.countActive() +
      this.redBricks.countActive()
    )
  }

  // 小球和砖块碰撞回调
  hitBrick(
    ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    brick: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ): void {
    brick.destroy()
    if (ball.body.velocity.x === 0) {
      const random = Math.random()
      if (random > 0.5) {
        ball.setVelocityX(-150)
      } else {
        ball.setVelocityX(150)
      }
    }
  }

  // 小球和挡板碰撞回调
  hitPlayer(
    ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) {
    // Increase the velocity of the ball after it bounces
    ball.setVelocityY(ball.body.velocity.y - 5)

    const newXVelocity = Math.abs(ball.body.velocity.x) + 5
    // If the ball is to the left of the player, ensure the X-velocity is negative
    if (ball.x < player.x) {
      ball.setVelocityX(-newXVelocity)
    } else {
      ball.setVelocityX(newXVelocity)
    }
  }
}
