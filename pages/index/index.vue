<template>
	<view class="container uni-row">
		<!-- <view class="swiperBox">
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
		</view> -->
		<view>sdfsdf</view>
		<view class="inner">
			<view class="inner_item">
				<view class="inner_title">
					<view class="innerT_tl">
						
					</view>
					<view class="innerT_tr"></view>
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
				advList: []
			}
		},
		onLoad() {
			this.getDev()
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
			}
		}
	}
</script>

<style>
	.container {}
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
		width: 750upx;
	}
	.inner_title{
		width: 750upx;
		display: flex;
		height: 60upx;
		justify-content: space-between;
		background: #007AFF;
	}
	.innerT_tl,.innerT_tl{
		height: 100%; 
	}
</style>
