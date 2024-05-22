import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TheWelcome from "@/components/welcome/TheWelcome.vue";
import ContentForm from "@/components/form/content/ContentForm.vue";
import Help from "@/components/help/Help.vue";

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
          component:() => import('../components/form/content/ContentForm.vue'),
        },
        {
          path: '/form',
          name: 'Fair',
          component:() => import('../components/form/content/ContentForm.vue'),
        },
        {
          path: '/form',
          name: 'Resolution and temporal',
          component:() => import('../components/form/content/ContentForm.vue'),
        },
        {
          path: '/form',
          name: 'SDQF',
          component:() => import('../components/form/content/ContentForm.vue'),
        },
        {
          path: '/form',
          name: 'Results',
          component:() => import('../components/form/content/ContentForm.vue'),
        }

      ]
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('../components/help/Help.vue'),
    }
  ]
})

export default router
