<template>
  <SubjectView subjectName="语文" :images="images" />
</template>

<script setup>
import SubjectView from './SubjectView.vue'

const images = [
  {
    name: '语文作业1',
    url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20homework%20answers%20sheet%20with%20characters%20and%20essays&image_size=square_hd'
  },
  {
    name: '语文作业2',
    url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20literature%20homework%20with%20poems%20and%20analysis&image_size=square_hd'
  },
  {
    name: '语文作业3',
    url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20grammar%20exercises%20with%20answers&image_size=square_hd'
  }
]
</script>