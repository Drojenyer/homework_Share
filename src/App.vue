<script setup>
import { RouterLink, RouterView } from 'vue-router'

const subjects = [
  { name: '语文', path: '/chinese' },
  { name: '数学', path: '/math' },
  { name: '英语', path: '/english' },
  { name: '物理', path: '/physics' },
  { name: '化学', path: '/chemistry' },
  { name: '生物', path: '/biology' }
]
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">资源分享平台-需要自取</h1>
      <div class="user-info">
        <span>作者声明：本网站中的部分作业由个人完成，如有错误概不负责！(仅仅仅供参考)</span>
      </div>
    </header>
    <nav class="app-nav">
      <RouterLink v-for="subject in subjects" :key="subject.path" :to="subject.path" class="nav-item">
        {{ subject.name }}
      </RouterLink>
    </nav>
    <main class="app-main">
      <!-- 添加路由过渡动画 -->
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
/* 全局样式重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.app-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.user-info span {
  font-size: 0.95rem;
  color: #f8f9fa;
}

.app-nav {
  background: #ffffff;
  border-bottom: 1px solid #e9ecef;
  padding: 0 1rem;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.nav-item {
  padding: 1rem 0.8rem;
  text-decoration: none;
  color: #495057;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 4px 4px 0 0;
}

.nav-item:hover {
  color: #007bff;
  background-color: #f8f9fa;
}

.nav-item.router-link-active {
  color: #007bff;
  border-bottom-color: #007bff;
  background-color: #f8f9fa;
  font-weight: 600;
}

.app-main {
  flex: 1;
  padding: 1.5rem;
  background-color: #f8f9fa;
  min-height: calc(100vh - 120px);
}

/* 响应式设计 */
@media (min-width: 768px) {
  .app-header {
    padding: 1.2rem 2rem;
  }

  .app-title {
    font-size: 1.6rem;
  }

  .user-info span {
    font-size: 1rem;
  }

  .app-nav {
    padding: 0 2rem;
    gap: 1.2rem;
  }

  .nav-item {
    padding: 1.2rem 1rem;
    font-size: 1rem;
  }

  .app-main {
    padding: 2rem;
    min-height: calc(100vh - 140px);
  }
}

/* 移动端优化 */
@media (max-width: 480px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 1rem;
  }

  .app-title {
    font-size: 1.2rem;
  }

  .user-info {
    width: 100%;
    justify-content: flex-end;
  }

  .user-info span {
    font-size: 0.9rem;
  }

  .app-nav {
    padding: 0 0.8rem;
    gap: 0.4rem;
  }

  .nav-item {
    padding: 0.8rem 0.6rem;
    font-size: 0.85rem;
  }

  .app-main {
    padding: 1rem;
    min-height: calc(100vh - 130px);
  }
}

/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>