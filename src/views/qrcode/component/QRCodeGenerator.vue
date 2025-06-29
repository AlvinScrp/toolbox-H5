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
        <el-input
          v-model="description"
          placeholder="二维码说明文本"
          class="description-input"
        ></el-input>
        <el-button type="primary" @click="downloadQR" :disabled="!text">下载二维码</el-button>
        <el-button type="success" @click="copyLink" :disabled="!text">复制链接</el-button>
      </div>
    </div>
    <div class="qr-display">
      <div class="qr-wrapper">
        <canvas ref="qrCanvas" :style="{ width: `${size}px`, height: `${size}px` }"></canvas>
        <div v-if="description" :style="{ width: `${size}px` }" class="qr-description">{{ description }}</div>
      </div>
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
      description: '',
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
      if (query.desc) {
        this.description = decodeURIComponent(query.desc);
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
      const defaultName = `二维码-${dayjs().format('YYYY-MM-DD-HH.mm.ss')}`;
      this.downloadForm.filename = defaultName;
      this.downloadDialogVisible = true;
    },

    confirmDownload() {
      const canvas = this.$refs.qrCanvas;
      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d');

      // 计算新画布的尺寸，为二维码留出底部空间显示说明文本
      const padding = 20;
      const lineHeight = 20;

      // 设置字体以便计算文本宽度
      ctx.font = '15px Arial';

      // 计算文本换行
      const maxWidth = this.size - 20; // 左右各留10px边距
      let lines = [];
      if (this.description) {
        const words = this.description.split('');
        let currentLine = words[0] || '';

        for (let i = 1; i < words.length; i++) {
          const word = words[i];
          const width = ctx.measureText(currentLine + word).width;
          if (width < maxWidth) {
            currentLine += word;
          } else {
            lines.push(currentLine);
            currentLine = word;
          }
        }
        lines.push(currentLine);
        // 最多显示两行
        lines = lines.slice(0, 2);
      }

      const descriptionHeight = lines.length ? (lines.length * lineHeight + padding) : 0;
      tempCanvas.width = this.size;
      tempCanvas.height = this.size + descriptionHeight + padding;

      // 绘制白色背景
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // 绘制二维码
      ctx.drawImage(canvas, 0, 0);

      // 如果有说明文本，绘制在底部
      if (lines.length) {
        ctx.font = '15px Arial';
        ctx.fillStyle = '#ff0000';
        ctx.textAlign = 'center';
        lines.forEach((line, index) => {
          ctx.fillText(line, tempCanvas.width / 2, this.size + padding + (index * lineHeight));
        });
      }

      const link = document.createElement('a');
      const filename = this.downloadForm.filename.trim() || `二维码-${dayjs().format('YYYY-MM-DD-HH.mm.ss')}`;
      link.download = `${filename}.png`;
      link.href = tempCanvas.toDataURL('image/png');
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

    .description-input {
      width: 250px;
    }
  }
}

.qr-display {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;

  .qr-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    canvas {
      display: block;
    }

    .qr-description {
      color: #ff0000;
      font-size: 15px;
      text-align: center;
      word-break: break-all;
      line-height: 1.3;
      max-height: 40px;
      overflow: hidden;
      padding: 0 10px;
    }
  }
}

:deep(.el-select) {
  width: 150px;
}
</style>
