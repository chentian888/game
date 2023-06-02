const viewWidth = document.body.clientWidth > 420 ? 420 : document.body.clientWidth
const viewHeight = document.body.clientHeight > 812 ? 812 : document.body.clientHeight
const DPR = window.devicePixelRatio

// 创建场景，场景1（初始化游戏）
export default class InitScene extends Phaser.Scene {
  constructor() {
    super({ key: 'InitScene' })
  }
  // 开始按钮
  startBtn = null
  preload() {
    this.load.image('initBG', new URL('../image/startBG.png', import.meta.url).href)
    this.load.image('startBtn', new URL('../image/start_btn.png', import.meta.url).href)
  }
  create() {
    // 设置缩放让背景拉伸铺满全屏
    this.add
      .image(viewWidth / 2, viewHeight / 2, 'initBG')
      .setScale(viewWidth / 320, viewHeight / 568)
    this.startBtn = this.add
      .sprite(viewWidth / 2, viewHeight / 2 + 140, 'startBtn')
      .setInteractive()
      .setScale(0.5)
    this.startBtn.on('pointerup', () => {
      this.scene.start('GameScene')
      this.scene.sleep('InitScene')
    })
  }
  update() {}
}
