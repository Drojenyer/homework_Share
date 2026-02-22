<template>
  <div class="english-view">
    <div class="english-header">
      <h2>英语资源</h2>
      <p>tips：只有听力答案（排版有些乱，勉强看一下）</p>
    </div>

    <div class="markdown-files">
      <div class="file-list">
        <button
          v-for="file in markdownFiles"
          :key="file.id"
          @click="selectFile(file)"
          :class="['file-button', { active: selectedFile && selectedFile.id === file.id }]"
        >
          {{ file.name }}
        </button>
      </div>

      <div class="file-content">
        <div v-if="selectedFile" class="content-container">
          <h3>{{ selectedFile.name }}</h3>
          <MarkdownViewer :content="selectedFile.content" />
        </div>
        <div v-else class="content-placeholder">
          <p>请选择一个Markdown文件查看内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MarkdownViewer from '@/components/MarkdownViewer.vue'

// 导入English文件夹中的md文件
import file2_5 from '@/assets/English/2-5.md?raw'
import file2_6 from '@/assets/English/2-6.md?raw'
import file2_7 from '@/assets/English/2-7.md?raw'
import file2_8 from '@/assets/English/2-8.md?raw'
import file2_9 from '@/assets/English/2-9.md?raw'
import file2_12 from '@/assets/English/2-12.md?raw'
import file2_13 from '@/assets/English/2-13.md?raw'
import file2_14 from '@/assets/English/2-14.md?raw'
import file2_15 from '@/assets/English/2-15.md?raw'

// 创建Markdown文件数组
const markdownFiles = [
  { id: '2-5', name: '2-5.md', content: file2_5 },
  { id: '2-6', name: '2-6.md', content: file2_6 },
  { id: '2-7', name: '2-7.md', content: file2_7 },
  { id: '2-8', name: '2-8.md', content: file2_8 },
  { id: '2-9', name: '2-9.md', content: file2_9 },
  { id: '2-12', name: '2-12.md', content: file2_12 },
  { id: '2-13', name: '2-13.md', content: file2_13 },
  { id: '2-14', name: '2-14.md', content: file2_14 },
  { id: '2-15', name: '2-15.md', content: file2_15 }
]

const selectedFile = ref(null)

const selectFile = (file) => {
  selectedFile.value = file
}
</script>

<style scoped>
.english-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.english-header {
  margin-bottom: 2rem;
  animation: headerFadeIn 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(-20px);
}

.english-header h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.english-header p {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.markdown-files {
  display: flex;
  gap: 1.5rem;
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.file-list {
  flex: 0 0 200px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 600px;
  overflow-y: auto;
}

.file-button {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.file-button:hover {
  background: #e3f2fd;
  border-color: #90caf9;
}

.file-button.active {
  background: #2196f3;
  color: white;
  border-color: #2196f3;
}

.file-content {
  flex: 1;
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 600px;
}

.content-container h3 {
  margin-bottom: 1.5rem;
  color: #333;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.5rem;
}

.content-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #999;
  font-size: 1.1rem;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

/* 响应式设计 */
@media (max-width: 768px) {
  .markdown-files {
    flex-direction: column;
  }

  .file-list {
    flex: 1;
    max-height: 300px;
  }

  .file-content {
    min-height: 500px;
  }
}

@media (max-width: 480px) {
  .english-view {
    padding: 0.8rem;
  }

  .english-header h2 {
    font-size: 1.2rem;
  }

  .file-list {
    padding: 0.8rem;
  }

  .file-button {
    padding: 0.6rem;
    font-size: 0.85rem;
  }

  .file-content {
    padding: 1rem;
    min-height: 400px;
  }
}
</style>