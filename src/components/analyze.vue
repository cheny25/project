<!-- 用电分析 -->
<template>
  <div class="page">
    <div class="contain" :style="note">
      <img src="../../static/images/panda.png" alt="" class="panda">
      <header class="header">
        <p>用电分析</p>
      </header>
      <p class="tag">寝室用电标签</p>
      <div class="type">
        <p>{{type}}</p>
      </div>
      <div class="message">
        <msg :msg-time="'昨天'" :msg-number="ytdElecSpend" :msg-percentage="ytdRatio"></msg>
        <msg :msg-time="'夜晚'" :msg-number="nightElecSpend" :msg-percentage="nightRatio"></msg>
      </div>
      
    </div>
  </div>
</template>

<script>
import msg from "@/components/msg"

export default {
  components: {
    msg
  },

  data(){
    return{
      note:'analyze',
      type: "熬夜型",
      ytdElecSpend:"", //昨天用电度数
      nightElecSpend:'', //夜晚用电度数
      ytdRatio: 0, //昨天超过人数比例
      nightRatio: 0 //夜晚超过人数比例
    }
  },
  mounted:function(){
    this.getMessage()
  },
  methods:{
    getMessage(){
      this.$http.get(this.$store.state.baseUrl+"/electricClustering/queryByRoomId/"+this.$store.state.roomId)
      .then(res=>{
        
        var data = res.data.data;
        
        //判断类型
        switch(data.nighttimeData.tag){
          case 0: this.type = '熬夜型'; break;
          case 1: this.type = '偶尔熬夜型'; break;
          case 2: this.type = '作息规律型'; break;
          default: this.type = '';
        }
        this.nightElecSpend = data.nighttimeData.elecSpend + '度'; //夜晚用电度数
        this.nightRatio = (data.nighttimeData.ratio).toFixed(2) + '%'; //夜晚超过人数百分数
        this.ytdElecSpend = data.normalTimeData.elecSpend + '度'; //昨天用电度数
        this.ytdRatio = (data.normalTimeData.ratio).toFixed(2) + '%'; //昨天超过人数百分数

      }).catch(error=>{
        console.log(error)
      })
    }
  },
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
.panda{
  width: 100%;
  height: 100%;
  position:absolute;
  z-index: -1;
}
.header{
    width: 100%;
    height: 50px;
    background-color: #E92B5F;
    display: flex;
    align-items: center;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.header p{
    color: #ffffff;
    margin-left: 20px;
}


.tag{
  color: #8E8E8E;
  font-size: 15px;
}
.type{
  height: 10%;
  width: 90%;
  background-color: #FFF5F8;
  margin-top: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.type p{
  color: #E92B5F;
  font-size: 30px;
  font-weight: bolder;
}

.message{
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-top: 10px;
}
</style>
