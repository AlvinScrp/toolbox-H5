<template>
  <div class="container">
    <span>输入:</span>
    <div>
      <textarea placeholder="字符串" type="text" cols="80" rows="6" ref="input" v-model="sourceText" />
    </div>
    <div>
      <input style="color:red;" type="checkbox" id="checkbox" v-model="uppercase">
      <label for="checkbox">{{ uppercase ? "大写" : "小写" }}</label>
    </div>
    <div>
      <span class="label">MD5:</span>
      <span class="result"> {{ md5 }}</span>
    </div>
    <div>
      <span class="label">SHA1:</span>
      <span class="result"> {{ sha1 }}</span>
    </div>
    <div>
      <span class="label">SHA256:</span>
      <span class="result">{{ sha256 }}</span>
    </div>
    <div>
      <span class="label">SHA512:</span>
      <span class="result">{{ sha512 }}</span>
    </div>
  </div>
</template>

<script>
const CryptoJS = require('crypto-js')
export default {
  data () {
    return {
      sourceText: '',
      uppercase: true,
      md5: '',
      sha1: '',
      sha256: '',
      sha512: ''
    }
  },
  watch: {
    sourceText: {
      handler (newValue, oldValue) {
        this.hashes()
      }
    },
    uppercase: {
      handler (newValue, oldValue) {
        this.hashes()
      }
    }
  },
  methods: {

    hashes () {
      const text = this.sourceText
      this.md5 = this.hash(text, CryptoJS.MD5)
      this.sha1 = this.hash(text, CryptoJS.SHA1)
      this.sha256 = this.hash(text, CryptoJS.SHA256)
      this.sha512 = this.hash(text, CryptoJS.SHA512)
    },
    hash (text, hashFunc) {
      const hashValue = text ? hashFunc(text).toString() : ''
      return this.uppercase ? hashValue.toUpperCase() : hashValue
    }
  },
  mounted () {
    this.$refs.input.focus()
  }
}
</script>
<style lang="less" scoped>
.container {


  textarea{
  font-size: 15px;
  outline: none;
  border: 2px solid #e3dddd;
 }

 textarea:focus{
  outline: none;
  border: 2px solid var(--primary-color);
 }

  .label {}

  .result {
    padding: 10px;
    font-size: 16px;
    line-height: 1.6;
    color: var(--primary-color);
  }
}
</style>
