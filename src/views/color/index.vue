<template>
  <div class="container">
    <Sketch :value="colors" @input="updateColors" />
    <div class="tips">
      <div class="big-color" :style="{ backgroundColor: rgba }"></div>
      <p><span :style="{ color: rgba }">这是一段文字颜色示例</span></p>
      <p><span>AHEX:&nbsp;&nbsp;</span><span class="tip">{{ ahex }}</span></p>
      <p><span>RGBA:&nbsp;&nbsp;</span><span class="tip">{{ rgba }}</span></p>
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'
export default {
  components: { Sketch },
  data () {
    return {
      colors: {
        hex: '#409EFF'
      },
      ahex: '#FF409EFF',
      rgba: 'rgba(64,158,255,1)'
    }
  },
  methods: {
    updateColors (color) {
      console.log(color)
      const hex8 = color.hex8
      const a = hex8.slice(-2)
      this.ahex = color.hex.slice(0, 1) + a + color.hex.slice(1)


      this.rgba = `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})`
    }
  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  .tips {
    .big-color {
      width: 150px;
      height: 150px;
    }

    .tip {
      font-size: 18px;
      font-weight: 700;
    }

    margin-left: 20px;
  }
}
</style>
