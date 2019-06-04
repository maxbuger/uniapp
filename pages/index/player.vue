<template>
	<view class="container">
		<view class="videobox" id="">
			<video id="videoElement"></video>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				play_url: ''
			}
		},
		onLoad:function(option){
			this.play_url = option.play_url
			this.playVideo()
		},
		methods:{
			playVideo(){
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
	#videoElement{
		width: 750upx;
		height: 100%;
	}
</style>
