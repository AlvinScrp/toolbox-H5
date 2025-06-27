<template>
  <div id="app">
    <nav>
      <router-link to="/json">JSON格式化</router-link>
      <router-link to="/urlencode">URL编解码</router-link>
      <router-link to="/base64">Base64</router-link>
      <router-link to="/hash">Hash</router-link>
      <router-link to="/number">进制转换</router-link>
      <router-link to="/timestamp">时间戳</router-link>
      <router-link to="/color">颜色</router-link>
      <a target="_blank" href="https://cli.im/">草料二维码</a>
      <router-link to="/ascii">ASCII码</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
    <!-- 访问统计 -->
    <div class="visitor-count">
      <span id="busuanzi_container_site_pv">
        总访问量: <span id="busuanzi_value_site_pv"></span> 次
      </span>
      <br>
      <span id="busuanzi_container_site_uv">
        访客数: <span id="busuanzi_value_site_uv"></span> 人
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 添加不蒜子统计脚本
    const script = document.createElement('script')
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
    script.async = true
    document.head.appendChild(script)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;

  margin: 0 5%;
}

nav {
  font-size: 18px;
  padding: 30px 0;
}

nav a {
  margin-right: 20px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}

.visitor-count {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  font-size: 14px;
  color: #666;
  z-index: 1000;
}
</style>
