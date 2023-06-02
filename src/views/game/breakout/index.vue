<script lang="ts" setup>
import { onMounted } from 'vue'
import { Game } from 'phaser'
import Breakout from './breakout'

onMounted(() => {
  const config: Phaser.Types.Core.GameConfig = {
    parent: 'game',
    width: 800,
    height: 640,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { y: 0 }
      }
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: Breakout
  }

  new Game(config)
})
</script>

<template>
  <div id="game"></div>
</template>
<style scoped>
#game {
  margin: 10px auto;
  padding: 0;
  width: 800px;
  height: 640px;
}
</style>
