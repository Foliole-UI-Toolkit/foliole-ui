import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/modal',
      name: 'modal',
      component: () => import('../views/ModalView.vue')
    },
    {
      path: '/example',
      name: 'example',
      component: () => import('../views/ExampleView.vue')
    }
  ]
})

export default router
