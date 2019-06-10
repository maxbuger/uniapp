<template>
	<view class="wrap">
		<block class="content" v-for="(item,index) in list" :key="index+Math.random()*100">
			<view class="card">
				<view class="card-bottm column" @click="openLink(item.href)">
					<view class="column">
						<image class="card-img card-list2-img" :src="item.src"></image>
					</view>
					<view class="car-title-view column">
						<text class="card-title card-list2-title">{{item.alt}} </text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			var listStr = uni.getStorageSync('pluginHtmlList')
			this.list = JSON.parse(listStr)
		},
		methods: {
			openLink(url) {
				try{
					plus.runtime.openURL(url);
				}catch(e){
					window.open(url);
				}
			}
		}
	}
</script>

<style>
	.wrap {
		width: 100%;
		padding: 10upx 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.content {
		width: 48vw;
		min-height: 260upx;
		padding: 10upx;
		background: #fff;
		margin-bottom: 20upx;
		box-sizing: border-box;
	}

	.card {
		margin: 20upx 10upx;
	}

	..card-list2-img {
		width: 100%;
	}
</style>
