<template>
  <SubjectView subjectName="化学" :images="images" />
</template>

<script setup>
import SubjectView from './SubjectView.vue'
import six1 from '@/assets/Chemistry/六联-1.jpg'
import six2 from '@/assets/Chemistry/六联-2.jpg'
import six3 from '@/assets/Chemistry/六联-3.jpg'
import four1 from '@/assets/Chemistry/四联-1.jpg'
import four2 from '@/assets/Chemistry/四联-2.jpg'
import four3 from '@/assets/Chemistry/四联-3.jpg'
import four4 from '@/assets/Chemistry/四联-4.jpg'
import hs1 from '@/assets/Chemistry/衡水金卷-1.jpg'
import hs2 from '@/assets/Chemistry/衡水金卷-2.jpg'
import hs3 from '@/assets/Chemistry/衡水金卷-3.jpg'
import hs4 from '@/assets/Chemistry/衡水金卷-4.jpg'
import gaosan1 from '@/assets/Chemistry/高三化学试卷-1.jpg'
import gaosan2 from '@/assets/Chemistry/高三化学试卷-2.jpg'
import gaosan3 from '@/assets/Chemistry/高三化学试卷-3.jpg'
import gaosan4 from '@/assets/Chemistry/高三化学试卷-4.jpg'

const images = [
  {
    name: '六联-1',
    url: six1
  },
  {
    name: '六联-2',
    url: six2
  },
  {
    name: '六联-3',
    url: six3
  },
  {
    name: '四联-1',
    url: four1
  },
  {
    name: '四联-2',
    url: four2
  },
  {
    name: '四联-3',
    url: four3
  },
  {
    name: '四联-4',
    url: four4
  },
  {
    name: '衡水金卷-1',
    url: hs1
  },
  {
    name: '衡水金卷-2',
    url: hs2
  },
  {
    name: '衡水金卷-3',
    url: hs3
  },
  {
    name: '衡水金卷-4',
    url: hs4
  },
  {
    name: '高三化学试卷-1',
    url: gaosan1
  },
  {
    name: '高三化学试卷-2',
    url: gaosan2
  },
  {
    name: '高三化学试卷-3',
    url: gaosan3
  },
  {
    name: '高三化学试卷-4',
    url: gaosan4
  }
]
</script>