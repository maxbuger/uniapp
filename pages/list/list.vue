<template>
	<view class="wrap" :class="type==2?'list2':'list1'">
		<block v-for="(item, key) in lists" @click="goDetail(item)" :key="key">
			<view class="card" :class="type==2?'card2':'card1'">
				<view class="card-bottm column" v-if="type==0">
					<view class="car-title-view column">
						<text class="card-title card-list2-title">{{item.cate_name}} </text>
					</view>
					<view class="car-title-view column">
						<text class="card-title card-list2-title">{{item.title}} </text>
					</view>
				</view>
				<view class="card-bottm column" v-if="type==2" @click="openLink(item.link)">
					<view class="column">
						<image class="card-img card-list2-img" :src="item.image"></image>
					</view>
					<view class="car-title-view column">
						<text class="card-title card-list2-title">{{item.cate_name}} </text>
					</view>
					<view class="car-title-view column">
						<text class="card-title card-list2-title">{{item.title}} </text>
					</view>
				</view>
			</view>
			<text class="loadMore" v-if="page < count">加载中...</text>
		</block>
	</view>
</template>

<script>
	let keys = 0;
	export default {
		data() {
			return {
				refreshing: false,
				cateId: -1,
				type: -1,
				lists: [],
				page: 1,
				count: 0
			}
		},
		onLoad(e) {
			this.cateId = e.cateId
			this.type = e.type
			uni.setNavigationBarTitle({
				title: e.title
			});
			// 防止app里由于渲染导致转场动画卡顿
			setTimeout(() => {
				this.getData();
			}, 300);
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
								});
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								});
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								});
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log('获取登录通道失败', e);
				}
			});
		},
		onPullDownRefresh() {
			this.refreshing = true;
			this.getData();
		},
		onReachBottom() {
			if (this.page > this.count) {
				this.loadMoreText = '没有更多了'
				return;
			}
			this.getData();
		},
		methods: {
			openLink(url) {
				try{
					plus.runtime.openURL(url);
				}catch(e){
					window.open(url);
				}
			},
			getData() {
				var url = ''
				if (this.type == 0) {
					url = '/mobile/Novel/index'
				} else if (this.type == 2) {
					url = '/mobile/Video/index'
				}
				uni.request({
					url: this.$serverUrl + url + '?cate_id=' + this.cateId + '&page=' + (this.refreshing ? 1 : this.page) +
						'&limit=10',
					success: (ret) => {
						var data = ret.data.data
						this.count = data.count
						if (ret.statusCode !== 200) {
							console.log('请求失败:', ret)
						} else {
							if (this.refreshing && data.lists[0].id === (this.lists && this.lists[0].id)) {
								uni.showToast({
									title: '已经最新',
									icon: 'none',
								});
								this.refreshing = false;
								uni.stopPullDownRefresh();
								return;
							}
							if (this.refreshing) {
								this.refreshing = false;
								uni.stopPullDownRefresh()
								this.lists = data.lists;
								this.page = 2;
							} else {
								this.lists = this.lists.concat(data.lists);
								this.page += 1;
							}
							this.lists = this.unique(this.lists)
							this.page += 1;
						}
					}
				});
			},
			unique(arr) {
				var newArr = [];
				var end; //end 其实就是一道卡
				arr.sort();
				end = arr[0];
				newArr.push(arr[0]);
				for (var i = 1; i < arr.length; i++) {
					if (arr[i] != end) {
						newArr.push(arr[i]);
						end = arr[i]; // 更新end
					}
				}
				return newArr;
			},
			goDetail(e) {
				uni.navigateTo({
					url: '../detail/detail?data=' + encodeURIComponent(JSON.stringify(e))
				})
			},
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
								'WXSenceTimeline' : 'WXSceneSession',
							type: 0,
							title: 'uni-app模版',
							summary: e.title,
							imageUrl: e.img_src,
							href: 'https://uniapp.dcloud.io',
							success: (res) => {
								console.log('success:' + JSON.stringify(res));
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
			}
		}
	}
</script>

<style scoped>
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
		padding: 10upx;
		display: flex;
	}

	.list1 {
		flex-direction: column;
	}

	.list2 {
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.card2 {
		width: 48vw;
		height: 300upx;
		margin-bottom: 20upx;
	}
	.card1{
		height: 120upx;
		margin-bottom: 20upx;
	}
	.card-bottm {
		justify-content: flex-start !important;
	}

	.car-title-view {
		padding: 5upx 0 !important;
		text-indent: 0.5em;
		width: 100%;
	}

	.column {
		width: 100% !important;
	}

	.card-list2-img {
		width: 100% !important;
		height: 200upx !important;
	}
/* 
	.card-list2-img>div {
		padding: 4upx;
	} */
</style>
