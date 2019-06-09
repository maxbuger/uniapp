<template>
	<view class="center customer">
		<view class="center-list">
			<view class="center-list-item list-item">说明：</view>
			<view class="center-list-item list-item">
				<text>{{info.desc}}</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item list-item">
				<button type="default" class="login" hover-class="hover" @click="openLink(info.forever_url)">永久VIP</button>
			</view>
			<view class="center-list-item list-item">
				<button type="default" class="login" hover-class="hover" @click="openLink(info.year_url)">年度VIP</button>
			</view>
			<view class="center-list-item list-item">
				<button type="default" class="login" hover-class="hover" :src="info.season_url">季节VIP</button>
			</view>
			<view class="center-list-item list-item">
				<button type="default" class="login" hover-class="hover" :src="info.month_url">月度VIP</button>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item list-item">
				<text>{{info.contact}}</text>
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
			this.customer()
		},
		methods: {
			customer() {
				uni.request({
					url: this.$serverUrl + '/mobile/user/customer',
					method: 'POST',
					header: {
						token: uni.getStorageSync('token'),
						uid: uni.getStorageSync('uid')
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
			openLink(url) {
				if (plus) {
					plus.runtime.openURL(url);
				} else {
					window.open(url);
				}
			}
		}
	}
</script>
<style>
	.customer {
		border-top: 4upx solid #e5e5e5;
		background-color: #ffffff;
	}

	.list-item {
		height: auto !important;
		margin: 20upx 0;
	}

	.item-btn {
		margin-right: 10upx;
	}
</style>
