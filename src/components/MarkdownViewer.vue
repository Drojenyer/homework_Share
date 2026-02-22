<template>
  <div class="markdown-viewer" v-html="renderedMarkdown"></div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const renderedMarkdown = computed(() => {
  return marked(props.content)
})
</script>

<style scoped>
.markdown-viewer {
  padding: 1rem;
  line-height: 1.6;
}

.markdown-viewer h1,
.markdown-viewer h2,
.markdown-viewer h3 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.markdown-viewer h1 {
  font-size: 1.8rem;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3rem;
}

.markdown-viewer h2 {
  font-size: 1.5rem;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3rem;
}

.markdown-viewer h3 {
  font-size: 1.2rem;
}

.markdown-viewer p {
  margin-bottom: 1rem;
}

.markdown-viewer ul,
.markdown-viewer ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.markdown-viewer code {
  background-color: #f6f8fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9rem;
}

.markdown-viewer pre {
  background-color: #f6f8fa;
  padding: 1rem;
  border-radius: 3px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.markdown-viewer pre code {
  background-color: transparent;
  padding: 0;
}

.markdown-viewer blockquote {
  border-left: 4px solid #ddd;
  padding-left: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

.markdown-viewer img {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
}

.markdown-viewer table {
  border-collapse: collapse;
  margin-bottom: 1rem;
  width: 100%;
}

.markdown-viewer th,
.markdown-viewer td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

.markdown-viewer th {
  background-color: #f8f9fa;
}
</style>