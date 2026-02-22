<template>
  <SubjectView subjectName="生物" :images="images" />
</template>

<script setup>
import SubjectView from './SubjectView.vue'

const images = [
  {
    name: '暂无内容',
    url: ''
  },
]
</script>