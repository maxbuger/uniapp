<template>
	<view class="container">
		<view class="swiperBox">
			<view class="tipsBox">
				<view class="tipsIco"></view>
				<view class="marquee">{{notice}}</view>
			</view>
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="(item,index) in advList" :key="index">
								<view class="swiper-item">
									<view @click="toDevLink(item.link)">
										<img :src="item.image" alt="">
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="inner_title">
			<view class="innerT_tl">
				<view class="jx"></view>
				<text>直播机构</text>
				<view class="textBox">持续增加</view>
			</view>
			<text class="innerT_tr">共{{total}}个</text>
		</view>
		<view class="inner">
			<view class="inner_item">
				<view class="gradBox">
					<view class="grad_item" v-for="(item,index) in liveList" :key="index" @click="toLive(item)">
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
				liveList: [],
				notice: ''
			}
		},
		onLoad() {
			this.getDev()
			this.getLive()
		},
		onPullDownRefresh() {
			this.getLive()
		},
		methods: {
			getDev() {
				uni.request({
					url: this.$serverUrl + '/mobile/index/index',
					method: 'GET',
					success: (res) => {
						console.log(res.data)
						if (res.data.code === 0) {
							this.advList = res.data.data.advList
							this.notice = res.data.data.notice
						} else {
							console.log(res.data.msg)
						}
					}
				});
			},
			getLive() {
				uni.request({
					url: this.$serverUrl + '/mobile/Live/index',
					method: 'POST',
					success: (res) => {
						if (res.data.code === 0) {
							this.liveList = res.data.data.lists
							this.total = res.data.data.count
						} else {
							console.log(res.data.msg)
						}
					}
				});
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 500)
			},
			toDevLink(url) {
				if (plus) {
					plus.runtime.openURL(url);
				} else {
					window.open(url);
				}
			},
			toLive(params) {
				uni.navigateTo({
					url: 'index_detail?title=' + params.title + '&name=' + params.name + '&img=' + params.img
				});
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		overflow: hidden;
		max-height: 100vh;
		flex-direction: column;
		background: #fff;
	}

	.swiperBox {
		position: relative;
		height: 360upx;
		width: 750upx;
	}

	.tipsBox {
		position: absolute;
		z-index: 99;
		top: 0;
		left: 0;
		width: 750upx;
		height: 50upx;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 30upx;
		font-size: 20upx;
	}

	.marquee {
		white-space: nowrap;
		/* 　　		overflow:-webkit-marquee; */
	}

	.tipsIco {
		height: 30upx;
		width: 30upx;
		background: url(../../static/icon/laba.png) no-repeat center center;
		background-size: 100% 100%;
		margin-right: 10upx;
	}

	.swiper-item img {
		display: block;
		object-fit: cover;
		height: 360upx;
		width: 750upx;
	}

	.swiper {
		height: 360upx;
		width: 750upx;
	}

	.inner {
		/* width: 750upx; */
		flex: 1;
		overflow: auto;
	}

	.inner_title {
		box-sizing: border-box;
		border-bottom: 1px solid #e5e5e5;
		width: 750upx;
		display: flex;
		height: 70upx;
		padding: 0 40upx;
		justify-content: space-between;
		/* background: #007AFF; */
	}

	.innerT_tl,
	.innerT_tr {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.innerT_tl {
		font-size: 28upx;
		color: #333;
	}

	.jx {
		width: 8upx;
		height: 40upx;
		background-color: #ccc;
		margin-right: 10upx;
	}

	.textBox {
		padding: 5upx 10upx;
		background-color: #B13531;
		color: #fff;
		font-size: 20upx;
		margin-left: 10upx;
		border-radius: 4upx;
	}

	.innerT_tr {
		font-size: 24upx;
		color: #666;
	}

	.gradBox {
		display: flex;
		flex-wrap: wrap;
	}

	.grad_item {
		width: 33.33%;
		box-sizing: border-box;
		padding: 20upx;
		height: 230upx;
		border-right: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		text-align: center;
	}

	.grad_item:nth-child(3n) {
		border-right: none;
	}

	.headPic {
		width: 80upx;
		height: 80upx;
		background-color: #e5e5e5;
		margin: 0 auto 20upx;
	}

	.headPic img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.pName {
		font-size: 24upx;
		text-align: center;
		color: #333;
		margin-bottom: 10upx;
	}

	.playNumBox {
		display: inline-block;
		font-size: 20upx;
		padding: 5upx 10upx;
		background-color: #B13531;
		color: #fff;
		border-radius: 5upx;
	}

	.playNumInner {
		display: flex;
		align-items: center;
	}

	.playIco {
		height: 30upx;
		margin-right: 10upx;
		width: 30upx;
		background: url(../../static/icon/video_white.png) no-repeat center center;
		background-size: 100% 100%;
	}
</style>
