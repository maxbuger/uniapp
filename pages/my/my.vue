<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!nickname ? 'logo-hover' : ''">
			<image class="logo-img" :src="avatar?avatar:'../../static/logo.png'"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{nickname ? nickname : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!nickname">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="list-text">VIP到期时间</text>
				<text class="vip-tip" v-if="isEnd==1">会员已到期</text>
				<text class="vip-tip" v-else>{{vipTime}}</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="goCustomer">
				<text class="my-icon">&#xe6ad;</text>
				<text class="list-text">VIP卡密购买</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item border-bottom" @click="goRecharge">
				<text class="my-icon">&#xe91a;</text>
				<text class="list-text">VIP续费</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item border-bottom" @click="goInvite">
				<text class="my-icon">&#xe658;</text>
				<text class="list-text">邀请码</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item border-bottom" @click="goAbout">
				<text class="my-icon">&#xe668;</text>
				<text class="list-text">推广好友</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="center-list-item border-bottom" @click="share">
				<text class="my-icon">&#xe627;</text>
				<text class="list-text">分享好友</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<!-- #endif -->
			<view class="center-list-item border-bottom" @click="checkUpdate">
				<text class="my-icon">&#xe642;</text>
				<text class="list-text">版本更新</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item" @click="goAbout">
				<text class="list-icon">&#xe603;</text>
				<text class="list-text">关于</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: uni.getStorageSync('nickname'),
				avatar: '',
				serverPost: null,
				isEnd: uni.getStorageSync('is_end'), // 等于1过期
				vipTime: '',
				providerList: []
			}
		},
		onLoad(e) {
			if (uni.getStorageSync('avatar')) {
				this.avatar = this.$serverUrl + uni.getStorageSync('avatar')
			}
			// 处理vip时间
			if (uni.getStorageSync('end_time')) {
				this.vipTime = this.timetrans(Number(uni.getStorageSync('end_time')))
			}
			// #ifdef APP-PLUS
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log('获取登录通道失败' + JSON.stringify(e));
				}
			});
			// #endif
		},
		methods: {
			timetrans(date) {
				var date = new Date(date * 1000) // 如果date为13位不需要乘1000
				var Y = date.getFullYear() + '-'
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
				var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
				var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
				return Y + M + D + h + m + s;
			},
			goLogin() {
				if (!this.nickname) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				});
			},
			// VIP卡密购买
			goCustomer() {
				if (this.nickname) {
					uni.navigateTo({
						url: '/pages/my/customer'
					});
				} else {
					uni.showToast({
						title: '请先登录',
						icon: "none"
					});
				}
			},
			// VIP续费
			goRecharge() {
				if (this.nickname) {
					uni.navigateTo({
						url: '/pages/my/recharge'
					});
				} else {
					uni.showToast({
						title: '请先登录',
						icon: "none"
					});
				}
			},
			// 邀请码
			goInvite() {
				if (this.nickname) {
					uni.navigateTo({
						url: '/pages/my/invite'
					});
				} else {
					uni.showToast({
						title: '请先登录',
						icon: "none"
					});
				}
			},
			// #ifdef APP-PLUS
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : "WXSceneSession",
							type: 0,
							title: '分享',
							summary: '',
							imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/nav_menu/8.jpg',
							href: "https://m3w.cn/uniapp",
							success: (res) => {
								console.log("success:" + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
				})
			},
			// #endif
			checkUpdate() {
				uni.request({
					url: this.$serverUrl + '/mobile/index/checkUpdate',
					method: 'POST',
					success: (res) => {
						var data = res.data
						uni.showToast({
							title: data.msg,
							icon: "none"
						});
					}
				});
			}
		}
	}
</script>
<style>
	@import '../../static/style/myIcon.css'
</style>
<style>
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

	.vip-tip {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #B13531;
		text-align: right;
		font-family: texticons;
	}
</style>
