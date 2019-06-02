<template>
	<form class='loginView' @submit="recharge">
		<view class="input-view">
			<input class="input" type="text" placeholder="请输入VIP续费卡密" name="cardno" />
		</view>
		<view class="button-view">
			<button type="default" class="login" hover-class="hover" formType="submit">VIP续费</button>
		</view>
	</form>
</template>

<script>
	var graceChecker = require("../../js_sdk/graceChecker.js");
	export default {
		data() {
			return {};
		},
		methods: {
			recharge(e) { //定义表单规则
				//进行表单检查
				var formData = e.detail.value;
				var rule = [{
					name: "cardno",
					checkType: "notnull",
					errorMsg: "VIP续费卡密不能为空"
				}];
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					// 获取设备信息
					uni.getSystemInfo({
						success: (res) => {
							var params = {
								cardno: formData.cardno
							}
							uni.request({
								url: this.$serverUrl + '/mobile/card/recharge',
								method: 'POST',
								header: {
									token: window.sessionStorage.getItem('token'),
									uid: window.sessionStorage.getItem('uid')
								},
								data: params,
								success: (res) => {
									var data = res.data
									if (data.code == 0) {
										uni.navigateTo({
											url: '/pages/my/my'
										});
									} else {
										uni.showToast({
											title: data.msg,
											icon: "none"
										});
									}
								}
							});
						}
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		}
	}
</script>
