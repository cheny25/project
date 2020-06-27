import Vue from 'vue'
import Router from 'vue-router'
import firstPage from '@/pages/index/index'
//import swiper from '@/pages/swip/index'
import analyze from '@/components/analyze'
import dormitory from '@/components/dormitory'
import building from '@/components/building'
import balance from '@/components/balance'
import abnormal from '@/components/abnormal'
import callboard from '@/components/callboard'

const swiper = () => import('../pages/swip/index')
Vue.use(Router)

export default new Router({
	//mode:'history',
  routes: [
    {
      path: '/',
      name: 'firstPage',
      component:firstPage
    },
    {
      path: '/swiper',
      name: 'swiper',
      component:swiper,
      children:[
        {
          path:'analyze',
          name:'analyze',
          component:analyze
        },
        {
          path:'dormitory',
          name:'dormitory',
          component:dormitory
        },
        {
          path:'building',
          name:'building',
          component:building
        },
        {
          path:'balance',
          name:'balance',
          component:balance
        },
        {
          path:'abnormal',
          name:'abnormal',
          component:abnormal
        },
        {
          path:'callboard',
          name:'callboard',
          component:callboard
        }
      ]
    }
  ]
})
