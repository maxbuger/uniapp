<template>
	<view class="container uni-row">
		<view class="swiperBox">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="(item,index) in advList" :key="index">
								<view class="swiper-item uni-bg-red">
									<navigator :url="item.link">
										<img :src="item.image" alt="">
									</navigator>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="inner">
			<view class="inner_item">
				<view class="inner_title">
					<view class="innerT_tl">
						<view class="jx"></view>
						<text>直播机构</text>
						<view class="textBox">持续增加</view>
					</view>
					<text class="innerT_tr">共{{total}}个</text>
				</view>
				<view class="gradBox">
					<view class="grad_item" v-for="(item,index) in liveList" :key="index">
						<view class="headPic">
							<img :src="item.img" alt="">
						</view>
						<view class="pName">{{item.title}}</view>
						<view class="playNumBox">
							<view class="playNumInner">
								<view class="playIco"></view>
								<text>{{item.number}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				total: 0,
				advList: [],
				liveList : []
			}
		},
		onLoad() {
			this.getDev()
			this.getLive()
		},
		methods:{
			getDev(){
				uni.request({
					url: this.$serverUrl + '/mobile/index/index', //仅为示例，并非真实接口地址。
					method: 'GET',
					success: (res) => {
						console.log(res.data)
						if (res.data.code === 0) {
							this.advList = res.data.data.advList
						} else {
							console.log(res.data.msg)
						}
					}
				});
			},
			getLive(){
				uni.request({
					url: this.$serverUrl + '/mobile/Live/index', //仅为示例，并非真实接口地址。
					method: 'POST',
					success: (res) => {
						console.log(res.data)
						if (res.data.code === 0) {
							this.liveList = res.data.data.lists
						} else {
							console.log(res.data.msg)
						}
					}
				});
			}
		}
	}
</script>

<style>
	.container {
		background: #fff;
	}
	.swiperBox{
		height: 360upx;
		width: 750upx;
	}
	.swiper-item img{
		display: block;
		object-fit: cover;
		height: 360upx;
		width: 750upx;
	}
	.swiper{
		height: 360upx;
		width: 750upx;
	}
	.inner{
		/* width: 750upx; */
	}
	.inner_title{
		box-sizing: border-box;
		border-bottom: 1px solid #e5e5e5;
		width: 750upx;
		display: flex;
		height: 70upx;
		padding: 0 40upx;
		justify-content: space-between;
		/* background: #007AFF; */
	}
	.innerT_tl,.innerT_tr{
		height: 100%; 
		display: flex;
		align-items: center;
	}
	.innerT_tl{
		font-size: 28upx;
		color: #333;
	}
	.jx{
		width: 8upx;
		height: 40upx;
		background-color: #ccc;
		margin-right: 10upx;
	}
	.textBox{
		padding: 5upx 10upx;
		background-color: #B13531;
		color: #fff;
		font-size: 20upx;
		margin-left: 10upx;
		border-radius: 4upx;
	}
	.innerT_tr{
		font-size: 24upx;
		color: #666;
	}
	.gradBox{
		display: flex;
		flex-wrap: wrap;
	}
	.grad_item{
		width: 33.33%;
		box-sizing: border-box;
		padding: 20upx;
		height: 250upx;
		border-right: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		text-align: center;
	}
	.grad_item:nth-child(3n){
		border-right: none;
	}
	.headPic{
		width: 80upx;
		height: 80upx;
		background-color: #e5e5e5;
		margin: 0 auto 20upx;
	}
	.headPic img{
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	.pName{
		font-size: 24upx;
		text-align: center;
		color: #333;
	}
	.playNumBox{
		display: inline-block;
		font-size: 24upx;
		padding: 5upx 10upx;
		background-color: #B13531;
		color: #fff;
	}
</style>
