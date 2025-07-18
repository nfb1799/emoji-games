import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/emoji-match',
    name: 'EmojiMatch',
    component: () => import('../games/EmojiMatch.vue')
  },
  {
    path: '/wanted-game',
    name: 'WantedGame',
    component: () => import('../games/WantedGame.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router