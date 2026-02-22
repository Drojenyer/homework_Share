<template>
  <SubjectView subjectName="生物" :images="images" />
</template>

<script setup>
import SubjectView from './SubjectView.vue'

const images = [
  {
    name: '暂无内容（实在太多了，拍不过来啊...）',
  },
]
</script>