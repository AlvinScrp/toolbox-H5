<template>
  <div class="scanner-container">
    <!-- 上传区域 -->
    <div class="upload-section">
      <el-upload
        class="uploader"
        action="#"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="handleQRUpload"
        accept="image/*"
        drag
      >
        <div class="upload-trigger">
          <i class="el-icon-plus"></i>
          <div class="upload-text">点击或拖拽上传二维码图片</div>
        </div>
      </el-upload>
    </div>
    <div class="scan-result-title">解析结果</div>

    <div class="scan-result">
      <!-- 显示上传的图片 -->
      <div v-if="currentImage" class="preview-image">
        <img :src="currentImage" alt="上传的二维码" />
      </div>

      <!-- 右侧解析结果 -->
      <div v-if="decodedText" class="result-area">
        <el-input type="textarea" v-model="decodedText" :rows="4" readonly></el-input>
        <div class="action-buttons">
          <el-button type="primary" size="small" @click="copyText"> 复制内容 </el-button>
          <el-button
            type="primary"
            size="small"
            @click="openLink"
            v-if="isValidUrl(decodedText)"
          >
            打开链接
          </el-button>
        </div>
      </div>
    </div>

    <!-- 历史记录 -->
    <div v-if="history.length" class="history-section">
      <div class="history-title">
        <span>历史记录</span>
        <el-button type="text" @click="clearHistory">清空</el-button>
      </div>
      <div class="history-list">
        <div v-for="(item, index) in history" :key="index" class="history-item">
          <div class="history-image" @click="showLargeImage(item.image)">
            <img :src="item.image" alt="历史二维码" />
            <div class="image-hover-tip">点击查看大图</div>
          </div>
          <div class="history-content">
            <div class="history-text">{{ item.text }}</div>
            <div class="history-actions">
              <el-button type="text" size="mini" @click="copyHistoryText(item.text)">
                复制
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="openHistoryLink(item.text)"
                v-if="isValidUrl(item.text)"
              >
                打开链接
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 大图预览弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="auto"
      :modal="true"
      :show-close="true"
      :append-to-body="true"
      custom-class="qr-preview-dialog"
      center
    >
      <img :src="selectedImage" alt="二维码大图" class="large-preview-image" />
    </el-dialog>
  </div>
</template>

<script>
import jsQR from 'jsqr';

export default {
  name: 'QRCodeScanner',
  data() {
    return {
      decodedText: '',
      currentImage: '',
      history: [],
      dialogVisible: false,
      selectedImage: ''
    };
  },
  methods: {
    handleQRUpload(file) {
      if (!file.raw) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // 保存当前图片
          this.currentImage = e.target.result;

          // 创建canvas来处理图片
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // 获取图片数据
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            this.decodedText = code.data;
            // 添加到历史记录
            this.addToHistory(this.currentImage, code.data);
          } else {
            this.$message.error('未能识别二维码，请确保图片清晰');
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file.raw);
    },

    addToHistory(image, text) {
      this.history.unshift({ image, text });
      // 限制历史记录数量
      if (this.history.length > 10) {
        this.history.pop();
      }
    },

    clearHistory() {
      this.history = [];
    },

    copyText(text = this.decodedText) {
      if (!text) return;

      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      this.$message.success('已复制到剪贴板');
    },

    copyHistoryText(text) {
      this.copyText(text);
    },

    openLink(url = this.decodedText) {
      if (this.isValidUrl(url)) {
        window.open(url, '_blank');
      }
    },

    openHistoryLink(url) {
      this.openLink(url);
    },

    isValidUrl(str) {
      try {
        return Boolean(new URL(str));
      } catch {
        return false;
      }
    },

    showLargeImage(image) {
      this.selectedImage = image;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.scanner-container {
  .upload-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .scan-result-title {
    margin-top: 12px;
    margin-bottom: 6px;
  }

  .scan-result {
    display: flex;
    flex-direction: row;
    gap: 20px;

    .preview-image {
      width: 100px;
      height: 100px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }

    .result-area {
      flex: 1;

      .action-buttons {
        margin-top: 10px;
        display: flex;
        gap: 10px;
      }
    }
  }

  .history-section {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #ebeef5;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      color: #606266;
      font-size: 14px;
    }

    .history-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .history-item {
      display: flex;
      gap: 12px;
      padding: 8px;
      background: #f5f7fa;
      border-radius: 4px;

      .history-image {
        width: 40px;
        height: 40px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

          .image-hover-tip {
            opacity: 1;
          }
        }

        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .image-hover-tip {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          font-size: 10px;
          padding: 1px 0;
          text-align: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
      }

      .history-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .history-text {
          color: #606266;
          font-size: 13px;
          word-break: break-all;
          line-height: 1.3;
          margin-bottom: 4px;
        }

        .history-actions {
          display: flex;
          gap: 8px;

          :deep(.el-button--mini) {
            padding: 4px 8px;
          }
        }
      }
    }
  }
}

.upload-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #fafafa;

  &:hover {
    border-color: #409eff;
  }

  .el-icon-plus {
    font-size: 24px;
    color: #8c939d;
    margin-bottom: 8px;
  }

  .upload-text {
    color: #606266;
    font-size: 13px;
  }
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-dragger) {
  width: 100%;
  height: 100%;
}

:deep(.qr-preview-dialog) {
  .el-dialog__header {
    padding: 10px;
  }

  .el-dialog__body {
    padding: 10px;
  }

  .large-preview-image {
    max-width: 80vw;
    max-height: 80vh;
    object-fit: contain;
  }
}
</style>
