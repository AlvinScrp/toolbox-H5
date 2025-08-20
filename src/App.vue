<template>
  <div id="app">
        <!-- 只在首页显示工具导航 -->
    <div v-if="isHomePage" class="tools-section">
      <!-- 内部开发工具 -->
      <div class="tool-category">
        <h3 class="category-title">开发工具</h3>
        <div class="nav-container">
          <div
            v-for="tool in tools"
            :key="tool.path"
            @click="handleClick(tool)"
            :class="['nav-item', { active: activeTab === tool.path }]"
          >
            <div class="nav-icon">
              <img v-if="tool.icon.startsWith('http')" :src="tool.icon" :alt="tool.label" class="tool-icon-img">
              <i v-else :class="tool.icon"></i>
            </div>
            <div class="nav-label">
              {{ tool.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- 外部工具分类 -->
      <div class="tool-category">
        <h3 class="category-title">外部工具</h3>
        <div class="nav-container">
          <div
            v-for="tool in externalTools"
            :key="tool.url"
            @click="handleExternalClick(tool)"
            class="nav-item external-tool"
          >
            <div class="nav-icon">
              <img v-if="tool.icon.startsWith('http')" :src="tool.icon" :alt="tool.label" class="tool-icon-img">
              <i v-else :class="tool.icon"></i>
            </div>
            <div class="nav-label">
              {{ tool.label }}
              <i class="el-icon-top-right external-indicator"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 子工具页面布局 -->
    <div v-if="!isHomePage" class="sub-tool-layout">
      <!-- 左侧边栏 -->
      <div :class="['sidebar', { collapsed: sidebarCollapsed }]">
        <div class="sidebar-header">
          <div class="header-actions">
            <div  v-if="!sidebarCollapsed" class="back-home" @click="goHome">
              <i class="el-icon-house"></i>
              <span >首页</span>
            </div>
            <div class="toggle-btn" @click="toggleSidebar">
              <i :class="sidebarCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
            </div>
          </div>
        </div>

        <div  v-if="sidebarCollapsed" class="back-home" @click="goHome">
              <i class="el-icon-house"></i>
            </div>

        <div class="sidebar-content">
                    <!-- 开发工具列表 -->
          <div class="tool-group">
            <div v-if="!sidebarCollapsed" class="group-title">开发工具</div>
            <div
              v-for="tool in tools"
              :key="tool.path"
              @click="handleClick(tool)"
              :class="['sidebar-item', { active: activeTab === tool.path }]"
              :title="sidebarCollapsed ? tool.label : ''"
            >
              <img v-if="tool.icon.startsWith('http')" :src="tool.icon" :alt="tool.label" class="sidebar-icon-img">
              <i v-else :class="tool.icon" class="sidebar-icon"></i>
              <span v-if="!sidebarCollapsed" class="sidebar-label">{{ tool.label }}</span>
            </div>
          </div>

          <!-- 外部工具列表 -->
          <div class="tool-group">
            <div v-if="!sidebarCollapsed" class="group-title">外部工具</div>
            <div
              v-for="tool in externalTools"
              :key="tool.url"
              @click="handleExternalClick(tool)"
              class="sidebar-item external"
              :title="sidebarCollapsed ? tool.label : ''"
            >
              <img v-if="tool.icon.startsWith('http')" :src="tool.icon" :alt="tool.label" class="sidebar-icon-img">
              <i v-else :class="tool.icon" class="sidebar-icon"></i>
              <span v-if="!sidebarCollapsed" class="sidebar-label">
                {{ tool.label }}
                <i class="el-icon-top-right external-indicator"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="main-content">
        <router-view />
      </div>
    </div>

    <!-- 首页内容 -->
    <router-view v-if="isHomePage" />

    <!-- 访问统计 - 只在首页显示 -->
    <div v-if="isHomePage" :class="['visitor-stats', { collapsed: visitorStatsCollapsed }]">
      <div class="stats-toggle" @click="toggleVisitorStats">
        <i :class="visitorStatsCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <div class="visitor-count" v-show="!visitorStatsCollapsed">
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
      activeTab: '/',
      sidebarCollapsed: false, // 侧边栏折叠状态
      visitorStatsCollapsed: false, // 访问统计折叠状态
      // 所有工具（内部工具）
      tools: [
        { path: '/json', label: 'JSON', icon: 'fas fa-code', type: 'internal' },
        { path: '/timestamp', label: '时间戳', icon: 'fas fa-clock', type: 'internal' },
        { path: '/color', label: '颜色', icon: 'fas fa-palette', type: 'internal' },
        { path: '/qrcode', label: '二维码', icon: 'fas fa-qrcode', type: 'internal' },
        { path: '/base64', label: 'Base64', icon: 'fas fa-key', type: 'internal' },
        { path: '/hash', label: 'Hash', icon: 'fas fa-shield-alt', type: 'internal' },
        { path: '/number', label: '进制转换', icon: 'fas fa-calculator', type: 'internal' },
        { path: '/urlencode', label: 'URL编解码', icon: 'fas fa-link', type: 'internal' },
        { path: '/unicode', label: 'Unicode', icon: 'fas fa-font', type: 'internal' },
        { path: '/imagelayout', label: '画布', icon: 'fas fa-paint-brush', type: 'internal' }
        // { path: '/ascii', label: 'ASCII码', icon: 'fas fa-keyboard', type: 'internal' },
        // { path: '/markdown', label: 'Markdown', icon: 'fab fa-markdown', type: 'internal' }
      ],
      // 外部工具
      externalTools: [
        { url: 'https://cli.im/', label: '草料二维码', icon: 'https://cli.im/favicon.ico', type: 'external' },
        { url: 'https://tinypng.com/', label: 'TinyPNG', icon: 'https://tinypng.com/images/panda-happy.png', type: 'external' },
        { url: 'https://excalidraw.com/', label: 'excalidraw', icon: 'https://excalidraw.com/apple-touch-icon.png', type: 'external' }
      ]
    };
  },
  computed: {
    /**
     * 判断是否在首页
     * @returns {boolean} 是否在首页
     */
    isHomePage() {
      return this.$route.path === '/';
    }
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
    /**
     * 处理内部工具点击
     * @param {Object} tool - 工具对象
     */
    handleClick(tool) {
      if (tool.path === this.activeTab) {
        return;
      }
      this.$router.push(tool.path);
    },

    /**
     * 处理外部工具点击
     * @param {Object} tool - 外部工具对象
     */
    handleExternalClick(tool) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    },

    /**
     * 返回首页
     */
    goHome() {
      this.$router.push('/');
    },

    /**
     * 切换侧边栏展开/折叠状态
     */
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },

    /**
     * 切换访问统计展开/折叠状态
     */
    toggleVisitorStats() {
      this.visitorStatsCollapsed = !this.visitorStatsCollapsed;
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

/* 访问统计样式 */
.visitor-stats {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: var(--primary-color);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  overflow: hidden;
  max-width: 280px;
}

.visitor-stats.collapsed {
  border-radius: 50%;
  width: 48px;
  height: 48px;
}

.stats-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  margin: 0;
}

.visitor-stats.collapsed .stats-toggle {
  background: transparent;
}

.stats-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.visitor-count {
  padding: 16px 20px;
  font-size: 13px;
  color: #fff;
  line-height: 2;
  text-align: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover-color) 100%);
  border-radius: 0 0 12px 12px;
}

.visitor-count span {
  display: inline-block;
  margin: 0 4px;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .visitor-stats {
    right: 16px;
    bottom: 16px;
    max-width: 220px;
  }

  .visitor-count {
    padding: 12px 16px;
    font-size: 12px;
  }
}

/* 外部工具样式 */
.external-tool {
  position: relative;
  border: 2px dashed var(--el-border-color-lighter) !important;
  background: var(--el-fill-color-extra-light) !important;
}

.external-tool:hover {
  border-color: var(--el-color-primary-light-5) !important;
  background: var(--el-color-primary-light-9) !important;
}

.external-indicator {
  font-size: 10px;
  margin-left: 2px;
  opacity: 0.7;
}

/* 子工具页面布局 */
.sub-tool-layout {
  display: flex;
  min-height: 100vh;
}

/* 侧边栏样式 */
.sidebar {
  width: 120px;
  background: var(--el-fill-color-blank);
  border-right: 1px solid var(--el-border-color-lighter);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 12px 8px;
  // border-bottom: 1px solid var(--el-border-color-lighter);
  // background: var(--el-color-primary-light-9);
}

.header-actions {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.back-home {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 6px;
  background: var(--el-color-primary);
  // color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
  min-width: 0;
}

.sidebar.collapsed .back-home {
  padding: 8px 6px;
  flex: none;
}

.back-home:hover {
  background: var(--el-color-primary-dark-2);
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 6px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-regular);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--el-border-color-lighter);
  flex-shrink: 0;
}

.toggle-btn:hover {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border-color: var(--el-color-primary-light-7);
}

.sidebar-content {
  padding: 12px 0;
}

.tool-group {
  margin-bottom: 16px;
}

.group-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--el-text-color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 12px 6px 12px;
  margin-bottom: 6px;
  border-bottom: 1px solid var(--el-border-color-extra-light);
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 8px;
  margin: 2px 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--el-text-color-primary);
  position: relative;
  justify-content: flex-start;
}

.sidebar.collapsed .sidebar-item {
  justify-content: center;
  padding: 10px 4px;
  margin: 2px 2px;
}

.sidebar-item:hover {
  background: #f5f7fa;
  color: var(--primary-color);
  transform: translateX(2px);
}

.sidebar-item.active {
  background: #f5f7fa;
  color: var(--primary-color);
  position: relative;
}

.sidebar-item.active::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: var(--primary-color);
  border-radius: 1.5px 0 0 1.5px;
}

.sidebar.collapsed .sidebar-item.active {
  background: #f5f7fa;
  color: var(--primary-color);
}

.sidebar-item.active:hover {
  background: #f5f7fa;
  color: var(--primary-color);
}

.sidebar-item.external {
  color: #909399;
}

.sidebar-item.external:hover {
  color: #67c23a;
  background: rgba(103, 194, 58, 0.1);
}

.sidebar-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.sidebar-icon-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.sidebar-item:hover .sidebar-icon-img {
  transform: scale(1.1);
}

.sidebar-item.active .sidebar-icon-img {
  filter: brightness(0) saturate(0) invert(0.3) sepia(1) saturate(7) hue-rotate(200deg);
}

.sidebar-item.external:hover .sidebar-icon-img {
  filter: brightness(0) saturate(0) invert(0.4) sepia(1) saturate(5) hue-rotate(90deg);
}

.sidebar-label {
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  margin-left: 120px;
  min-height: 100vh;
  background: var(--el-fill-color-page);
  transition: margin-left 0.3s ease;
}

.sidebar.collapsed + .main-content {
  margin-left: 60px;
}

/* 响应式设计 - 侧边栏 */
@media (max-width: 768px) {
  .sidebar {
    width: 100px;
  }

  .sidebar.collapsed {
    width: 50px;
  }

  .main-content {
    margin-left: 100px;
  }

  .sidebar.collapsed + .main-content {
    margin-left: 50px;
  }

  .sidebar-item {
    padding: 8px 4px;
    margin: 2px 2px;
  }

  .sidebar.collapsed .sidebar-item {
    padding: 8px 2px;
    margin: 2px 1px;
  }

  .sidebar-label {
    font-size: 11px;
  }

  .back-home {
    padding: 6px 4px;
  }

  .sidebar.collapsed .back-home {
    padding: 6px 2px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 80px;
  }

  .sidebar.collapsed {
    width: 45px;
  }

  .main-content {
    margin-left: 80px;
  }

  .sidebar.collapsed + .main-content {
    margin-left: 45px;
  }

  .group-title {
    font-size: 10px;
    padding: 0 8px 4px 8px;
  }

  .sidebar-item {
    padding: 6px 2px;
    margin: 1px 1px;
  }

  .sidebar.collapsed .sidebar-item {
    padding: 6px 1px;
    margin: 1px 0px;
  }

  .sidebar-label {
    font-size: 10px;
  }

  .back-home {
    padding: 4px 2px;
    font-size: 12px;
  }

  .sidebar.collapsed .back-home {
    padding: 4px 1px;
  }

  .sidebar-icon {
    font-size: 14px;
    width: 16px;
  }
}

/* 工具分类样式 */
.tool-category {
  margin-bottom: 32px;
}

.category-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0 12px 16px 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--el-color-primary-light-8);
  position: relative;
}

.category-title::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--el-color-primary);
}

/* 导航容器样式 */
.nav-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0 12px;
  margin-bottom: 8px;
}

/* 导航项目卡片样式 */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 80px;
  padding: 12px 8px;
  background: var(--el-fill-color-blank);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border-color: var(--el-color-primary-light-7);
  background: var(--el-color-primary-light-9);
}

.nav-item.active {
  background: var(--el-color-primary);
  border-color: var(--el-color-primary);
  color: #fff;
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
}

.nav-item.active:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(64, 158, 255, 0.4);
}

/* 导航图标样式 */
.nav-icon {
  font-size: 24px;
  margin-bottom: 6px;
  color: var(--primary-color);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.tool-icon-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  transition: all 0.3s ease;
  filter: none;
}

.nav-item:hover .tool-icon-img {
  transform: scale(1.1);
}

.nav-item.active .tool-icon-img {
  filter: brightness(0) invert(1);
}

.nav-item.active .nav-icon {
  color: #fff;
}

.nav-item:hover .nav-icon {
  transform: scale(1.1);
}

/* 导航标签文字样式 */
.nav-label {
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
  color: var(--el-text-color-primary);
  transition: all 0.3s ease;
}

.nav-item.active .nav-label {
  color: #fff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    gap: 8px;
  }

  .nav-item {
    min-width: 70px;
    height: 70px;
    padding: 8px 6px;
  }

  .nav-icon {
    font-size: 20px;
    margin-bottom: 4px;
  }

  .nav-label {
    font-size: 11px;
  }
}
</style>
