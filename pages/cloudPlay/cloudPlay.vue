<template>
	<view class="wrap">
		<wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="TabCur3" tab-class="text-center text-black bg-white tab-wrap"
		 select-class="text-orange"></wuc-tab>
		<swiper :current="TabCur3" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)"
		 indicator-active-color="rgba(255,255,255,0)" @change="swiperChange3">
			<swiper-item class="swiper-item">
				<view v-for="(nove,noveIndex) in novelList" :key="noveIndex" class="bg-white text-center text-black view-content">
					<view>
						<img :src="nove.image" alt="">
					</view>
					<view>{{nove.title}}</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view v-for="(video,videoIndex) in videoList" :key="videoIndex" class="bg-white text-center text-black view-content">
					<view>
						<img :src="video.image" alt="">
					</view>
					<view>{{video.title}}</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view v-for="(vip,vipIndex) in vipCateList" :key="vipIndex" class="bg-white text-center text-black view-content">
						<view>
						<img :src="vip.image" alt="">
					</view>
					<view>{{vip.title}}</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import {
		obj2style
	} from '@/js_sdk/index.js';
	export default {
		data() {
			return {
				tabList3: [{
					name: '小说'
				}, {
					name: 'VIP影视'
				}, {
					name: '视频'
				}],
				novelList: [{
					id: 1,
					image: "http://47.104.128.121:8542/uploads/adv/20190326/4863650c2daefbdf1c888ca81705932b.png",
					sort: 0,
					title: "校园青春"
				}, {
					id: 1,
					image: "http://47.104.128.121:8542/uploads/adv/20190326/4863650c2daefbdf1c888ca81705932b.png",
					sort: 0,
					title: "校园青春"
				}],
				videoList:[],
				vipCateList:[],
				TabCur3: 0,
			};
		},
		components: {
			WucTab
		},
		computed: {
			CustomBar() {
				let style = {};
				// #ifdef MP-WEIXIN
				const systemInfo = uni.getSystemInfoSync();
				let CustomBar =
					systemInfo.platform === "android" ?
					systemInfo.statusBarHeight + 50 :
					systemInfo.statusBarHeight + 45;
				style['top'] = CustomBar + 'px';
				// #endif
				// #ifdef H5
				style['top'] = 0 + 'px';
				// #endif
				return obj2style(style);
			}
		},
		methods: {
			tabChange(index) {
				this.TabCur = index;
				if (index == 0) {
					this.novelListFn()
				}else if(index == 1){
					this.videoListFn()}else if(index == 1){
					this.videoListFn()}
			},
			swiperChange3(e) {
				let {
					current
				} = e.target;
				this.TabCur3 = current;
				console.log(current)
				if (current == 0) {
					this.novelListFn()
				}
			},
			// 接口对接
			novelListFn() {
				uni.request({
					url: this.$serverUrl + '/mobile/Novel/cateList',
					method: 'GET',
					success: (res) => {
						var data = res.data
						if (data.code == 0) {
							this.cateList = data.data
							console.log(this.cateList)
						} else {
							uni.showToast({
								title: data.msg,
								icon: "none"
							});
						}
					}
				})
			},
			// 接口对接
			videoListFn() {
				uni.request({
					url: this.$serverUrl + '/mobile/Video/cateList',
					method: 'GET',
					success: (res) => {
						var data = res.data
						if (data.code == 0) {
							this.cateList = data.data
							console.log(this.cateList)
						} else {
							uni.showToast({
								title: data.msg,
								icon: "none"
							});
						}
					}
				})
			},// 接口对接
			vipCateFn() {
				uni.request({
					url: this.$serverUrl + '/mobile/Tv/vipCate',
					method: 'GET',
					success: (res) => {
						var data = res.data
						if (data.code == 0) {
							this.cateList = data.data
							console.log(this.cateList)
						} else {
							uni.showToast({
								title: data.msg,
								icon: "none"
							});
						}
					}
				})
			}
		}
	}
</script>
<style>
	@import "../../static/style/icon.scss";

	view,
	scroll-view,
	swiper {
		box-sizing: border-box;
	}

	page,
	view {
		display: flex;
	}

	page {
		display: flex;
		min-height: 100%;
		background-color: #EFEFEF;
	}

	template {
		display: flex;
		flex: 1;
	}

	.wrap {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.tab-wrap {
		height: 100upx;
	}

	.swiper {
		height: 100%;
		flex: 1;
	}

	.swiper-item {
		height: 400upx !important;
		display: flex;
		justify-content: space-between;
	}

	.view-content {
		flex: 1;
		display: flex;
		justify-content: center;
		margin: 10upx;
		padding: 20upx;
	}

	.cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}

	.cu-bar .action {
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		background-color: #ffffff;
	}

	.cu-bar .action:first-child {
		margin-left: 30upx;
		font-size: 30upx;
	}

	.solid,
	.solid-bottom {
		position: relative;
	}

	.solid::after,
	.solid-bottom::after {
		content: " ";
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: inherit;
		transform: scale(0.5);
		transform-origin: 0 0;
		pointer-events: none;
		box-sizing: border-box;
	}

	.solid::after {
		border: 1upx solid rgba(0, 0, 0, 0.1);
	}

	.solid-bottom::after {
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
	}

	.text-orange {
		color: #B13531;
	}

	.text-black {
		color: #333333;
	}

	.bg-white {
		background-color: #ffffff;
	}

	.text-center {
		text-align: center;
	}
</style>
