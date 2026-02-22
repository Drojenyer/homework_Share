<template>
  <SubjectView subjectName="数学" :images="images" />
</template>

<script setup>
import SubjectView from './SubjectView.vue'
// 夯基卷
import hj11 from '@/assets/Math/夯基卷/夯基卷(一)-1.jpg'
import hj12 from '@/assets/Math/夯基卷/夯基卷(一)-2.jpg'
import hj13 from '@/assets/Math/夯基卷/夯基卷(一)-3.jpg'
import hj14 from '@/assets/Math/夯基卷/夯基卷(一)-4.jpg'
import hj15 from '@/assets/Math/夯基卷/夯基卷(一)-5.jpg'
import hj16 from '@/assets/Math/夯基卷/夯基卷(一)-6.jpg'
import hj21 from '@/assets/Math/夯基卷/夯基卷(二)-1.jpg'
import hj22 from '@/assets/Math/夯基卷/夯基卷(二)-2.jpg'
import hj23 from '@/assets/Math/夯基卷/夯基卷(二)-3.jpg'
import hj24 from '@/assets/Math/夯基卷/夯基卷(二)-4.jpg'
import hj25 from '@/assets/Math/夯基卷/夯基卷(二)-5.jpg'
import hj26 from '@/assets/Math/夯基卷/夯基卷(二)-6.jpg'
import hj31 from '@/assets/Math/夯基卷/夯基卷(三)-1.jpg'
import hj32 from '@/assets/Math/夯基卷/夯基卷(三)-2.jpg'
import hj33 from '@/assets/Math/夯基卷/夯基卷(三)-3.jpg'
import hj34 from '@/assets/Math/夯基卷/夯基卷(三)-4.jpg'
// 摸底卷
import md11 from '@/assets/Math/摸底卷/摸底卷(一)1.jpg'
import md12 from '@/assets/Math/摸底卷/摸底卷(一)2.jpg'
import md13 from '@/assets/Math/摸底卷/摸底卷(一)3.jpg'
import md14 from '@/assets/Math/摸底卷/摸底卷(一)4.jpg'
import md15 from '@/assets/Math/摸底卷/摸底卷(一)5.jpg'
import md31 from '@/assets/Math/摸底卷/摸底卷(三)-1.jpg'
import md32 from '@/assets/Math/摸底卷/摸底卷(三)-2.jpg'
import md33 from '@/assets/Math/摸底卷/摸底卷(三)-3.jpg'

const images = [
  // 夯基卷
  {
    name: '夯基卷(一)-1',
    url: hj11
  },
  {
    name: '夯基卷(一)-2',
    url: hj12
  },
  {
    name: '夯基卷(一)-3',
    url: hj13
  },
  {
    name: '夯基卷(一)-4',
    url: hj14
  },
  {
    name: '夯基卷(一)-5',
    url: hj15
  },
  {
    name: '夯基卷(一)-6',
    url: hj16
  },
  {
    name: '夯基卷(二)-1',
    url: hj21
  },
  {
    name: '夯基卷(二)-2',
    url: hj22
  },
  {
    name: '夯基卷(二)-3',
    url: hj23
  },
  {
    name: '夯基卷(二)-4',
    url: hj24
  },
  {
    name: '夯基卷(二)-5',
    url: hj25
  },
  {
    name: '夯基卷(二)-6',
    url: hj26
  },
  {
    name: '夯基卷(三)-1',
    url: hj31
  },
  {
    name: '夯基卷(三)-2',
    url: hj32
  },
  {
    name: '夯基卷(三)-3',
    url: hj33
  },
  {
    name: '夯基卷(三)-4',
    url: hj34
  },
  // 摸底卷
  {
    name: '摸底卷(一)1',
    url: md11
  },
  {
    name: '摸底卷(一)2',
    url: md12
  },
  {
    name: '摸底卷(一)3',
    url: md13
  },
  {
    name: '摸底卷(一)4',
    url: md14
  },
  {
    name: '摸底卷(一)5',
    url: md15
  },
  {
    name: '摸底卷(三)-1',
    url: md31
  },
  {
    name: '摸底卷(三)-2',
    url: md32
  },
  {
    name: '摸底卷(三)-3',
    url: md33
  }
]
</script>