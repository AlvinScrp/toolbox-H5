<template>
  <div id="app">
    <div class="nav-tags">
      <el-tag
        v-for="route in routes"
        :key="route.path"
        :type="activeTab === route.path ? '' : 'info'"
        :effect="activeTab === route.path ? 'dark' : 'plain'"
        @click="handleClick(route)"
        :class="['nav-tag', { active: activeTab === route.path }]"
      >
        {{ route.label }}
      </el-tag>
    </div>

    <router-view />
    <div class="bottom-container">
      <div class="more-tools">
        <div>更多工具</div>
        <div v-for="item in moreTools" :key="item.url">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <img :src="item.favicon" :alt="item.label" />
            {{ item.label }}
          </a>
        </div>
      </div>
      <!-- 访问统计 -->
      <div class="visitor-count">
        <span id="busuanzi_container_site_pv">
          总访问量: <span id="busuanzi_value_site_pv"></span> 次
        </span>
        <br />
        <span id="busuanzi_container_site_uv">
          访客数: <span id="busuanzi_value_site_uv"></span> 人
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeTab: '/json',
      routes: [
        { path: '/json', label: 'JSON' },
        { path: '/timestamp', label: '时间戳' },
        { path: '/color', label: '颜色' },
        { path: '/qrcode', label: '二维码' },
        { path: '/number', label: '进制转换' },
        { path: '/urlencode', label: 'URL编解码' },
        { path: '/unicode', label: 'Unicode' },
        { path: '/base64', label: 'Base64' },
        { path: '/hash', label: 'Hash' },
        { path: '/imagelayout', label: '画布' }
        // { path: '/ascii', label: 'ASCII码' },
        // { path: '/about', label: 'About' }
      ],
      moreTools: [
        { url: 'https://cli.im/', label: '草料二维码', favicon: 'https://static.clewm.net/static/images/favicon.ico' },
        { url: 'https://tinypng.com/', label: 'TinyPNG', favicon: 'https://tinypng.com/images/favicon.ico' },
        { url: 'https://excalidraw.com/', label: 'excalidraw', favicon: 'https://excalidraw.com/favicon-32x32.png' }
      ]
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if (to.path !== '/cli_im') {
          this.activeTab = to.path;
        }
      }
    }
  },
  methods: {
    handleClick(route) {
      if (route === this.activeTab) {
        return;
      }
      if (route.path === '/cli_im') {
        window.open('https://cli.im/', '_blank');
        // 恢复到之前选中的标签
        this.$nextTick(() => {
          this.activeTab = this.$route.path;
        });
      } else {
        this.$router.push(route.path);
      }
    }
  },
  mounted() {
    const script = document.createElement('script');
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    script.async = true;
    document.head.appendChild(script);
  }
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 12px;
  padding-top: 12px;
}

.bottom-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background: #fff;
  padding: 12px 12px;
  border-top: 1px solid var(--el-border-color-lighter);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  z-index: 100;
}

.more-tools {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  > div:first-child {
    color: var(--el-text-color-secondary);
    font-size: 14px;
    font-weight: 500;
    padding-right: 4px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: -8px;
      top: 50%;
      height: 12px;
      width: 1px;
      background-color: var(--el-border-color);
      transform: translateY(-50%);
    }
  }

  a {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 6px;
    color: var(--el-text-color-regular);
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
    background: var(--el-fill-color-blank);
    border: 1px solid var(--el-border-color-lighter);

    &:hover {
      color: var(--el-color-primary);
      background: var(--el-fill-color-light);
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    img {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      object-fit: cover;
    }
  }
}

.visitor-count {
  background: var(--el-fill-color-blank);
  padding: 4px 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  color: var(--el-text-color-regular);
  border: 1px solid var(--el-border-color-lighter);
  line-height: 1.8;

  span {
    display: inline-block;
    margin: 0 4px;
    color: var(--el-color-primary);
    font-weight: 500;
  }
}

/* 导航标签样式 */
.nav-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 12px;
  margin-bottom: 18px;
}

.nav-tag {
  cursor: pointer;
  font-size: 14px !important;
  padding: 0px 10px !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  height: 30px !important;
  line-height: 1 !important;
}

.nav-tag:hover {
  transform: translateY(-2px);
}

.nav-tag.active {
  font-weight: 500;
}

/* 覆盖 Element UI 的默认标签样式 */
.el-tag.el-tag--info.el-tag--plain {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
}

.el-tag.el-tag--info.el-tag--plain:hover {
  background-color: #f4f4f5;
  border-color: #909399;
  color: #909399;
}
</style>
