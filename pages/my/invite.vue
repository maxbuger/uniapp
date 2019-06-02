<template>
	<view class="center invite">
		<view class="center-list">
			<view class="center-list-item list-item">邀请码：<text>{{info.intive_code}}</text></view>
		</view>
		<view class="center-list">
			<view class="center-list-item list-item">
				<button type="default" class="login item-btn" hover-class="hover" @click="downloadUrl(info.android_download_url)">Android下载</button>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item list-item">
				<button type="default" class="login item-btn" hover-class="hover" @click="downloadUrl(info.ios_download_url)">IOS下载</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			};
		},
		onLoad() {
			this.invite()
		},
		methods: {
			invite() {
				uni.request({
					url: this.$serverUrl + '/mobile/user/invite',
					method: 'POST',
					header: {
						token: window.sessionStorage.getItem('token'),
						uid: window.sessionStorage.getItem('uid')
					},
					success: (res) => {
						var data = res.data
						if (data.code == 0) {
							this.info = data.data
						} else {
							uni.showToast({
								title: data.msg,
								icon: "none"
							});
						}
					}
				});
			},
			downloadUrl(url) {
				window.open(url)
			}
		}
	}
</script>
<style>
	.invite {
		border-top: 4upx solid #C8C7CC;
		background-color: #ffffff;
	}
</style>
