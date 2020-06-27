<!-- 公告栏 -->
<template>
  <div class="page">
    <div class="contain" :style="note">
      <img src="../../static/images/callboard_background.png" alt="" class="cbBackground">
      <header class="header">
        <p>公告板</p>
      </header>

      <div class="scroll">
        <!-- 最新公告板的内容 -->
        <cb-article :cbTime="cbTime" :cbTitle="cbTitle" :cbContent="cbContent"></cb-article>
        <!-- 历史通知 -->
        <div class="infomation">
          <div class="old-info" v-for="(item,index) in info" :key="index" @click="showContent(index)">
            <p class="old-title"> 
              <span class="arrow" v-show="isRightArrow!==index">> </span>
              <span class="arrow" v-show="isDownArrow==index">∨ </span>
              {{item.title}}
            </p>
            <p v-show="isShowContent==index" style="margin-top:-10px">{{item.content}}</p>
            <p class="old-time">{{item.releaseTime}}</p>
          </div>
        </div>

      </div>

      
    </div>
  </div>
  
</template>



<script>

import cbArticle from "@/components/cb-article"

export default {
  components: {
    cbArticle,
  },
  data(){
    return {
      note:'callboard',
      cbContent: '',//最新通知内容
      cbTime:'',//最新通知时间
      cbTitle:'',//最新通知标题
      info:[],//历史通知
      infoSort:[],
      isShowContent:-1,//是否展示历史通知内容
      isRightArrow:-1,//控制右箭头
      isDownArrow:-1,//控制下箭头
      item:1
    }
  },
  mounted(){
    this.getNewBulletin();
    this.getAllBulletin();
    
  },
  methods:{
    //获得最新公告板的内容
    getNewBulletin(){
      this.$http.get(this.$store.state.baseUrl+"/messagePush/getNewestBulletin")
      .then((res)=>{
        this.cbTitle = res.data.data.title;
        this.cbContent = res.data.data.content;
        this.cbTime = this.$store.state.utils.formatTime(res.data.data.releaseTime);
      }).catch(error=>{
        console.log(error);
      })
    },
    //获得公告板的历史公告
		getAllBulletin(){
			this.$http.get(this.$store.state.baseUrl+"/messagePush/getAllBulletin")
			.then((res)=>{
         this.info = res.data.data;

         this.info.sort((a,b) => {
            return a.releaseTime > b.releaseTime ? -1 : 1;
        })
				//获得时间
				for(var i=0;i<this.info.length;i++){
				this.info[i].releaseTime = this.$store.state.utils.formatTime(this.info[i].releaseTime);
				}
			
			}).catch(error=>{
				console.log(error);
			})
		},
    
    //控制是否显示历史公告中的内容
    showContent(index){
      if(this.isShowContent == index){
        this.isShowContent = -1;
        this.isDownArrow = -1;
        this.isRightArrow = -1;
      }else{
        this.isShowContent = index;
        this.isDownArrow = index;
        this.isRightArrow = index;
      }      
    }, 
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
#waibu{
  width: 100px;
  height: 20px;
  cursor: pointer;

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
.cbBackground{
  width: 100%;
  height: 100%;
  position:absolute;
  z-index: -1;
}
.header{
  width: 100%;
  height: 10%;
  background-color: #FFC900;
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
  height: 85%;
  min-height: 84%;
  /* overflow:scroll; */
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
}

.infomation{
  width: 77%;
  height: auto;
  margin-top: 20px;
  margin-left: 10%;
  cursor: pointer;
}
.old-info{
  margin-top: 15px;
  cursor: pointer;
}
.old-title{
  font-size: 17px;
  text-decoration: underline;
  margin-top: 0px;
  cursor: pointer;
}
.old-time{
  font-size: 15px;
  margin-top: -13px;
}


</style>
