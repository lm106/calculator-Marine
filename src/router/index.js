import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TheWelcome from "@/components/welcome/TheWelcome.vue";
import ContentForm from "@/components/form/content/ContentForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: TheWelcome
    },
    {
      path: '/form',
      name: 'Form',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/form/Form.vue'),
      children: [
        {
          path: '/form',
          name: 'Relevance',
          component:ContentForm
        },
        {
          path: '/form',
          name: 'Fair',
          component:ContentForm
        },
        {
          path: '/form',
          name: 'Resolution and temporal coverage',
          component:ContentForm
        },
        {
          path: '/form',
          name: 'SDQF',
          component:ContentForm
        },
        {
          path: '/form',
          name: 'Results',
          component:ContentForm
        }
      ]
    }
  ]
})

export default router
