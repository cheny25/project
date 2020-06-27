<template>
  <div id="container">
    <div class="use" @click="toCom(0)">
      <img src="../../../static/images/analyze.jpg">
      <p>用电分析</p>
    </div>
    <div class="use" @click="toCom(1)">
      <img src="../../../static/images/dormitory.jpg">
      <p>历史数据</p>
    </div>
    <div class="use" @click="toCom(2)">
      <img src="../../../static/images/building.jpg">
      <p>楼栋用电情况</p>
    </div>
    <div class="use" @click="toBala">
      <img src="../../../static/images/balance.jpg">
      <p>电费余额</p>
    </div>
    <div class="use" @click="toAbnor">
      <img src="../../../static/images/abnormal.jpg">
      <p>异常用电</p>
    </div>
    <div class="use" @click="toCall">
      <img src="../../../static/images/callboard.jpg">
      <p>公告板</p>
    </div>
    <popup ref="popup" :text=informMsg :time=7000 class="popup"></popup>
  </div>
</template>

<script>
import popup from '@/components/popup';
export default {
  name:'index',
  data(){
    return {
      buildingId:0,
      dormitoryId:0,
      informMsg:''
    }
  },
  created:function(){
    this.judgeUrl();
  },
  components:{
    popup:popup
  },
  methods:{
    judgeUrl:function(){
      //获取url中的楼栋号和房间号
      var buildUrl = window.location.href ;           
      var dz_url = buildUrl.split('#')[0];            
      var cs = dz_url.split('?')[1];                
      var cs_arr = cs.split('&');                   
      var cs={};
      for(let i=0;i<cs_arr.length;i++){        
        cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
        }
      this.buildingId = cs.buildingId;
      this.dormitoryId = cs.dormitoryId;
      //将url中的楼栋号和房间号传入给后台，判断是否显示页面
      this.$http.get(this.$store.state.baseUrl+'/data/swapUserData/'+this.buildingId+'/'+this.dormitoryId)
      .then(res=>{
        let buildData = res.data.data;
        if (buildData.testFlag) {
          this.$store.dispatch('setBuildingId',buildData.buildingId);
          this.$store.dispatch('setDormitoryId',buildData.dormitoryId);
          // alert('你浏览到的数据采用的是测试数据！')
          this.informMsg = "你浏览到的数据采用的是测试数据！";
          this.$refs.popup.open();
        }else{
          this.informMsg = "你浏览到的数据采用的是测试数据！";
          this.$refs.popup.open();
        }
      })
      .catch(err=>{
        this.informMsg = "数据获取失败，请检查重试！";
        this.$refs.popup.open();
      })
    },
    toCom:function(count){
      //点击跳转相应页面，向swip传递参数
      this.$router.push({
        name:'swiper',
        params:{
          id:count,
        }
      });
    },
    toAny:function(){
      this.toCom(0);
    },
    toDor:function(){
      this.toCom(1);
    },
    toBuild:function(){
      this.toCom(2);
    },
    toBala:function(){
      this.toCom(3);
    },
    toAbnor:function(){
      this.toCom(4);
    },
    toCall:function(){
      this.toCom(5);
    }
  }
}
</script>

<style scoped>
#container{
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 10px;
  position: relative;
}
.use{
  width: 35%;
  height: 26%;
  border: 1px solid #ccc;
  background-color: #fff;
  margin: 3%;
  box-shadow: 0 0 10px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
img{
  width: 50%;
  height: 45.5%;
  margin-bottom: 3%;
}
p{
  font-weight: bold;
  font-size: 3vw;
}
.popup{
  position: fixed;
  justify-content: center;
  bottom: 0;
}
</style>
