import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Breakout from '../views/game/breakout/index.vue'
import Plane from '../views/game/plane/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      children: [
        { path: 'breakout', name: 'breakout', component: Breakout },
        { path: 'plane', name: 'plane', component: Plane }
      ]
    }
  ]
})

export default router
