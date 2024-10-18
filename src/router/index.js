import { createRouter, createWebHistory } from 'vue-router'

import TheWelcome from "@/components/welcome/TheWelcome.vue";


const router = createRouter({
  history: createWebHistory('/inputdata/'),
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
          path: 'results',
          name: 'Results',
          component:() => import('../components/form/content/ContentForm.vue'),
        }

      ]
    },
    {
      path: '/report',
      component: () => import('../components/reports/Report.vue'),
      children: [
        {
          path: 'category',
          name: 'Category',
          component:() => import('../components/reports/content/Category.vue'),
        },
        {
          path: 'cluster',
          name: 'Cluster',
          component:() => import('../components/reports/content/Cluster.vue'),
        },
        {
          path: 'filterCollections',
          name: 'Collections',
          component:() => import('../components/reports/content/Collections.vue'),
        },
        {
          path: '/help',
          name: 'Help',
          component: () => import('../components/help/Help.vue'),
        }
        // {
        //   path: 'delete',
        //   name: 'Delete',
        // //   component:() => import('../components/form/content/ContentForm.vue'),
        // }
      ]

    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: () => import('../views/Confirm.vue'),
    }
  ]
})

export default router
