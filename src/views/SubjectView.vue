<template>
  <div class="subject-container">
    <div class="subject-header">
      <h2>{{ subjectName }}资源</h2>
      <p>分享作业答案</p>
    </div>
    
    <div class="image-grid">
      <div v-for="(image, index) in images" :key="index" class="image-item" :style="{ animationDelay: `${index * 0.1}s` }">
        <img :src="image.url" :alt="`${subjectName}作业 ${index + 1}`" @click="openImage(image.url)" />
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
                transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                transition: 'transform 0.1s ease-out'
              }"
            />
          </transition>
        </div>
        <div class="modal-controls">
          <button class="close-button" @click="closeImage">关闭</button>
          <button class="reset-button" @click="resetZoom">重置</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'

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
const scale = ref(1)
const lastDistance = ref(0)
const touchStartX = ref(0)
const touchStartY = ref(0)
const translateX = ref(0)
const translateY = ref(0)
const lastTranslateX = ref(0)
const lastTranslateY = ref(0)

const openImage = (url) => {
  selectedImage.value = url
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
  lastTranslateX.value = 0
  lastTranslateY.value = 0
}

const closeImage = () => {
  selectedImage.value = null
  scale.value = 1
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
  translateX.value = 0
  translateY.value = 0
  lastTranslateX.value = 0
  lastTranslateY.value = 0
}
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

.image-item img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.8rem;
  transition: transform 0.3s ease;
  border: 1px solid #f1f3f5;
}

.image-item:hover img {
  transform: scale(1.08);
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
  z-index: 10;
}

.close-button {
  background: #fff;
  color: #333;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.close-button:hover {
  background: #f8f9fa;
  transform: scale(1.1);
}

.reset-button {
  background: #fff;
  color: #333;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.reset-button:hover {
  background: #f8f9fa;
  transform: scale(1.1);
}

/* 移动端优化 */
@media (max-width: 480px) {
  .modal-controls {
    top: 15px;
    right: 15px;
    gap: 8px;
  }
  
  .close-button,
  .reset-button {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
  
  .reset-button {
    font-size: 12px;
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