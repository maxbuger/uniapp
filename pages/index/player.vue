<template>
	<view class="container">
		<view class="videobox">
			<video id="videoElement"></video>
		</view>
	</view>
</template>
<script>
	var ChimeePlayer = require('../../js_sdk/chimee/chimee-mobile-player.browser.js')
	var Flv = require('../../js_sdk/chimee/index.min.js')
	export default {
		data() {
			return {
				play_url: ''
			}
		},
		onLoad(option) {
			// console.log(option)
			this.play_url = option.play_url
		},
		onReady() {
			this.playVideo()
		},
		methods: {
			playVideo() {
				new ChimeePlayer({
					wrapper: '#videoElement', // video dom容器
					src: this.play_url,
					box: 'flv',
					kernels: {
						flv: Flv
					 },
					autoplay: true,
					controls: true,
					playsInline: true,
					preload: true,
					x5VideoPlayerFullscreen: true,
					x5VideoOrientation: true,
					xWebkitAirplay: true,
					muted: true
				});
			}
		}
	}
</script>
<style>
	@import url("../../js_sdk/chimee/chimee-mobile-player.browser.css");
</style>
<style>
	#videoElement,
	#flvTest {
		width: 750upx;
		height: 100vh;
	}
</style>
