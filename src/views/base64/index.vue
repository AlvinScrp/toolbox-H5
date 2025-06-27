<template>
  <div class="container">
    <textarea
      class="text"
      ref="sourceArea"
      name=""
      id=""
      cols="100"
      rows="8"
      v-model="source"
      placeholder="原始字符串"
    ></textarea>
    <div class="options">
      <!-- <div class="option" v-on:click="handleEncode()" >⬇编码</div>
  <div class="option">⬆解码</div> -->
      <div class="option">⬇⬆</div>
    </div>
    <textarea
      class="text"
      name=""
      id=""
      cols="100"
      rows="8"
      v-model="encode"
      placeholder="编码后字符串"
    ></textarea>
  </div>
</template>

<script>
const { Buffer } = require('buffer');
export default {
  data() {
    return {
      source: '',
      encode: ''
    };
  },
  watch: {
    source: {
      handler(newValue, oldValue) {
        console.log(`'watch source handle ========= ${newValue}`);
        this.handleEncode();
      }
    },
    encode: {
      handler(newValue, oldValue) {
        console.log(`'watch encode handle ========= ${newValue}`);
        this.handleDecode();
      }
    }
  },
  methods: {
    handleEncode() {
      this.encode = Buffer.from(this.source, 'utf-8').toString('base64').replaceAll('%0A', '\n');
    },
    handleDecode() {
      const decodedString = Buffer.from(this.encode, 'base64').toString('utf-8');
      this.source = decodedString;
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
