<template>
  <div class="swipPage">
    <Swiper v-if="arrComponent.length > 0" class="swipContent" ref="swiper" :showIndicator='true' :autoPlay='false' @transtionend="getNum">
      <Slide v-for="(item,index) in arrComponent" :key="index">
        <component :is="item" class="swiper-lazy"></component>
      </Slide>
    
    </Swiper>
    
  
  </div>
</template>

<script>
// require("swiper/dist/css/swiper.css");
import { Swiper, Slide } from 'vue-swiper-component';

const analyze = ()=>import("@/components/analyze");
const dormitory = ()=>import("@/components/dormitory");
const building = ()=>import("@/components/building");
const balance = ()=>import("@/components/balance");
const abnormal = ()=>import("@/components/abnormal");
const callboard = ()=>import("@/components/callboard");

var vm = null;

export default {
  components: {
    Swiper,
    Slide,
    'analyze':analyze,
    'dormitory':dormitory,
    'building':building,
    'balance':balance,
    'abnormal':abnormal,
    'callboard':callboard
    
  },
  data() {
    return {
      colorList:['#E92B5F','#FF8646','#71ADFC','#7B73FD','#17DFB7','#FFC900'],
      arrComponent:["analyze","dormitory","building","balance","abnormal","callboard"],
      
    }
  },
  created:function(){
    
  },
  methods:{
    getNum(data) {
      //console.log(document.getElementsByClassName('wh_show_bgcolor').color);
      
      
    }
    
  
  },
  computed: {
    
  },
  }

</script>

<style>

.swipPage{
  width: 100%;
  height: 100%;
  background-color: #F0EFF5;
   display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.wh_content{
  height:95%;
}
.wh_swiper{
  height: 100%;
}
.wh_show_bgcolor{
  background: #4FB8FE !important;
}

</style>
