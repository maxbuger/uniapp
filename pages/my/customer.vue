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
				<button type="default" class="login" hover-class="hover" @click="navito(info.forever_url)">永久VIP</button>
			</view>
			<view class="center-list-item list-item">
				<button type="default" class="login" hover-class="hover" @click="navito(info.year_url)">年度VIP</button>
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
			navito(url) {
				window.open(url)
			}
		}
	}
</script>
<style>
	.customer {
		border-top: 4upx solid #C8C7CC;
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
