<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onReady() {
			// this.startAdv()
		},
		methods: {
			// /mobile/index/startAdv
			startAdv() {
				uni.request({
					url: this.$serverUrl + '/mobile/index/startAdv',
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
	@import './common/common.css';

	page,
	view {
		/* display: flex; */
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
</style>
