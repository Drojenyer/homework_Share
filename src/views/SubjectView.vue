<template>
  <div class="subject-container">
    <div class="subject-header">
      <h2>{{ subjectName }}资源</h2>
      <p>分享作业答案（加载时可能有卡顿，请耐心等待）</p>
    </div>
    
    <div class="image-grid">
      <div v-for="(image, index) in images" :key="index" class="image-item" :style="{ animationDelay: `${index * 0.1}s` }">
        <div class="image-wrapper">
          <img 
            :src="image.url" 
            :alt="`${subjectName}作业 ${index + 1}`" 
            @click="openImage(image.url)"
            loading="lazy"
            @load="handleImageLoad(index)"
            @error="handleImageError(index)"
          />
          <div v-if="loadingImages.includes(index)" class="image-loading">
            <div class="loading-spinner"></div>
          </div>
          <div v-if="errorImages.includes(index)" class="image-error">
            <span>图片加载失败</span>
          </div>
        </div>
        <p>{{ image.name }}</p>
      </div>
    </div>
    
    <!-- 图片放大查看 -->
    <div v-if="selectedImage" class="image-modal" @click="closeImage">
      <div class="modal-content" @click.stop>
        <div class="image-container">
          <transition name="modal-fade">
            <img 
              :src="selectedImage" 
              :alt="'放大图片'"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
              :style="{
                transform: `scale(${scale}) rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`,
                transition: 'transform 0.1s ease-out'
              }"
            />
          </transition>
        </div>
        <div class="modal-controls">
          <button class="nav-button prev-button" @click="prevImage" v-if="images.length > 1">上一张</button>
          <button class="close-button" @click="closeImage">关闭</button>
          <button class="reset-button" @click="resetZoom">重置</button>
          <button class="rotate-button" @click="rotateImage">旋转</button>
          <button class="nav-button next-button" @click="nextImage" v-if="images.length > 1">下一张</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue'

const props = defineProps({
  subjectName: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    default: () => []
  }
})

const selectedImage = ref(null)
const currentImageIndex = ref(-1)
const scale = ref(1)
const rotation = ref(0)
const lastDistance = ref(0)
const touchStartX = ref(0)
const touchStartY = ref(0)
const translateX = ref(0)
const translateY = ref(0)
const lastTranslateX = ref(0)
const lastTranslateY = ref(0)
const loadingImages = ref([])
const errorImages = ref([])

const openImage = (url) => {
  selectedImage.value = url
  scale.value = 1
  rotation.value = 0
  translateX.value = 0
  translateY.value = 0
  lastTranslateX.value = 0
  lastTranslateY.value = 0
  
  // 记录当前图片索引
  const index = props.images.findIndex(img => img.url === url)
  currentImageIndex.value = index
}

// 切换到上一张图片
const prevImage = () => {
  if (props.images.length === 0) return
  
  currentImageIndex.value = (currentImageIndex.value - 1 + props.images.length) % props.images.length
  selectedImage.value = props.images[currentImageIndex.value].url
  // 重置缩放、旋转和位置
  resetZoom()
}

// 切换到下一张图片
const nextImage = () => {
  if (props.images.length === 0) return
  
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length
  selectedImage.value = props.images[currentImageIndex.value].url
  // 重置缩放、旋转和位置
  resetZoom()
}

// 旋转图片
const rotateImage = () => {
  rotation.value = (rotation.value + 90) % 360
}

const closeImage = () => {
  selectedImage.value = null
  currentImageIndex.value = -1
  scale.value = 1
  rotation.value = 0
  translateX.value = 0
  translateY.value = 0
  lastTranslateX.value = 0
  lastTranslateY.value = 0
}

const handleTouchStart = (e) => {
  if (e.touches.length === 2) {
    const [touch1, touch2] = e.touches
    lastDistance.value = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    )
  } else if (e.touches.length === 1) {
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY
    lastTranslateX.value = translateX.value
    lastTranslateY.value = translateY.value
  }
}

const handleTouchMove = (e) => {
  if (e.touches.length === 2) {
    const [touch1, touch2] = e.touches
    const currentDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    )
    
    const scaleFactor = currentDistance / lastDistance.value
    scale.value *= scaleFactor
    scale.value = Math.max(0.5, Math.min(3, scale.value))
    lastDistance.value = currentDistance
  } else if (e.touches.length === 1) {
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    
    translateX.value = lastTranslateX.value + (currentX - touchStartX.value)
    translateY.value = lastTranslateY.value + (currentY - touchStartY.value)
  }
}

const handleTouchEnd = () => {
  lastDistance.value = 0
}

const resetZoom = () => {
  scale.value = 1
  rotation.value = 0
  translateX.value = 0
  translateY.value = 0
  lastTranslateX.value = 0
  lastTranslateY.value = 0
}

// 图片加载处理
const handleImageLoad = (index) => {
  loadingImages.value = loadingImages.value.filter(i => i !== index)
}

const handleImageError = (index) => {
  loadingImages.value = loadingImages.value.filter(i => i !== index)
  errorImages.value.push(index)
}

// 初始化加载状态
onMounted(() => {
  // 初始时标记所有图片为加载中
  loadingImages.value = props.images.map((_, index) => index)
})
</script>

<style scoped>
.subject-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.subject-header {
  margin-bottom: 2rem;
  animation: headerFadeIn 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(-20px);
}

h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

p {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

/* 标题淡入动画 */
@keyframes headerFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.2rem;
}

.image-item {
  background: #ffffff;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  animation: imageFadeIn 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.image-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #007bff;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  margin-bottom: 0.8rem;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #f1f3f5;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-item:hover .image-wrapper img {
  transform: scale(1.08);
}

/* 图片加载状态 */
.image-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(102, 126, 234, 0.2);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 图片加载错误状态 */
.image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(248, 249, 250, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border: 1px solid #dee2e6;
}

.image-error span {
  color: #dc3545;
  font-size: 0.8rem;
  text-align: center;
  padding: 0 1rem;
}

/* 响应式调整 */
@media (min-width: 768px) {
  .image-wrapper {
    height: 200px;
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .image-wrapper {
    height: 120px;
    margin-bottom: 0.3rem;
  }
  
  .loading-spinner {
    width: 20px;
    height: 20px;
    border-width: 2px;
  }
  
  .image-error span {
    font-size: 0.7rem;
  }
}

.image-item p {
  margin: 0;
  color: #495057;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
}

/* 图片淡入动画 */
@keyframes imageFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 模态框动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 图片放大查看 */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
}

.modal-content {
  position: relative;
  max-width: 95%;
  max-height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  position: relative;
  max-width: 100%;
  max-height: 80vh;
  overflow: hidden;
}

.image-container img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 4px;
  touch-action: none;
}

.modal-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  z-index: 10;
}

.close-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.close-button:hover {
  background: linear-gradient(135deg, #764ba2, #667eea);
  transform: scale(1.15) rotate(90deg);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.reset-button {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.reset-button:hover {
  background: #667eea;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 6px 18px rgba(102, 126, 234, 0.4);
}

/* 旋转按钮样式 */
.rotate-button {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.rotate-button:hover {
  background: #667eea;
  color: white;
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 6px 18px rgba(102, 126, 234, 0.4);
}

/* 导航按钮样式 */
.nav-button {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 25px;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.nav-button:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.prev-button::before {
  content: '←';
  font-size: 1.1rem;
  font-weight: bold;
}

.next-button::after {
  content: '→';
  font-size: 1.1rem;
  font-weight: bold;
}

/* 移动端优化 */
@media (max-width: 480px) {
  .modal-controls {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    top: 15px;
    right: 15px;
    left: 15px;
  }
  
  .close-button,
  .reset-button,
  .rotate-button {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
  
  .reset-button,
  .rotate-button {
    font-size: 14px;
  }
  
  .nav-button {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    border-width: 1px;
  }
  
  .prev-button::before,
  .next-button::after {
    font-size: 1rem;
  }
}

/* 响应式设计 */
@media (min-width: 768px) {
  .subject-container {
    padding: 2rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .image-item {
    padding: 1.5rem;
  }

  .image-item img {
    height: 200px;
    margin-bottom: 1rem;
  }

  .image-item p {
    font-size: 1rem;
  }

  .modal-content {
    max-width: 90%;
    max-height: 90%;
  }
}

/* 移动端优化 */
@media (max-width: 480px) {
  .subject-container {
    padding: 0.8rem;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.8rem;
  }

  .image-item {
    padding: 0.8rem;
  }

  .image-item img {
    height: 120px;
    margin-bottom: 0.3rem;
  }

  .image-item p {
    font-size: 0.8rem;
  }

  .modal-content {
    max-width: 98%;
    max-height: 98%;
  }

  .modal-content img {
    max-height: 70vh;
  }

  .close-button {
    width: 25px;
    height: 25px;
    font-size: 14px;
  }
}
</style>