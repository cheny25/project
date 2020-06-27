<!-- abnormal的列表 -->
<template>
  <div class="ab-info">
    <img src="../../static/images/ab_rectangle.png" alt="" class="ab-rectangle"> 
    <div class="info">
      <p class="ab-msg">{{abMsg}}</p>
      <p class="ab-time">{{abTime}}</p>
    </div>
    <p class="new" v-show="isNew">new</p>
  </div>
</template>

<script>


export default {
  props: {
    abMsg: {
      type: String,
      default: ' '
    },
    abTime: {
      type: String,
      default: ' '
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
    }
  }
}
</script>

<style scoped>

.ab-info{
  width: 84%;
  height: 60px;
  border: 1px solid #E5FCF9;
  box-shadow: 0px 0px 3px 3px #E5FCF9;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
 
}
.ab-rectangle{
  width: 9px;
  height: 23rpx;
  margin-left: -7px;
}
.info{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 84%;
}
.ab-msg{
  font-size: 15px;
  
}
.ab-time{
  font-size: 10px;
  color: #4DE6C8;
  margin-top: -15px;
}
.new{
  font-size: 13px;
  font-weight: bold;
  color: #51E7C9;
  margin-top: -35px;
  margin-right: 5px;
}

</style>
