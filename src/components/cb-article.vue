<!-- 公告栏的通知列表 -->
<template>
<!-- 公告板最新通知 -->
    <div class="cb-article">
        <img src="../../static/images/cb_rectangle.png" alt="" class="cb-rectangle">
        <span class="cb-time">{{cbTime}}</span>
        <p class="cb-title">{{cbTitle}}</p>
        <div class="cb-content">
            <p>{{cbContent}}</p>
        </div>
    </div>
</template>

<script>


export default {
  props: ['cbTime','cbTitle','cbContent']
}
</script>

<style scoped>
.cb-article{
  width: 85%;
  height: auto;
  min-height: 150px;
  border: 1px solid #FFF5D3;
  box-shadow: 0px 0px 3px 3px #FFF4CD;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-left: 7.5%;
}
.cb-article p{
  margin-top: 0px;
}
.cb-rectangle{
  width: 110px;
  height: 8px;
  margin-top: -6px;
}
.cb-time{
  color: #FFC900;
  font-size: 13px;
  margin-right: 70%;
  margin-top: 5px;
}
.cb-title{
  font-size: 19px;
  margin-top: -8px;
}
.cb-content{
  margin: 8px 0 25px 0;
  width: 90%;
  height: auto;
}
.cb-content p{
  font-size: 15px;
  text-indent: 2em;
  margin-top: -20px;
}
</style>
