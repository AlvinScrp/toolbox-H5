<template>
  <div class="canvas-editor">
    <div class="toolbar">
      <el-button-group>
        <el-button size="small" @click="addText"> <i class="el-icon-edit"></i> 添加文字 </el-button>
        <el-upload
          class="upload-button"
          action="#"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleImageUpload"
        >
          <el-button size="small"> <i class="el-icon-picture"></i> 添加图片 </el-button>
        </el-upload>
        <el-button size="small" @click="addArrow">
          <i class="el-icon-right"></i> 添加箭头
        </el-button>
        <el-button size="small" @click="addLine">
          <i class="el-icon-minus"></i> 添加线段
        </el-button>
      </el-button-group>
      <el-button size="small" @click="exportCanvas" type="primary">
        <i class="el-icon-download"></i> 导出图片
      </el-button>
    </div>

    <div class="content">
      <div class="canvas-wrapper">
        <div class="canvas-container" :style="canvasStyle">
          <canvas ref="canvas"></canvas>
          <!-- 添加调整大小的手柄 -->
          <div
            class="resize-handle"
            @mousedown="startResize"
            :style="{ cursor: isResizing ? 'grabbing' : 'grab' }"
          ></div>
        </div>
        <div class="canvas-size">
          {{ Math.round(canvasWidth) }} x {{ Math.round(canvasHeight) }}
        </div>
      </div>
      <!-- 样式控制面板 -->
      <div class="style-panel">
        <div class="panel-section" v-if="isText">
          <div class="section-title">文字样式</div>
          <el-color-picker
            size="small"
            v-model="textColor"
            show-alpha
            @change="updateTextColor"
          ></el-color-picker>
          <el-color-picker
            size="small"
            v-model="backgroundColor"
            show-alpha
            @change="updateBackgroundColor"
          ></el-color-picker>
          <el-color-picker
            size="small"
            v-model="strokeColor"
            show-alpha
            @change="updateStrokeColor"
          ></el-color-picker>
          <el-input-number
            v-model="strokeWidth"
            :min="0"
            :max="10"
            :step="0.5"
            size="small"
            @change="updateStrokeWidth"
          ></el-input-number>
        </div>
        <div class="panel-section" v-if="isArrowOrLine">
          <div class="section-title">线条样式</div>
          <el-color-picker
            size="small"
            v-model="lineColor"
            show-alpha
            @change="updateLineColor"
          ></el-color-picker>
          <el-input-number
            v-model="lineWidth"
            :min="1"
            :max="20"
            :step="1"
            size="small"
            @change="updateLineWidth"
          ></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric';

export default {
  name: 'CanvasEditor',
  data() {
    return {
      canvas: null,
      canvasWidth: 800,
      canvasHeight: 600,
      activeObject: null,
      // 文字样式
      textColor: '#000000',
      backgroundColor: 'transparent',
      strokeColor: 'transparent',
      strokeWidth: 0,
      // 线条样式
      lineColor: '#000000',
      lineWidth: 2,
      // 画布调整大小相关
      isResizing: false,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0
    };
  },
  computed: {
    isText() {
      return this.activeObject && this.activeObject.type === 'i-text';
    },
    isArrowOrLine() {
      return (
        this.activeObject &&
        (this.activeObject.type === 'path' || this.activeObject.type === 'line')
      );
    },
    canvasStyle() {
      return {
        width: `${this.canvasWidth}px`,
        height: `${this.canvasHeight}px`
      };
    }
  },
  mounted() {
    this.initCanvas();
    // 添加全局鼠标事件监听
    window.addEventListener('mousemove', this.handleResize);
    window.addEventListener('mouseup', this.stopResize);
  },
  beforeDestroy() {
    // 移除全局事件监听
    window.removeEventListener('mousemove', this.handleResize);
    window.removeEventListener('mouseup', this.stopResize);
    if (this.canvas) {
      this.canvas.dispose();
    }
  },
  methods: {
    initCanvas() {
      this.canvas = new fabric.Canvas(this.$refs.canvas, {
        width: this.canvasWidth,
        height: this.canvasHeight,
        backgroundColor: '#ffffff'
      });

      // 启用画布元素选择
      this.canvas.selection = true;

      // 监听选中对象变化
      this.canvas.on('selection:created', (e) => this.handleSelection(e));
      this.canvas.on('selection:updated', (e) => this.handleSelection(e));
      this.canvas.on('selection:cleared', () => {
        this.activeObject = null;
      });
    },

    handleSelection(e) {
      this.activeObject = e.selected[0];
      if (this.isText) {
        this.textColor = this.activeObject.fill;
        this.backgroundColor = this.activeObject.backgroundColor || 'transparent';
        this.strokeColor = this.activeObject.stroke || 'transparent';
        this.strokeWidth = this.activeObject.strokeWidth || 0;
      } else if (this.isArrowOrLine) {
        this.lineColor = this.activeObject.stroke;
        this.lineWidth = this.activeObject.strokeWidth;
      }
    },

    addText() {
      const text = new fabric.IText('双击编辑文字', {
        left: 100,
        top: 100,
        fontSize: 20,
        fill: this.textColor,
        backgroundColor: this.backgroundColor,
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth
      });
      this.canvas.add(text);
      this.canvas.setActiveObject(text);
    },

    handleImageUpload(file) {
      if (!file.raw) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          const scale = Math.min(
            (this.canvasWidth * 0.5) / img.width,
            (this.canvasHeight * 0.5) / img.height
          );
          img.scale(scale);
          img.set({
            left: 50,
            top: 50
          });
          this.canvas.add(img);
          this.canvas.setActiveObject(img);
        });
      };
      reader.readAsDataURL(file.raw);
    },

    addArrow() {
      const arrow = new fabric.Path('M 0 0 L 200 0 L 190 -5 M 200 0 L 190 5', {
        left: 100,
        top: 100,
        stroke: this.lineColor,
        strokeWidth: this.lineWidth,
        fill: 'transparent'
      });
      this.canvas.add(arrow);
      this.canvas.setActiveObject(arrow);
    },

    addLine() {
      const line = new fabric.Line([50, 50, 200, 50], {
        stroke: this.lineColor,
        strokeWidth: this.lineWidth
      });
      this.canvas.add(line);
      this.canvas.setActiveObject(line);
    },

    // 样式更新方法
    updateTextColor(color) {
      if (this.activeObject && this.isText) {
        this.activeObject.set('fill', color);
        this.canvas.renderAll();
      }
    },

    updateBackgroundColor(color) {
      if (this.activeObject && this.isText) {
        this.activeObject.set('backgroundColor', color);
        this.canvas.renderAll();
      }
    },

    updateStrokeColor(color) {
      if (this.activeObject && this.isText) {
        this.activeObject.set('stroke', color);
        this.canvas.renderAll();
      }
    },

    updateStrokeWidth(width) {
      if (this.activeObject && this.isText) {
        this.activeObject.set('strokeWidth', width);
        this.canvas.renderAll();
      }
    },

    updateLineColor(color) {
      if (this.activeObject && this.isArrowOrLine) {
        this.activeObject.set('stroke', color);
        this.canvas.renderAll();
      }
    },

    updateLineWidth(width) {
      if (this.activeObject && this.isArrowOrLine) {
        this.activeObject.set('strokeWidth', width);
        this.canvas.renderAll();
      }
    },

    exportCanvas() {
      const dataUrl = this.canvas.toDataURL({
        format: 'png',
        quality: 1
      });

      const link = document.createElement('a');
      link.download = '画布导出.png';
      link.href = dataUrl;
      link.click();
    },

    // 开始调整大小
    startResize(e) {
      this.isResizing = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startWidth = this.canvasWidth;
      this.startHeight = this.canvasHeight;
    },

    // 调整大小过程
    handleResize(e) {
      if (!this.isResizing) return;

      const deltaX = e.clientX - this.startX;
      const deltaY = e.clientY - this.startY;

      // 计算新的画布大小，设置最小和最大限制
      const newWidth = Math.max(300, Math.min(2000, this.startWidth + deltaX));
      const newHeight = Math.max(300, Math.min(2000, this.startHeight + deltaY));

      // 更新画布大小
      this.canvasWidth = newWidth;
      this.canvasHeight = newHeight;
      this.canvas.setDimensions({ width: newWidth, height: newHeight });
    },

    // 停止调整大小
    stopResize() {
      this.isResizing = false;
    }
  }
};
</script>

<style lang="less" scoped>
.canvas-editor {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .toolbar {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    padding: 10px;
    background: #f5f7fa;
    border-radius: 4px;

    .upload-button {
      display: inline-block;
    }
  }

  .content {
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 100%;


    .canvas-wrapper {
      flex-grow: 1;
      flex-shrink: 1;
      position: relative;


      .canvas-container {
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        overflow: hidden;
        position: relative;

        canvas {
          display: block;
        }

        .resize-handle {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, transparent 50%, #409EFF 50%);
          cursor: grab;
          z-index: 100;

          &:hover {
            background: linear-gradient(135deg, transparent 50%, #66b1ff 50%);
          }
        }
      }

      .canvas-size {
        position: absolute;
        right: 0;
        bottom: -25px;
        font-size: 12px;
        color: #909399;
      }
    }

    .style-panel {
      flex-grow: 0;
      flex-shrink: 0;
      background: #f5f7fa;
      padding: 15px;
      width: 100px;
      border-radius: 4px;
      display: flex;
      gap: 20px;

      .panel-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        .section-title {
          font-size: 14px;
          color: #606266;
          margin-right: 10px;
        }
      }
    }
  }
}

:deep(.el-upload) {
  display: inline-block;
}

:deep(.el-color-picker__trigger) {
  width: 24px;
  height: 24px;
  padding: 2px;
}

:deep(.el-input-number) {
  width: 100px;
}
</style>
