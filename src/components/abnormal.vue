<!-- 用电异常页面 -->
<template>
  <div class="page">
    <div class="contain" :style="note">
      <img src="../../static/images/abnormal_background.png" alt="" class="abBackground">
      <header class="header">
        <p>用电异常</p>
      </header>
      
      
      <p v-show="isShow">您的宿舍没有任何异常喔！</p>

      <div class="scroll">
        <div v-for="(item,index) in lists" :key="index" class="alarm">
          <ab-info :abMsg="item.alarmType" :abTime="item.alarmTime" :isNew="item.alarmNew"></ab-info>
        </div>
      </div>
        
      
    </div>
  </div>
  
</template>

<script>
import abInfo from "@/components/ab-info"


export default {
  data(){
    return {
      note:'abnormal',
      isShow: false,
      lists:[]
    }
    
  },
  mounted:function(){
    this.getAbnormalMsg()
  },
  components: {
    abInfo
  },
  methods:{
    //活动用电异常中的数据
		getAbnormalMsg(){
			this.$http.get(this.$store.state.baseUrl+"/electricityAlarm/getElecAlarmList/"+this.$store.state.roomId)
			.then(res=>{
			this.lists = res.data.data;

			if(this.lists == null)
				this.isShow = true;

			var now = Date.parse(new Date());
			var time = 0

			for(var i=0;i<this.lists.length;i++){
				
				//判断是否显示new: 7天内显示new
				time = now - this.lists[i].alarmTime;
				if(time <=  7 * 24 * 3600 * 1000){
				this.lists[i].alarmNew = true;
				} else{
				this.lists[i].alarmNew = false;
				}

				//获得时间
				this.lists[i].alarmTime = this.$store.state.utils.formatTime(this.lists[i].alarmTime);

				//判断警报类型
				switch(this.lists[i].alarmType){
				case 0: this.lists[i].alarmType = '短路预测'; break;
				case 1: this.lists[i].alarmType = '漏电预测'; break;
				case 2: this.lists[i].alarmType = '违规电器'; break;
				case 3: this.lists[i].alarmType = '寒暑假漏电'; break;
				case 4: this.lists[i].alarmType = '用电量增速异常'; break;
				default: this.lists[i].alarmType = '';
				}
			}}).catch(error=>{
				console.log(error)
			})
		},
  }

}
</script>

<style scoped>
page{
  width: 100%;
  height: 100%;

}
.page{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -99;
  background-color: #F0EFF5;
}

.contain{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 87%;
  margin-top: 8%;
  position: relative;
  box-shadow: 0 0 20px #E0DFE4;
}
.abBackground{
  width: 100%;
  height: 100%;
  position:absolute;
  z-index: -1;
}
.header{
    width: 100%;
    height: 10%;
    background-color: #17DFB7;
    display: flex;
    align-items: center;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.header p{
    color: #ffffff;
    margin-left: 20px;
}

.scroll{
  width: 100%;
  height: 80%;
  margin-top: 20px;
  /* overflow:scroll; */
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
}

.alarm{
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
