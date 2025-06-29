<template>
  <div class="generator-container">
    <div class="input-area">
      <el-input
        v-model="text"
        placeholder="请输入链接或文本"
        type="textarea"
        :rows="4"
        @input="generateQR"
      ></el-input>
      <div class="options">
        <el-select v-model="size" placeholder="二维码大小" @change="generateQR">
          <el-option label="小200*200" :value="200"></el-option>
          <el-option label="中250*250" :value="250"></el-option>
          <el-option label="大300*300" :value="300"></el-option>
        </el-select>
        <el-button type="primary" @click="downloadQR" :disabled="!text"> 下载二维码 </el-button>
        <el-button type="success" @click="copyLink" :disabled="!text">复制链接</el-button>
      </div>
    </div>
    <div class="qr-display">
      <canvas ref="qrCanvas" :style="{ width: `${size}px`, height: `${size}px` }"></canvas>
    </div>

    <!-- 下载命名对话框 -->
    <el-dialog
      title="下载二维码"
      :visible.sync="downloadDialogVisible"
      width="400px"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-form :model="downloadForm" label-width="80px">
        <el-form-item label="文件名">
          <el-input v-model="downloadForm.filename" placeholder="请输入文件名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downloadDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDownload">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import dayjs from 'dayjs';

export default {
  name: 'QRCodeGenerator',
  data() {
    return {
      text: '',
      size: 300,
      downloadDialogVisible: false,
      downloadForm: {
        filename: ''
      }
    };
  },
  created() {
    // 检查URL参数
    const query = this.$route.query;
    if (query.text || query.data) {
      this.text = decodeURIComponent(query.text || query.data);
      if (query.size) {
        this.size = parseInt(query.size) || 300;
      }
      this.$nextTick(() => {
        this.generateQR();
      });
    }
  },
  methods: {
    async generateQR() {
      if (!this.text) {
        return;
      }
      try {
        await QRCode.toCanvas(this.$refs.qrCanvas, this.text, {
          width: this.size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        });
      } catch (err) {
        this.$message.error('生成二维码失败');
        console.error(err);
      }
    },

    downloadQR() {
      if (!this.text) return;

      // 设置默认文件名
      const defaultName = `二维码-${dayjs().format('YYYY-MM-DD-HHmmss')}`;
      this.downloadForm.filename = defaultName;
      this.downloadDialogVisible = true;
    },

    confirmDownload() {
      const canvas = this.$refs.qrCanvas;
      const link = document.createElement('a');
      const filename = this.downloadForm.filename.trim() || `二维码-${dayjs().format('YYYY-MM-DD-HHmmss')}`;
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      this.downloadDialogVisible = false;
    },

    copyLink() {
      if (!this.text) return '';

      const textarea = document.createElement('textarea');
      textarea.value = this.text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      this.$message.success('已复制到剪贴板');
    }
  }
};
</script>

<style lang="less" scoped>
.input-area {
  margin-bottom: 20px;

  .options {
    margin-top: 10px;
    display: flex;
    gap: 10px;
  }
}

.qr-display {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;

  canvas {
    display: block;
  }
}

:deep(.el-select) {
  width: 150px;
}
</style>
