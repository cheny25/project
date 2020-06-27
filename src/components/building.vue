<template>
	<div class="page">
		<div class="contain">
			<img src="../../static/images/img2.jpg">
			<header class="header">
				<p>楼栋用电情况</p>
			</header>
			<div id="content">
				<div class="top10">
					<div class="box"></div>
					<p>用电量TOP10</p>
				</div>
				<div class="chart"></div>
				
				<div class="distribution">
					<div class="box"></div>
					<p>楼栋用电量分布</p>
				</div>
				<div class="chart"></div>

				<div class="nightType">
					<div class="box"></div>
					<p>夜间用电类型</p>
				</div>
				<div class="chart"></div>
			</div>
	</div></div>
	
</template>
<script>
	import * as echarts from 'echarts/dist/echarts.min'
	import mpvueEcharts from 'mpvue-echarts'
	let barChart,scatterChart;
	export default{
		name:"building",
		data () {
		    return {
			    echarts,
			    topData:[],
			    topId:[],
			    consumptionType:[],
			    nighttimeType:[],
			    toMsg:[],
			}
		},
		mounted:function(){
			this.getElecTopMsg();
			this.getElecBuildMsg();
			this.getNightType();
		},
		methods:{
			//调用getElecTop来显示用电量TOP10的寝室
			elecTop: function () {
			    barChart = this.$echarts.init(document.getElementsByClassName('chart')[0])
			    //设置柱状图的基本样式与数据
			    let topOption = {
			    	tooltip: {},
				    xAxis: {
				        data: this.topId,
				        axisLabel: {  
						   interval:0,  
						   rotate:40  
						} 
				    },
				    yAxis: {},
				    grid: {
				    	left:'5%',
				    	right:'5%',
				    	bottom: '1%',
				    	top: '10%',
				    	containLabel:true
				    },
				    series: [{
				        name: '用电量TOP10',
				        type: 'bar',
				        data: this.topData,
				        itemStyle: {
				        	normal:{
				        		color: function(params) {
				        			var colorList = [
				        				'#E92C60','#71ADFC','#FFC900','#FF8646','#17DFB7','#8780FD','#FF0080','#E24E66','#FF3000','#60C0DD'
				        			];
				        			return colorList[params.dataIndex];
				        		},
				        		label: {
				        			show:true,
				        		},
				        		barBorderRadius:[6,6,0,0]
				        	},
				        }
				    }]
			    }
				
			    barChart.setOption(topOption);
			    return barChart;
			},
			
			//调用getElecBuild来显示楼栋用电量
			elecbuild: function (canvas, width, height) {
			    scatterChart = this.$echarts.init(document.getElementsByClassName('chart')[1])
			    //设置饼图的基本样式与数据
			    var options = {
			    	tooltip: {
			            trigger: 'item',
			            formatter: "{d}%"
			        },
			        color: ['#E9285D', '#FF8646', '#8780FD', '#17DFB7','#71ADFC'],
			        series: [
			            {
			                name: '楼栋用电',
			                hoverAnimation:false,
			                type: 'pie',
			                radius: '60%',
			                center: ['50%', '50%'],
			                data: [
			                    {value: this.consumptionType[0], name: '用电量\n较低',label:{normal:{show:true}},labelLine:{normal:{show:true}}
				                },
			                    {value: this.consumptionType[1], name: '用电量\n平均',label:{normal:{show:true}},labelLine:{normal:{show:true}}
			                	},
			                    {value: this.consumptionType[2], name: '用电量\n较高',label:{normal:{show:true}},labelLine:{normal:{show:true}}
			                	},
			                ],
			                itemStyle: {
			                    emphasis: {
			                        shadowBlur: 10,
			                        shadowOffsetX: 0,
			                        shadowColor: 'rgba(128, 128, 128, 0.5)'
			                    }
			                }
			            }
			        ]
			    }
			    let opt = options.series[0].data;
			    for(let i=0;i<opt.length;i++){
			    	if(opt[i].value==0){
			    		opt[i].label.normal.show = false;
			    		opt[i].labelLine.normal.show = false;
			    	}
			    }
			    scatterChart.setOption(options);
			    return scatterChart;
			},

			elecNight: function (canvas, width, height) {
			    scatterChart = this.$echarts.init(document.getElementsByClassName('chart')[2])
			    //设置饼图的基本样式与数据
			    var options = {
			    	tooltip: {
			            trigger: 'item',
			            formatter: "{d}%"
			        },
			        color: ['#E24E66','#FF3000','#60C0DD', '#8780FD','#FF0080'],
			        series: [
			            {
			                name: '夜间用电类型',
			                hoverAnimation:false,
			                type: 'pie',
			                radius: '60%',
			                center: ['50%', '50%'],
			                data: [
			                    {value: this.nighttimeType[0], name: '经常\n熬夜',label:{normal:{show:true}},labelLine:{normal:{show:true}}
				                },
			                    {value: this.nighttimeType[1], name: '偶尔\n熬夜',label:{normal:{show:true}},labelLine:{normal:{show:true}}
			                	},
			                    {value: this.nighttimeType[2], name: '作息\n规律',label:{normal:{show:true}},labelLine:{normal:{show:true}}
			                	},
			                ],
			                itemStyle: {
			                    emphasis: {
			                        shadowBlur: 10,
			                        shadowOffsetX: 0,
			                        shadowColor: 'rgba(128, 128, 128, 0.5)'
			                    }
			                }
			            }
			        ]
			    }
			    let opt = options.series[0].data;
			    for(let i=0;i<opt.length;i++){
			    	if(opt[i].value==0){
			    		opt[i].label.normal.show = false;
			    		opt[i].labelLine.normal.show = false;
			    	}
			    }
			    scatterChart.setOption(options);
			    return scatterChart;
			},

			//通过接口，获取用电量TOP10情况
			getElecTopMsg:function(){
				let buildingUrl = "/electricQuery/getBuildingElecTop10/";
				this.$http.get(this.$store.state.baseUrl+buildingUrl+this.$store.state.buildingId)
				.then(response=>{
					this.topMsg = response.data.data;
					this.topData = [];
					this.topId = [];
					for (let i=0;i<this.topMsg.length;i++){
						this.topData.push(this.topMsg[i].elecSpend);
						this.topId.push(this.topMsg[i].codeById);
					}
					this.elecTop();
				})
				.catch(err=>{
					console.log(err);
				})
			},
			//通过接口，获取楼栋用电量情况
			getElecBuildMsg:function(){
				let buildingUrl = "/electricQuery/getBuildingConsumptionElecRatio/";
				this.$http.get(this.$store.state.baseUrl+buildingUrl+this.$store.state.buildingId)
				.then(response=>{
					let msg = response.data.data;
					this.consumptionType[0] = msg.consumptionType0*100;
					this.consumptionType[1] = msg.consumptionType1*100;
					this.consumptionType[2] = msg.consumptionType2*100;

					this.elecbuild();
				})
				.catch(err=>{
					console.log(err);
				})
			},
			//通过接口，获取夜间用电类型
			getNightType:function(){
				let nightTypeUrl = "/electricQuery/getBuildingNighttimeElecRatio/";
				this.$http.get(this.$store.state.baseUrl+nightTypeUrl+this.$store.state.buildingId)
				.then(response=>{
					let useType = response.data.data;
					this.nighttimeType[0]=useType.nighttimeType0*100;
					this.nighttimeType[1]=useType.nighttimeType1*100;
					this.nighttimeType[2]=useType.nighttimeType2*100;

					this.elecNight();
				})
				.catch(err=>{
					console.log(err);
				})
			}
		},
		components: {
			mpvueEcharts
		}
	}
	
</script>
<style scoped>
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
.header{
    width: 100%;
    height: 10%;
    background-color: #71ADFC;
    display: flex;
    align-items: center;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.header p{
    color: #ffffff;
    margin-left: 20px;
}
    #content{
  width: 100%;
  height: 85%;
  /* overflow:scroll; */
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
    }
    .top10{
        padding-top: 20px;

    }
    .top10,.distribution,.nightType{
        
        display: flex;
        flex-direction: row;
        color: #7D8983;
    }
	.top10 p,.distribution p,.nightType p{
		margin-top: 0px;
	}
    .box{
        width: 8px;
        height: 20px;
        margin-left: 20px;
        margin-right: 10px;
        background-color: #E4F0FF;
        float: left;
    }
    .chart{
        width: 85%;
        height: 170px;
        margin-left: 20px;
        margin-bottom: 10px;
        background: #fff;
        border: 1px solid #E4F0FF;
        border-radius: 20px;
        box-shadow: 0 0 10px #E4F0FF;
    }
    img{
    	width: 100%;
    	height: 100%;
    	position:absolute;
  z-index: -1;
    }
</style> 
