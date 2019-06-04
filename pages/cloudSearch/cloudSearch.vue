<template>
	<view class="container">
		<view class="tjList_title">搜索推荐</view>
		<view class="tjList">
			<view class="tjList_item" v-for="(item,index) in tjList" :key="index">{{item}}</view>
		</view>
		<view class="history">
			<view class="historyTitle">
				<view class="historyTitle_l">搜索历史</view>
				<view class="historyTitle_r" @click="clear">
					<view class="deleteIco"></view>
					<text>清空</text>
				</view>
			</view>
			<view class="tjList">
				<view class="tjList_item" v-for="(item,index) in historyList" :key="index">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				keyWord: '学生',
				page: 1,
				historyList: [],
				tjList:["肛交","褐发","黑人","红髮","金髮","巨屌","巨乳","巨臀","口交","拉丁裔","辣妈","美臀","男同","女同","胖女","喷出","群交","人妖","少女","射颜","摄像头","双性恋","丝袜","涂油","亚洲的","业余","异族","印度的","中出","自慰"]
			}
		},
		onLoad(){
			this.searchVideo()
		},
		onNavigationBarSearchInputConfirmed(option){
			if(this.historyList.indexOf(option.text)===-1){
				this.historyList.push(option.text)
			}
		},
		methods:{
			searchVideo() {
				console.log(111)
				uni.request({
					url: 'http://javdi.com/?k='+this.keyWord+'&p='+this.page,
					method: 'GET',
					success: (res) => {
						console.log(res)
						console.log(res.data)
						let setData = document.getElementById('setData');
						setData.innerHTMl= res.data
					}
				});
			},
			clear(){
				this.historyList = []
			}
		}
	}
</script>

<style>
	#setData{
		/* display: none; */
	}
	.container{
		width: 750upx;
		box-sizing: border-box;
		padding: 0 20upx;
		background: #fff;
	}
	.tjList{
		display: flex;
		flex-wrap: wrap;
	}
	.tjList_title{
		height: 60upx;
		color: #666;
		display: flex;
		align-items: center;
		font-size: 24upx;
	}
	.tjList_item{
		font-size: 24upx;
		padding: 5upx 15upx;
		color: #666;
		border-radius: 5upx;
		border: 1px solid #e5e5e5;
		text-align: center;
		color: #333;
		margin-right: 10upx;
		margin-bottom: 10upx;
	}
	.historyTitle{
		display: flex;
		height: 60upx;
		font-size: 24upx;
		color: #666;
		align-items: center;
		justify-content: space-between;
	}
	.historyTitle_r{
		display: flex;
		align-items: center;
	}
	.deleteIco{
		height: 30upx;
		margin-right: 10upx;
		width: 30upx;
		background: url(../../static/icon/laji.png) no-repeat center center;
		background-size: 100% 100%;
	}
</style>
