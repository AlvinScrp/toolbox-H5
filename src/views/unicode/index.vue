<template>
  <div class="container">
    <textarea
      class="text"
      ref="sourceArea"
      name=""
      id=""
      cols="60"
      rows="6"
      v-model="sourceText"
      placeholder="请输入"
    ></textarea>
    <div class="options">
      <!-- <div class="option" v-on:click="handleEncode()" >⬇编码</div>
  <div class="option">⬆解码</div> -->
      <el-button class="option" v-on:click="toUnicode()">中文转unicode</el-button>
      <el-button class="option" v-on:click="toChinese()">unicode转中文</el-button>

    </div>
    <textarea
      class="text"
      name=""
      id=""
      cols="60"
      rows="6"
      v-model="resultText"
      placeholder="结果"
    ></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceText: '',
      resultText: ''
    };
  },

  methods: {
    toUnicode() {
      // 中文转unicode

      const source = this.sourceText;
      this.resultText = source.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code > 127) {
          return '\\u' + code.toString(16).padStart(4, '0');
        } else {
          return char;
        }
      }).join('');
    },
    toChinese() {
      // unicode转中文
      const source = this.sourceText.replace(/\\\\u/g, '\\u');
      this.resultText = source.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
        return String.fromCharCode(parseInt(grp, 16));
      });
    }
  },
  mounted() {
    this.$refs.sourceArea.focus();
  }
};
</script>
<style lang="less" scoped>
textarea {
  font-size: 15px;
  outline: none;
  border: 2px solid #e3dddd;
}

textarea:focus {
  outline: none;
  border: 2px solid var(--primary-color);
}

.options {
  display: flex;
  flex-direction: row;
  .option {
    margin: 2px 30px;
    color: var(--primary-color);
  }
}
</style>
