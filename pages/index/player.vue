<template>
	<view class="container">
		<view class="videobox">
			<video id="videoElement"></video>
		</view>
	</view>
</template>
<script>
	var flvjs = require("../../js_sdk/flv.min.js");
	export default {
		data() {
			return {
				play_url: ''
			}
		},
		onLoad(option) {
			console.log(option)
			this.play_url = option.play_url
		},
		onReady() {
			this.playVideo()
		},
		methods: {
			playVideo() {
				if (flvjs.isSupported()) {
					var videoElement = document.getElementById('videoElement');
					var flvPlayer = flvjs.createPlayer({
						type: 'flv',
						url: this.play_url
					});
					flvPlayer.attachMediaElement(videoElement);
					flvPlayer.load();
					flvPlayer.play();
				}
			}
		}
	}
</script>

<style>
	#videoElement {
		width: 750upx;
		height: 100%;
	}
</style>
