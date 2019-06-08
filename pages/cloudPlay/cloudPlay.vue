<template>
	<view class="wrap">
		<wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="tabCur" tab-class="text-center bg-white tab-wrap" select-class="text-orange"></wuc-tab>
		<swiper :current="tabCur" class="swiper" duration="500" :circular="true" indicator-color="rgba(255,255,255,0)"
		 indicator-active-color="rgba(255,255,255,0)" @change="swiperChange3">
			<!-- 小说 -->
			<swiper-item class="swiper-item">
				<view v-for="(nove,noveIndex) in novelList" :key="noveIndex" class="bg-white text-center text-black view-content"
				 @click="getCateId(0,nove.id,nove.title)">
					<view class="image">
						<image :src="nove.image" alt=""></image>
					</view>
					<view class="title">{{nove.title}}</view>
				</view>
			</swiper-item>
			<!-- vip视频 -->
			<swiper-item class="swiper-item">
				<view v-for="(vip,vipIndex) in vipCateList" :key="vipIndex" class="bg-white text-center text-black view-content"
				 @click="openVipLink(vip.link)">
					<view class="image">
						<image :src="vip.image" alt=""></image>
					</view>
					<view class="title">{{vip.title}}</view>
				</view>
			</swiper-item>
			<!-- 视频 -->
			<swiper-item class="swiper-item">
				<view v-for="(video,videoIndex) in videoList" :key="videoIndex" class="bg-white text-center text-black view-content"
				 @click="getCateId(2,video.id,video.title)">
					<view class="image">
						<image :src="video.image" alt=""></image>
					</view>
					<view class="title">{{video.title}}</view>
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
				novelList: [], // 小说
				videoList: [], // 视频
				vipCateList: [], // vip视频
				tabCur: 0,
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
		onReady() {
			uni.showLoading({
				title: '加载中'
			});
			this.queryChange(this.tabCur)
		},
		onPullDownRefresh() {
			this.refreshing = true;
			this.queryChange()
		},
		methods: {
			tabChange(index) {
				this.TabCur = index;
				this.queryChange()
			},
			swiperChange3(e) {
				let {
					current
				} = e.target;
				this.tabCur = current;
				this.queryChange()
			},
			queryChange() {
				var url = ''
				if (this.tabCur == 0) {
					// 小说
					url = '/mobile/Novel/cateList'
				} else if (this.tabCur == 1) {
					// vip视频
					url = '/mobile/Tv/vipCate'
				} else if (this.tabCur == 2) {
					// 视频
					url = '/mobile/Video/cateList'
				}
				uni.request({
					url: this.$serverUrl + url,
					method: 'GET',
					success: (res) => {
						var data = res.data
						if (data.code == 0) {
							if (this.tabCur == 0) {
								this.novelList = data.data
							} else if (this.tabCur == 1) {
								this.vipCateList = data.data
							} else if (this.tabCur == 2) {
								this.videoList = data.data
							}
						} else {
							uni.showToast({
								title: data.msg,
								icon: "none"
							});
						}
						uni.stopPullDownRefresh();
						uni.hideLoading();
					}
				})
			},
			openVipLink(url) {
				if (plus) {
					plus.runtime.openURL(url);
				} else {
					window.open(url);
				}
			},
			getCateId(type, cateId, title) {
				uni.navigateTo({
					url: '/pages/list/list?type=' + type + '&cateId=' + cateId + '&title=' + title
				});
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
		display: flex;
		flex-wrap: wrap;
		overflow-y: auto;
	}

	.view-content {
		width: 46vw;
		height: 350upx;
		margin: 10upx 2vw;
		display: flex;
		border-radius: 6upx;
		flex-direction: column;
	}

	.image {
		flex: 1;
		padding: 10upx;
		width: 100%;
		position: relative;
	}

	.image image {
		width: 100%;
		height: 100%;
	}

	.title {
		width: 100%;
		height: 60upx;
		justify-content: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
