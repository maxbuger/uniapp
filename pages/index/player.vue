<template>
	<view class="container">
		<view class="videobox">
			<video id="videoElement" :src="play_url" muted></video>
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
						cors: true,
						isLive: true,
						url: this.play_url 
					});
					flvPlayer.attachMediaElement(videoElement);
					flvPlayer.load();
					// flvPlayer.on(flvjs.Events.METADATA_ARRIVED, (e) => {
					// 	console.log(e)
					// setTimeout(() => {
					// 	var playPromise = flvPlayer.play();
					// 	if (playPromise !== undefined) {
					// 		playPromise.then(_ => {
					// 				flvPlayer.play();
					// 			})
					// 			.catch(error => {});
					// 	}
					// }, 1000)
					// });
				}
			}
		}
	}
</script>

<style>
	#videoElement {
		width: 750upx;
	}
</style>
