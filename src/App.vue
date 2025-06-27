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
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeTab: '/json',
      routes: [
        { path: '/json', label: 'JSON格式化' },
        { path: '/urlencode', label: 'URL编解码' },
        { path: '/base64', label: 'Base64' },
        { path: '/hash', label: 'Hash' },
        { path: '/number', label: '进制转换' },
        { path: '/timestamp', label: '时间戳' },
        { path: '/color', label: '颜色' },
        { path: '/imagelayout', label: '画布编辑器' },
        { path: '/ascii', label: 'ASCII码' },
        { path: '/cli_im', label: '草料二维码' },
        { path: '/about', label: 'About' }
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 12px;
  padding-top: 12px;
}

.visitor-count {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #666;
  z-index: 1000;
}

/* 导航标签样式 */
.nav-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 20px;
  margin-bottom: 20px;
}

.nav-tag {
  cursor: pointer;
  font-size: 14px !important;
  padding: 8px 16px !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  height: 32px !important;
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
