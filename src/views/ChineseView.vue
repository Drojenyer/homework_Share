<template>
  <SubjectView subjectName="语文" :images="images" />
</template>

<script setup>
import SubjectView from './SubjectView.vue'

// 导入本地语文图片
import img1 from '@/assets/Chinese/15ACC4736B210C578E44C472E3D468D3.jpg'
import img2 from '@/assets/Chinese/1A559091F04B9C864E72DDF225F9E8DA.jpg'
import img3 from '@/assets/Chinese/4D8801A7284A610B543107719D70CDD4.jpg'
import img4 from '@/assets/Chinese/5C1A5C6F685C3562AC84A4E5AAAF371C.jpg'
import img5 from '@/assets/Chinese/5C5086B764ED807A2E1B80DFB0C497D6.jpg'
import img6 from '@/assets/Chinese/80623F47266C5AD692537DA0B122CBA2.jpg'
import img7 from '@/assets/Chinese/8A95A48C2276F3F77E60A6C1BCEEB4C9.jpg'
import img8 from '@/assets/Chinese/B18C0E5D9E09876FC2217FE2A56DEB5B.jpg'
import img9 from '@/assets/Chinese/BE013D269885068A6000871861F87580.jpg'
import img10 from '@/assets/Chinese/C07C36CBD9C00432571476EFA9166C64.jpg'
import img11 from '@/assets/Chinese/C88605C7C1F3A8C8A9CAC6756E3E282A.jpg'
import img12 from '@/assets/Chinese/F1D0484DC11175CEB7FE14A4C131943A.jpg'

const images = [
  { name: '15ACC4736B210C578E44C472E3D468D3', url: img1 },
  { name: '1A559091F04B9C864E72DDF225F9E8DA', url: img2 },
  { name: '4D8801A7284A610B543107719D70CDD4', url: img3 },
  { name: '5C1A5C6F685C3562AC84A4E5AAAF371C', url: img4 },
  { name: '5C5086B764ED807A2E1B80DFB0C497D6', url: img5 },
  { name: '80623F47266C5AD692537DA0B122CBA2', url: img6 },
  { name: '8A95A48C2276F3F77E60A6C1BCEEB4C9', url: img7 },
  { name: 'B18C0E5D9E09876FC2217FE2A56DEB5B', url: img8 },
  { name: 'BE013D269885068A6000871861F87580', url: img9 },
  { name: 'C07C36CBD9C00432571476EFA9166C64', url: img10 },
  { name: 'C88605C7C1F3A8C8A9CAC6756E3E282A', url: img11 },
  { name: 'F1D0484DC11175CEB7FE14A4C131943A', url: img12 }
]
</script>