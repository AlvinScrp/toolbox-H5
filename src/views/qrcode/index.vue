<template>
  <div class="qrcode-container">
    <!-- 生成二维码部分 -->
    <div class="section generate-section">
      <h3>生成二维码</h3>
      <QRCodeGenerator />
    </div>

    <!-- 解析二维码部分 -->
    <div class="section scan-section">
      <h3>解析二维码</h3>
      <QRCodeScanner />
    </div>
  </div>
</template>

<script>
import QRCodeGenerator from './component/QRCodeGenerator.vue';
import QRCodeScanner from './component/QRCodeScanner.vue';

export default {
  name: 'QRCode',
  components: {
    QRCodeGenerator,
    QRCodeScanner
  }
};
</script>

<style lang="less" scoped>
.qrcode-container {
  padding:12px 0px;
  display: flex;
  gap: 12px;

  .section {
    flex: 1;
    min-width: 300px;
    background: #fff;
    padding:12px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    h3 {
      margin: 0 0 8px 0;
      color: #303133;
      font-size: 18px;
    }
  }
}
</style>
