<template>
  <SubjectView subjectName="英语" :images="images" />
</template>

<script setup>
import SubjectView from './SubjectView.vue'

const images = [
  {
    name: '英语作业1',
    url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20homework%20answers%20with%20vocabulary%20and%20grammar&image_size=square_hd'
  },
  {
    name: '英语作业2',
    url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20reading%20comprehension%20exercises%20with%20answers&image_size=square_hd'
  },
  {
    name: '英语作业3',
    url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20writing%20tasks%20with%20sample%20answers&image_size=square_hd'
  }
]
</script>