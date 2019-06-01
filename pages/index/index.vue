<template>
	<view class="container">
		<div class="swiperBox">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item>
								<view class="swiper-item uni-bg-red">
									<img src="../../static/pg1.jpg" alt="">
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">
									<img src="../../static/pg2.jpg" alt="">
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<img src="../../static/pg3.jpg" alt="">
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
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
						console.log(res.data);
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
</style>
