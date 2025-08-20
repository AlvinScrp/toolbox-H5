<template>
  <div class="home-container">
  </div>
</template>

<script>
/**
 * 首页组件
 * 作为工具箱的欢迎页面，引导用户选择工具
 */
export default {
  name: 'Home',
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 40px 20px;
}

.welcome-section {
  max-width: 600px;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--el-color-primary);
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--el-color-primary), var(--el-color-primary-light-3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: var(--el-text-color-secondary);
  margin-bottom: 32px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2rem;
  }

  .welcome-subtitle {
    font-size: 1rem;
  }
}
</style>
