<template>
  <div class="markdown">
    <div class="upload-section">
      <el-upload
        class="upload-demo"
        drag
        :before-upload="beforeUpload"
        :show-file-list="false"
        accept=".md,.txt"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将Markdown文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传md/txt文件</div>
      </el-upload>
    </div>

    <div class="editor-section">
      <div class="toolbar">
        <el-button-group>
          <el-button 
            :type="mode === 'edit' ? 'primary' : ''"
            @click="mode = 'edit'"
            size="small"
          >
            编辑
          </el-button>
          <el-button 
            :type="mode === 'preview' ? 'primary' : ''"
            @click="mode = 'preview'"
            size="small"
          >
            预览
          </el-button>
          <el-button 
            :type="mode === 'split' ? 'primary' : ''"
            @click="mode = 'split'"
            size="small"
          >
            分屏
          </el-button>
        </el-button-group>
        <el-button @click="downloadMarkdown" size="small">
          <i class="el-icon-download"></i> 下载
        </el-button>
      </div>

      <div class="content-area" :class="mode">
        <div v-if="mode === 'edit' || mode === 'split'" class="editor-panel">
          <el-input
            type="textarea"
            v-model="markdownContent"
            placeholder="请输入Markdown内容..."
            :rows="20"
            resize="none"
          />
        </div>
        
        <div v-if="mode === 'preview' || mode === 'split'" class="preview-panel">
          <div class="markdown-body" v-html="renderedContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default {
  data() {
    return {
      markdownContent: '# Markdown 编辑器\n\n欢迎使用 Markdown 编辑器！\n\n## 功能特性\n\n- 📝 实时编辑\n- 👀 实时预览\n- 📱 分屏模式\n- 📤 文件上传\n- 💾 文件下载\n- 🎨 语法高亮\n- 🖼️ 响应式图片\n\n## 使用方法\n\n1. 上传 `.md` 文件\n2. 在编辑器中编写内容\n3. 实时查看预览效果\n4. 下载编辑后的文件\n\n```javascript\nconsole.log("Hello Markdown!");\n```\n\n> 这是一个引用块示例\n> 还比如n8n、dify、coze\n\n**粗体文本** 和 *斜体文本*\n\n## 图片测试\n\n![示例图片](https://via.placeholder.com/800x400/409eff/ffffff?text=Large+Image+800x400)\n\n![小图片](https://via.placeholder.com/600x300/67c23a/ffffff?text=Small+Image+600x300)\n\n- 列表项 1\n- 列表项 2\n- 列表项 3',
      mode: 'split'
    }
  },

  computed: {
    renderedContent() {
      const renderer = new marked.Renderer()
      
      // 自定义图片渲染器，实现响应式图片
      renderer.image = function(token) {
        // 兼容新版本marked.js的token对象格式
        const href = token.href || token
        const title = token.title || arguments[1] || ''
        const text = token.text || arguments[2] || ''
        
        return `<img src="${href}" alt="${text}" title="${title}" style="max-width: 100%; width: auto; height: auto; display: block; margin: 16px 0;" />`
      }
      
      return marked(this.markdownContent, {
        renderer: renderer,
        breaks: true,
        gfm: true,
        highlight: function(code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(code, { language: lang }).value
            } catch (__) {}
          }
          return hljs.highlightAuto(code).value
        }
      })
    }
  },

  mounted() {
    // 设置marked的默认选项
    marked.setOptions({
      breaks: true,
      gfm: true
    })
  },

  methods: {
    beforeUpload(file) {
      const isMarkdown = file.type === 'text/markdown' || file.name.endsWith('.md') || file.name.endsWith('.txt')
      
      if (!isMarkdown) {
        this.$message.error('只能上传 Markdown 文件!')
        return false
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        this.markdownContent = e.target.result
      }
      reader.readAsText(file)
      
      return false
    },

    downloadMarkdown() {
      const blob = new Blob([this.markdownContent], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'document.md'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style lang="less" scoped>
.markdown {
  padding: 20px;

  .upload-section {
    margin-bottom: 20px;
    
    .upload-demo {
      :deep(.el-upload-dragger) {
        width: 100%;
        height: 120px;
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        
        &:hover {
          border-color: var(--primary-color, #409eff);
        }
      }
    }
  }

  .editor-section {
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 10px;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .content-area {
      display: flex;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow: hidden;

      &.edit {
        .editor-panel {
          width: 100%;
        }
      }

      &.preview {
        .preview-panel {
          width: 100%;
        }
      }

      &.split {
        .editor-panel,
        .preview-panel {
          width: 50%;
        }
      }

      .editor-panel {
        border-right: 1px solid #dcdfe6;
        max-width: 700px;
        
        :deep(.el-textarea__inner) {
          border: none;
          border-radius: 0;
          resize: none;
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          line-height: 1.6;
        }
      }

      .preview-panel {
        background: #fff;
        overflow-y: auto;
        max-height: 600px;
        max-width: 700px;

        .markdown-body {
          padding: 20px;
          line-height: 1.6;
          color: #333;

          h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
          }

          h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 10px; }
          h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 8px; }
          h3 { font-size: 1.25em; }
          h4 { font-size: 1em; }
          h5 { font-size: 0.875em; }
          h6 { font-size: 0.85em; color: #6a737d; }

          p {
            margin-bottom: 16px;
          }

          ul, ol {
            padding-left: 30px;
            margin-bottom: 16px;

            li {
              margin-bottom: 4px;
            }
          }

          blockquote {
            padding: 0 16px;
            margin: 0 0 16px 0;
            color: #6a737d;
            border-left: 4px solid #dfe2e5;
          }

          code {
            padding: 2px 4px;
            margin: 0;
            font-size: 85%;
            background-color: rgba(27,31,35,0.05);
            border-radius: 3px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          }

          pre {
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.45;
            background-color: #f6f8fa;
            border-radius: 6px;
            margin-bottom: 16px;

            code {
              display: inline;
              max-width: auto;
              padding: 0;
              margin: 0;
              overflow: visible;
              line-height: inherit;
              word-wrap: normal;
              background-color: transparent;
              border: 0;
            }
          }

          table {
            border-spacing: 0;
            border-collapse: collapse;
            margin-bottom: 16px;
            width: 100%;

            th, td {
              padding: 6px 13px;
              border: 1px solid #dfe2e5;
            }

            th {
              font-weight: 600;
              background-color: #f6f8fa;
            }

            tr:nth-child(2n) {
              background-color: #f6f8fa;
            }
          }

          img {
            max-width: 100%;
            width: auto;
            height: auto;
            display: block;
            margin: 16px 0;
          }
        }
      }
    }
  }
}
</style>