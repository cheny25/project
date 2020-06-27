<!-- 查看用户余额 -->
<template>
	<div class="page">
		<div class="balance">
			<div id="top">
				<p>电费余额</p>
			</div>
			<div id="content">
				<div id="con">
					<p id="recordtime">统计时间   {{recordTime}}</p><br>
					<div id="lastMoney">
						<div class="box"></div>
						<p>电费余额 <span class="mouth1">{{lastMoney}}</span> 元</p>
					</div>
					<div id="elecSpend">
						<div class="div1">
							<p style="color:#797474">本月用电</p>
							<p><span class="mouth">{{elecStart}}</span> 度</p>
						</div>
						<div id="box1"></div>
						<div class="div1">
							<p style="color:#797474">本月电费</p>
							<p><span class="mouth">{{elecCost}}</span> 元</p>
						</div>
					</div>
					<div id="start">
						<div class="box2"></div>
						<div class="elec">
							<p>电起始度</p>
							<p>{{elecStart}}</p>
						</div>
					</div>
					<div id="end">
						<div class="box2"></div>
						<div class="elec">
							<p>电终止度</p>
							<p>{{elecEnd}}</p>
						</div>
					</div>
					<div id="expectOutageTime">
						<div class="box2"></div>
						<div class="elec">
							<p>预计欠费时间</p>
							<p>{{expectOutageTime}}</p>
						</div>
					</div>
				</div>
				<img src="../../static/images/img1.jpg">
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'balance',
		data(){
			return {
				elecCost:0,  
				elecEnd:0,
				elecFree:0,
				elecSpend:0,
				elecStart:0,
				expectOutageTime:'',
				lastMoney:0,
				recordTime:''
			}
		},
		mounted:function(){
			// 在页面加载时，获取信息
			// 请求数据所属
			let balanceUrl = "/electricExpense/query/";
			this.$http.get(this.$store.state.baseUrl+balanceUrl+this.$store.state.roomId)
			.then(response => {
				var data = response.data.data;
				this.elecCost = data.elecCost;
				this.elecEnd = data.elecEnd;
				this.elecFree = data.elecFree;
				this.elecSpend = data.elecSpend;
				this.elecStart = data.elecStart;
				//调用函数，将时间戳格式转换为日期
				this.expectOutageTime = this.timestampToTime(data.expectOutageTime); 
				this.lastMoney = data.lastMoney;
				this.recordTime = this.timestampToTime(data.recordTime);
			})
			.catch(err => {
				console.log(err);
			})
		},
		methods:{
			//将时间戳转换为日期格式
			timestampToTime:function(timestamp) {
		        let date = new Date(timestamp);
		        let Y = date.getFullYear() + '-';
		        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        let D = date.getDate() + ' ';
		        let h = date.getHours() + ':';
		        let m = date.getMinutes() + ':';
		        let s = date.getSeconds();
		        return Y+M+D;
	    	}
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
	}
	.balance{
		width: 95%;
		height: 87%;
		margin-top: 8%;
		background: #ccc;
		box-shadow: 0 0 20px #E0DFE4;
	}
	#top{
		  width: 100%;
		  height: 10%;
		  background-color: #7B73FD;
		  display: flex;
		  align-items: center;
		  border-radius: 7px 7px 0 0;
	}
	#top p{
		color: #ffffff;
		margin-left: 20px;
	}
	#content{
		width: 100%;
		height: 90%;
		background: #fff;
		position:relative;
	}
	#lastMoney p{
	 	margin-top: 0px;
	 }
	.box{
		width: 8px;
		height: 20px;
		margin-left: 20px;
		margin-right: 10px;
		background-color: #DEDCFF;
		float: left;
	}
	#recordtime{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding-right: 10%;
		margin-bottom: -2%;
		color: #A49EFD;
		font-size: 3vm;
	}
	#lastMoney,#elecSpend,#expectOutageTime{
		margin-bottom: 8px;
		display: flex;
		flex-direction: row;
	}
	#start,#end,#expectOutageTime{
		width:80%;
		height: 40px;
		margin-bottom: 20px;
		display: flex;
		flex-direction: row;
	}
	.box2{
		width: 8px;
		height: 20px;
		margin-left: 20px;
		margin-right: 10px;
		margin-top: 20px;
		background-color: #DEDCFF;
		float: left;
	}
	.elec{
		width: 100%;
		height: 20px;
		margin-top: 20px;
		padding-top: 5px;
		padding-right: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		line-height: 12px;
	}
	.elec p{
		margin-top: 0px;
	}
	#elecSpend{
		margin-left: 20px;
		width: 86%;
		height: 100px;
		border: 1px solid #DEDCFF;
		border-radius: 8px;
		box-shadow: 0 0 8px #DEDCFF;
		display: flex;
		flex-direction: row;
	}
	.div1{
		width: 50%;
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.div1 p{
		margin-top: 0px;
	}
	#box1{
		width: 1px;
		height: 70px;
		box-shadow: 0 0 2px #DEDCFF;
		margin-top: 15px;
		background: #DEDCFF;
	}
	.mouth{
		font-size: 5vm;

	}
	.mouth1{
		font-size: 4vm;
	}
	#con{
		width: 100%;
		height: auto;
    	position: absolute;
    	z-index:2;
    }
    img{
    	width: 100%;
    	height: 50%;
    	bottom:0;
    	left:0;
    	position: absolute;
    	z-index: 1;
    }
	
</style>
