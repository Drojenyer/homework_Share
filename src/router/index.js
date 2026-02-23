import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/chinese',
      name: 'chinese',
      component: () => import('../views/ChineseView.vue'),
    },
    {
      path: '/math',
      name: 'math',
      component: () => import('../views/MathView.vue'),
    },
    {
      path: '/english',
      name: 'english',
      component: () => import('../views/EnglishView.vue'),
    },
    {
      path: '/physics',
      name: 'physics',
      component: () => import('../views/PhysicsView.vue'),
    },
    {
      path: '/chemistry',
      name: 'chemistry',
      component: () => import('../views/ChemistryView.vue'),
    },
    {
      path: '/biology',
      name: 'biology',
      component: () => import('../views/BiologyView.vue'),
    },
    // 重定向到语文页面
    {
      path: '/',
      redirect: '/chinese',
    },
  ],
})

export default router
