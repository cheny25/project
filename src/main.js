import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//引入flyio，进行交互
var Fly=require("flyio/dist/npm/fly") 
var fly=new Fly
Vue.prototype.$http=fly //将fly实例挂在vue原型上

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import 'swiper/dist/css/swiper.css'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

Vue.config.productionTip = false
App.mpType = 'app'

new Vue({
	el:"#app",
	router,
	store,
	template:'<App/>',
	components:{App}
})