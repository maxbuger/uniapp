<template>
	<view class="container">
		<view class="info">
			<view class="info_l">
				<img :src="headPic" alt="">
			</view>
			<view class="info_r">
				<view class="info_rTop">
					<text class="liveTitle">{{liveTitle}}</text>
					<text class="ptai">直播平台</text>
					<view class="numBox">
						<view class="numBoxIco"></view>
						<text>{{total}}</text>
					</view>
				</view>
				<view class="info_tips">
					本平台所有直播及图片内容全部都是由服务器从第三方获取内容
				</view>
			</view>
		</view>
		<view class="videoList">
			<view class="vItemBox" v-for="(item,index) in videoList" :key="index">
				<view class="vItem" @click="toPlayer(item)">
					<img :src="item.img" alt="">
					<view class="pNum">
						<view class="pIco"></view>
						<view class="pTotal">{{Math.floor(Math.random()*300 + 300)}}</view>
					</view>
					<view class="pDes">{{item.title}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				liveName: '',
				liveTitle: '',
				total: 0,
				videoList: []
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.liveName = option.name
			this.liveTitle = option.title
			this.headPic = option.img
			console.log(this.headPic)
			uni.setNavigationBarTitle({
				title: option.title
			});
			this.getLiveHouse()
		},
		methods: {
			getLiveHouse() {
				uni.request({
					url: this.$serverUrl + '/mobile/live1/anchors?name='+this.liveName, //仅为示例，并非真实接口地址。
					method: 'POST',
					success: (res) => {
						if (res.data.code === 0) {
							let data = res.data.data
							this.total = data.count
							this.videoList = data.lists
						} else {
							console.log(res.data.msg)
						}
					}
				});
			},
			toPlayer(params){
				console.log(params)
				uni.navigateTo({
					url: 'player?play_url='+params.play_url+'&id='+params.id
				});
			}
		}
	}
</script>

<style>
	.container{
		/* display: flex; */
		/* min-height: 100%; */
		width: 750upx;
		background: #fff;
		padding: 20upx;
		box-sizing: border-box;
	}
	.info{
		width: 100%;
		box-sizing: border-box;
		padding: 0 20upx;
		height: 200upx;
		display: flex;
		align-items: center;
		background: url(../../static/icon/banner.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.info_l{
		height: 120upx;
		width: 120upx;
		border-radius: 50%;
		margin-right: 10upx;
		overflow: hidden;
		background: #007AFF;
	}
	.info_l img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.info_r{
		width: 540upx;
	}
	.info_rTop{
		display: flex;
		/* height: 60upx; */
		align-items: baseline;
		font-size: 24upx;
		border-bottom: 1px solid #fff;
		color: #fff;
		margin-bottom: 10upx;
		padding-bottom: 10upx;
	}
	.liveTitle{
		font-size: 32upx;
		margin-right: 10upx;
	}
	.ptai{
		margin-right: 10upx;
	}
	.info_tips{
		font-size: 20upx;
		color: #fff;
		/* white-space:normal; */
	}
	.numBox{
		display: flex;
		align-items: center;
		padding: 4upx 20upx;
		font-size: 20upx;
		color: #333;
		border-radius: 20upx;
		background-color: #fff;
	}
	.numBoxIco{
		height: 30upx;
		width: 30upx;
		background: url(../../static/icon/video_black.png) no-repeat center center;
		background-size: 100% 100%;
		margin-right: 10upx;
	}
	.videoList{
		width: 710upx;
		padding: 20upx 0;
		display: flex;
		flex-wrap: wrap;
	}
	.vItemBox{
		width: 355upx;
		padding-right: 10upx;
		box-sizing: border-box;
	}
	.vItem{
		position: relative;
		height: 280upx;
		margin-bottom: 20upx;
		border-radius: 15upx;
		overflow: hidden;
	}
	.vItemBox:nth-child(2n){
		padding-right: 0upx;
		padding-left: 10upx;
	}
	.vItem img{
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	.pNum{
		position: absolute;
		top: 15upx;
		right: 15upx;
		padding: 0 20upx;
		height: 40upx;
		display: flex;
		align-items: center;
		background-color: rgba(0,0,0,0.2);
		border-radius: 20upx;
	}
	.pIco{
		height: 40upx;
		width: 40upx;
		background: url(../../static/icon/we.png) no-repeat center center;
		background-size: 100% 100%;
		margin-right: 10upx;
	}
	.pTotal{
		font-size: 20upx;
		color: #fff;
	}
	.pDes{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 40upx;
		font-size: 24upx;
		white-space: nowrap;
		color: #fff;
		display: flex;
		align-items: center;
		background-color: rgba(0,0,0,0.2);
		padding: 0 15upx;
	}
</style>
