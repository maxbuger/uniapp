<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!nickname ? 'logo-hover' : ''">
			<image class="logo-img" :src="avatar ? avatar :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{nickname ? nickname : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!nickname">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="list-text">VIP到期时间</text>
				<text class="vip-tip">会员已到期</text>
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
			<view class="center-list-item border-bottom">
				<text class="my-icon">&#xe627;</text>
				<text class="list-text">分享好友</text>
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
				nickname: window.sessionStorage.getItem('nickname'),
				avatar: window.sessionStorage.getItem('avatar'),
				serverPost: null,
				avatarUrl: '/static/logo.png',
			}
		},
		onLoad(e) {
			this.avatar = this.$serverUrl + window.sessionStorage.getItem('avatar')
		},
		methods: {
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
				uni.navigateTo({
					url: '/pages/my/customer'
				});
			},
			// VIP续费
			goRecharge() {
				uni.navigateTo({
					url: '/pages/my/recharge'
				});
			},
			// 邀请码
			goInvite() {
				uni.navigateTo({
					url: '/pages/my/invite'
				});
			}
		}
	}
</script>
<style>
	@import '../../static/style/myIcon.css'
</style>
<style>
	.vip-tip {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #B13531;
		text-align: right;
		font-family: texticons;
	}
</style>
