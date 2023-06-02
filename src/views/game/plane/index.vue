<script lang="ts" setup>
import { onMounted } from 'vue'
import { Game } from 'phaser'
import InitScene from './scene/initScene'
import GameScene from './scene/gameScene'

onMounted(() => {
  const viewWidth = document.body.clientWidth > 420 ? 420 : document.body.clientWidth
  const viewHeight = document.body.clientHeight > 812 ? 812 : document.body.clientHeight
  const DPR = window.devicePixelRatio
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: viewWidth,
    height: viewHeight,
    antialias: true,
    scale: {
      parent: 'game'
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    scene: [InitScene, GameScene],
    audio: {
      disableWebAudio: false
    }
  }
  new Game(config)
})
</script>
<template>
  <div id="game"></div>
</template>
<style>
/* #game {
  margin: 10px auto;
  padding: 0;
  width: 800px;
  height: 640px;
} */
</style>
