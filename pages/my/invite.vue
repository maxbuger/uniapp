<template>
	<view>
		<view class="button-view" v-if="btnBol">
			<button type="default" class="login" hover-class="hover" @click="customer">获取邀请码</button>
		</view>
		<view class="center customer" v-if="!btnBol">
			<view class="center-list">
				<view class="center-list-item">
					{{info.contact}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				btnBol: true
			};
		},
		methods: {
			customer() {
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
							this.btnBol = false
							this.info = data.data
						} else {
							this.btnBol = true
							uni.showToast({
								title: data.msg,
								icon: "none"
							});
						}
					}
				});
			}
		}
	}
</script>
<style>
	.customer {
		border-top:2upx solid #555;
		background-color: #ffffff;
	}
</style>
