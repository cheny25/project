<template>
  <div class="msg">
    <img src="../../static/images/rectangle.png" alt="">
    <div class="infomation">
      <p class="text">{{msgTime}}用电<span>{{msgNumber}}</span></p>
      <p class="text2">超过本楼栋<span>{{msgPercentage}}</span>的人</p>
    </div>
  </div>
</template>

<script>

export default {
  props: ['msgTime','msgNumber','msgPercentage']
}
</script>

<style scoped>
.msg{
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.msg img{
  width: 9px;
  height: 23px;
  margin-top: 11px;
}
.infomation{
  margin-left: 8px;
}

.text{
  color: #EC4C78;
  margin: 0 0 3px 0;
}
.text span{
  font-size: 23px;
  margin-left: 5px;
}
.text2{
  margin-top: 0px;
  font-size: 14px;
}
</style>
