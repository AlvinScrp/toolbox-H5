<template>
  <div class="container">
    <div>
      <span class="label">十进制:</span>
      <input type="text" v-model="decimal" ref="decimalInput" />
    </div>
    <div>
      <span class="label">十六进制:</span>
      <input type="text" v-model="hex" />
    </div>
    <div>
      <span class="label">二进制:</span>
      <input type="text" v-model="binary" />
    </div>
    <div>
      <span class="label">二进制(格式化):</span>
      <input type="text" v-model="binaryFormat" readonly />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      decimal: '',
      hex: '',
      binary: '',
      binaryFormat: ''
    };
  },
  watch: {
    decimal: {
      handler(newValue, oldValue) {
        const decimalRegex = /^[0-9]+$/;
        const isDecimal = decimalRegex.test(newValue);
        console.log('isDecimal', newValue, isDecimal);
        if (!isDecimal) {
          this.decimal = '0';
        }
        const decimalNum = parseInt(this.decimal);
        this.binary = decimalNum.toString(2);
        this.binaryFormat = this.formatBinary(this.binary);
        this.hex = decimalNum.toString(16).toUpperCase();
        console.log('decimal to hex', this.decimal, this.hex);
      }
    },
    hex: {
      handler(newValue, oldValue) {
        const hexadecimalRegex = /^[0-9a-fA-F]+$/;
        const isHex = hexadecimalRegex.test(newValue);
        console.log('isHex', newValue, isHex);
        if (!isHex) {
          this.hex = '0';
        }
        this.decimal = parseInt(this.hex, 16);
        console.log(this.decimal);
      }
    },
    binary: {
      handler(newValue, oldValue) {
        // 只能输入0,1
        const binaryRegex = /^[01]+$/;
        const isBinary = binaryRegex.test(newValue);
        console.log('isBinary', newValue, isBinary);
        if (!isBinary) {
          this.binary = '0';
          this.binaryFormat = '0';
        }

        this.decimal = this.binary ? parseInt(this.binary, 2) : '';
      }
    }
  },
  methods: {
    formatBinary(binaryString) {
      // 将字符串从后往前每四位插入空格
      const reversedBinaryString = binaryString.split('').reverse().join('');
      const spacedBinaryString = reversedBinaryString.replace(/(.{4})/g, '$1 ').trim();
      return spacedBinaryString.split('').reverse().join('');
    }
  },
  mounted() {
    this.$refs.decimalInput.focus();
  }
};
</script>
<style lang="less" scoped>
.container {
  textarea {
    font-size: 15px;
  }

  .label {
    display: block;
    font-size: 15px;
    font-weight: 500;
  }

  input {
    height: 30px;
    width: 400px;
    margin-top: 4px;
    margin-bottom: 12px;
    background-color: #f1f1f1;
    font-size: 16px;
    outline: none;
    border-radius: 10px;
    border: 2px solid #ffffff;
    padding-left: 5px;
  }

  input:focus {
    outline: none;
    border: 2px solid var(--primary-color);
  }
}
</style>
