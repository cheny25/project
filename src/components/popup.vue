<template>
 <div class="wrapper" v-show="visible" @click="hide">
  <div class="popup-text">{{text}}</div>
 </div>
</template>

<script>
export default {
name: 'popup',
 props: {
  text: { //文字内容
   type: String,
   default: ''
  },
  time: { //显示的时长
   type: Number,
   default: 3e3
  },
 },
 data(){
  return {
   visible: false
  }
 },
 methods: {
  open() {
   this.visible = true
   clearTimeout(this.timeout);
   this.$emit('show')
   if(this.time > 0){
    this.timeout = setTimeout(() => {
     this.hide()
    }, this.time)
   }
  },
  hide() {
   this.visible = false
   this.$emit('hide')
   clearTimeout(this.timeout);
  }
 }
}
</script>

<style scoped>
.wrapper{
    width: 100%;
    position: flex;
    left: 12%;
    align-items: flex-end;
}
.popup-text{
    text-align: center;
    width:66%;
    padding: 5%;
    color: #fff;
    font-size: 3vm;
    border-radius: 10px;
    opacity: 0.7;
    background:#47C9AF;
}
</style>