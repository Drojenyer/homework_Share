<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const subjects = [
  { name: '语文', path: '/chinese' },
  { name: '数学', path: '/math' },
  { name: '英语', path: '/english' },
  { name: '物理', path: '/physics' },
  { name: '化学', path: '/chemistry' },
  { name: '生物', path: '/biology' }
]

// 背景颜色选项
const colorOptions = [
  { name: '默认', value: 'default' },
  { name: '黑色', value: 'black' },
  { name: '白色', value: 'white' },
  { name: '粉色', value: 'pink' },
  { name: '蓝色', value: 'blue' }
]

const showBackToTop = ref(false)
const currentColor = ref('default')
const showColorPicker = ref(false)

// 监听滚动事件
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// 回到顶部函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 获取颜色值
const getColorValue = (color) => {
  const colorMap = {
    default: '#f8f9fa',
    black: '#1a1a1a',
    white: '#ffffff',
    pink: '#f8d7da',
    blue: '#d1ecf1'
  }
  return colorMap[color] || colorMap.default
}

// 挂载和卸载事件监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="app-container" :class="`color-${currentColor}`">
    <header class="app-header">
      <h1 class="app-title">
        <span v-for="(char, index) in '资源分享平台-需要自取'" :key="index" class="title-char" :style="{ animationDelay: `${index * 0.1}s` }">
          {{ char }}
        </span>
      </h1>
      <div class="user-info">
        <span>作者声明：本网站中的部分作业由个人完成，如有错误概不负责！(仅仅仅供参考)</span>
      </div>
    </header>
    <nav class="app-nav">
      <RouterLink v-for="subject in subjects" :key="subject.path" :to="subject.path" class="nav-item">
        {{ subject.name }}
      </RouterLink>
      <!-- 颜色选择器 -->
      <div style="margin-left: auto;">
        <select
          v-model="currentColor"
          style="
            padding: 0.5rem;
            border: 1px solid #ced4da;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            font-size: 0.9rem;
          "
        >
          <option v-for="color in colorOptions" :key="color.value" :value="color.value">
            {{ color.name }}
          </option>
        </select>
      </div>
    </nav>
    <main class="app-main">
      <!-- 添加路由过渡动画 -->
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <footer class="app-footer">
      <p>Drojenyer自制 版权所有 © {{ new Date().getFullYear() }}</p>
    </footer>

    <!-- 回到顶部按钮 -->
    <button v-if="showBackToTop" class="back-to-top" @click="scrollToTop">
      ↑
    </button>
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
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  display: inline-block;
}

/* 标题文字逐个出现动画 */
.title-char {
  display: inline-block;
  animation: charAnimation 0.8s ease-out forwards, colorShift 8s ease-in-out infinite;
  opacity: 0;
  transform: translateY(20px);
  background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
  background-size: 700% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 8px rgba(255, 0, 0, 0.3);
}

/* 字符出现动画 */
@keyframes charAnimation {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 彩虹颜色渐变动画 */
@keyframes colorShift {
  0% {
    background-position: 0% 50%;
    text-shadow: 0 2px 8px rgba(255, 0, 0, 0.3);
  }
  14% {
    text-shadow: 0 2px 8px rgba(255, 127, 0, 0.3);
  }
  28% {
    text-shadow: 0 2px 8px rgba(255, 255, 0, 0.3);
  }
  42% {
    text-shadow: 0 2px 8px rgba(0, 255, 0, 0.3);
  }
  57% {
    text-shadow: 0 2px 8px rgba(0, 0, 255, 0.3);
  }
  71% {
    text-shadow: 0 2px 8px rgba(75, 0, 130, 0.3);
  }
  85% {
    text-shadow: 0 2px 8px rgba(148, 0, 211, 0.3);
  }
  100% {
    background-position: 100% 50%;
    text-shadow: 0 2px 8px rgba(255, 0, 0, 0.3);
  }
}

/* 字符悬停效果 */
.title-char:hover {
  animation: charAnimation 0.8s ease-out forwards, colorShift 4s ease-in-out infinite, charHover 0.3s ease-out forwards;
  transform-origin: center;
}

/* 字符悬停放大动画 */
@keyframes charHover {
  to {
    transform: scale(1.2) translateY(-5px);
    text-shadow: 0 4px 15px rgba(102, 126, 234, 0.8);
  }
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

/* 页脚样式 */
.app-footer {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
  margin-top: auto;
}

.app-footer p {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  animation: footerFadeIn 1s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes footerFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式页脚 */
@media (min-width: 768px) {
  .app-footer {
    padding: 2rem;
  }

  .app-footer p {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: 1.2rem;
  }

  .app-footer p {
    font-size: 0.9rem;
  }
}

/* 回到顶部按钮样式 */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007bff, #6c757d);
  color: white;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: backToTopFadeIn 0.5s ease-out forwards;
}

/* 回到顶部按钮淡入动画 */
@keyframes backToTopFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 回到顶部按钮悬停效果 */
.back-to-top:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.5);
  background: linear-gradient(135deg, #0056b3, #5a6268);
}

/* 回到顶部按钮点击效果 */
.back-to-top:active {
  transform: translateY(0) scale(0.95);
}

/* 响应式回到顶部按钮 */
@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .back-to-top {
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}

/* 颜色选择器样式 */
.color-picker-wrapper {
  position: relative;
  margin-left: auto;
}

.color-button {
  padding: 1rem 0.8rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.color-button:hover {
  background-color: rgba(0, 123, 255, 0.1);
  transform: scale(1.1);
}

.color-picker-container {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  padding: 0.8rem;
  min-width: 120px;
  z-index: 9999;
  animation: colorPickerFadeIn 0.3s ease-out forwards;
  border: 1px solid #e9ecef;
}

@keyframes colorPickerFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.color-option {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.3rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.color-option:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-option.active {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

.color-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
}

/* 不同颜色主题的样式 */
.color-black {
  background-color: #1a1a1a;
  color: #f8f9fa;
}

.color-black .app-header {
  background: #2d2d2d;
  color: #f8f9fa;
}

.color-black .app-nav {
  background: #333333;
  border-bottom-color: #444444;
}

.color-black .nav-item {
  color: #f8f9fa;
}

.color-black .nav-item:hover {
  color: #007bff;
  background-color: #444444;
}

.color-black .nav-item.router-link-active {
  color: #007bff;
  background-color: #444444;
}

.color-black .app-main {
  background-color: #1a1a1a;
}

.color-black .app-footer {
  background: linear-gradient(135deg, #2d2d2d, #3d3d3d);
}

.color-white .app-main {
  background-color: #ffffff;
}

.color-pink .app-main {
  background-color: #f8d7da;
}

.color-blue .app-main {
  background-color: #d1ecf1;
}

/* 响应式颜色选择器 */
@media (max-width: 768px) {
  .color-button {
    padding: 0.8rem 0.6rem;
    font-size: 1rem;
  }

  .color-picker-container {
    min-width: 100px;
    padding: 0.6rem;
  }

  .color-option {
    padding: 0.4rem;
  }

  .color-name {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .color-picker-wrapper {
    margin-left: 0.5rem;
  }

  .color-button {
    padding: 0.6rem 0.4rem;
    font-size: 0.9rem;
  }
}
</style>
