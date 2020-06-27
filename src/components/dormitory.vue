<!-- 寝室用电的图表 -->
<template>
  <div class="page">
    <div class="contain">
      <img src="../../static/images/dormitory_background.png" alt="" class="dmBackground">
      <header class="header">
        <p>寝室用电情况</p>
      </header>
      <div class="dor">  
      	
        <div class="top10">
          <div class="box"></div>
          <p>寝室过去12个月的用电历史数据<br>（双击圆点可获得月数据）</p>
        </div>
        <div class="wrap">
          <div id="yearChart"></div>
        </div>
        
        <div class="distribution">
          <div class="box"></div>
          <p>寝室用电月数据</p>
        </div>
        <div class="wrap">
          <div id='monthChart'></div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import mpvueEcharts from 'mpvue-echarts'
import * as echarts from 'echarts/dist/echarts.min'

export default {
  components: {
    mpvueEcharts
  },
  data () {
    return {
      echarts,
      listData: [],//年数据（12个月）
      elec: [], //每个月的用电量
      elecTime: [], //时间
      listData1: [], //月数据
      elecMonth: [], //每天的用电量
      monthTime: [], //时间
      selectYear: 2019, 
      selectMonth: 1
    }
  },
  mounted() {
    this.getYearData()
    this.getMonthData()
  },
  methods:{
    getYearData(){
      //获得全年用电数据
      this.$http.get(this.$store.state.baseUrl+"/electricQuery/queryByRoomId/"+this.$store.state.roomId)
      .then((res)=>{
        this.elec = [];
        this.elecTime = [];
        //获得折线图中的数据
        this.listData = res.data.data;
        for(var i=0;i<this.listData.length;i++){
          if(this.listData[i].elecSpend == null){
            this.listData[i].elecSpend = 0;
          }
          this.elec.push(this.listData[i].elecSpend);
          let time = this.listData[i].recordYear + '-' + this.listData[i].recordMonth;
          this.elecTime.push(time);
        }

        this.selectYear = this.listData[0].recordYear;
        this.selectMonth = this.listData[0].recordMonth;

        this.initYearChart();

      }).catch(error=>{
        console.log(error)
      })
    },
    getMonthData(){
      //获得月用电数据
      this.$http.get(this.$store.state.baseUrl+"/electricQuery/queryByRoomIdByDay/"+this.$store.state.roomId+"/"+this.selectYear+"/"+this.selectMonth)
      .then((res)=>{
        // console.log(res.data)
        this.listData1 = res.data.data;
        this.elecMonth = [];
        this.monthTime = [];
        for(var i=0;i<this.listData1.length;i++){
          if(this.listData1[i].elecSpend == null){
            this.listData1[i].elecSpend = 0;
          }
          //加入数据
          this.elecMonth.push(this.listData1[i].elecSpend);
          let time = this.listData1[i].recordMonth + '-' + this.listData1[i].recordDay;
          this.monthTime.push(time);
        }
        this.initMonthChart();
      }).catch(error=>{
        // console.log(error)
      })
    },
    initYearChart() {
      let yearChart = this.$echarts.init(document.getElementById('yearChart'));
       // 绘制图表
      yearChart.setOption({
        grid: {
            left:'5%',
            right:'5%',
            bottom: '1%',
            top: '7%',
            containLabel:true
        },
        tooltip: {
            trigger: 'axis' ,
            axisPointer: {
              type: 'cross'
            },
            formatter: function (params, ticket, callback) {
              let value = (params[0].value).toFixed(2);
              return "用电量:" + value;
            },
            position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = {top: 60};
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
            }
              
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                rotate: 60,
            },
            boundaryGap: false,
            data: this.elecTime
        },
        yAxis: {
            type: 'value',
            //name: '用电量',
            axisLabel: {
                rotate: -45,
            }
        },
        series: {
          name: '本月用电量',
          type: 'line',
          itemStyle : {
              color:'#FF8E52'
          },
          areaStyle: {
              normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#FFCFB4" },
                    { offset: 0.5, color: "#FFF6EF" },
                    { offset: 1, color: "#FFFFFF" }
                  ])
              }
          },
          smooth: true,
          data: this.elec
        }
      });
      var that = this;
      setTimeout(function () {      
        yearChart.on('mousedown', function (params) {
          that.selectYear = params.name.substring(0,4);
          let len = params.name.length;
          that.selectMonth = params.name.substring(5,len);
          that.getMonthData();
          //清空之前数据
          that.elecMonth=[];
          that.monthTime=[];
          
        });
      });

    },
    initMonthChart(){
      let monthChart = this.$echarts.init(document.getElementById('monthChart'));
      monthChart.setOption({
        grid: {
            left:'5%',
            right:'5%',
            bottom: '1%',
            top: '5%',
            containLabel:true
        },
        tooltip: {
            trigger: 'axis' ,
            axisPointer: {
              type: 'cross'
            },
            formatter: function (params, ticket, callback) {
              let value = (params[0].value).toFixed(2);
              return "用电量:" + value;
            },
            position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = {top: 60};
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
            }
     
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                rotate: 60,
            },
            boundaryGap: false,
            data: this.monthTime
        },
        yAxis: {
            type: 'value',
            //name: '用电量',
            axisLabel: {
                rotate: -45,
            }
        },
         
        series: {
          name: '月用电量',
          type: 'line',
          itemStyle : {
              color:'#FF8E52'
          },
          areaStyle: {
              normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#FFCFB4" },
                    { offset: 0.5, color: "#FFF6EF" },
                    { offset: 1, color: "#FFFFFF" }
                  ])
              }
          },
          smooth: true,
          data: this.elecMonth
        }
      })

    },
    handleYearInit (canvas, width, height) {    
      yearChart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(yearChart)
      var that = this;
      setTimeout(function () {      
        yearChart.on('click', function (params) {
          that.selectYear = params.name.substring(0,4);
          let len = params.name.length;
          that.selectMonth = params.name.substring(5,len);
          that.getMonthData();
          //清空之前数据
          that.elecMonth=[];
          that.monthTime=[];
          
        });
      });
      yearChart.setOption(this.initYearChart());
      return yearChart
    },
    handleMonthInit (canvas, width, height) {
      monthChart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(monthChart);
      monthChart.setOption(this.initMonthChart(),true);
      return monthChart;
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
.dmBackground{
  width: 100%;
  height: 100%;
  position:absolute;
  z-index: -1;
}
.header{
    width: 100%;
    height: 10%;
    background-color: #FF8646;
    display: flex;
    align-items: center;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.header p{
    color: #ffffff;
    margin-left: 20px;
}

.title{
  color: #75827C;
  margin: 20px 0;
}

.dor {
  width: 100%;
  height: 85%;
  overflow:scroll;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  position: static;
}
.dor::-webkit-scrollbar {
    display: none;
}

.wrap{
  width: 90%;
  height: 50%;
  background: #fff;
  border: 1px solid #FFF8F2;
  border-radius: 20px;
  box-shadow: 0 0 10px #FFF8F2;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
}
#yearChart,#monthChart {
  width: 95%;
  height: 95%;
 
}
.top10{
  width:94%;
  padding-top: 20px;
}
.top10,.distribution{
    display: flex;
    flex-direction: row;
    color: #7D8983;
}
.distribution{
  margin-top: 10px;
}
.top10 p,.distribution p{
    margin-top: 0px;
}
.box{
    width: 8px;
    height: 20px;
    margin-left: 20px;
    margin-right: 10px;
    background-color: #FFE4CF;
    float: left;
}




</style>
