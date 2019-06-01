<template>
	<form class='loginView' @submit="login">
		<view class="input-view">
			<view class="label-view">
				<text class="label">账号 </text>
			</view>
			<input class="input" type="text" placeholder="请输入用户名" name="phone" />
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">密码</text>
			</view>
			<input class="input" type="password" placeholder="请输入密码" name="password" />
		</view>
		<view class="button-view">
			<button type="default" class="login" hover-class="hover" formType="submit">登录</button>
			<button type="default" class="register" hover-class="hover" @click="register">免费注册</button>
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
			login(e) { //定义表单规则
				//进行表单检查
				var formData = e.detail.value;
				var rule = [{
					name: "phone",
					checkType: "notnull",
					errorMsg: "手机号码不能为空"
				}, {
					name: "phone",
					checkType: "phoneno",
					errorMsg: "请填写正确手机号码"
				}, {
					name: "password",
					checkType: "notnull",
					errorMsg: "密码不能为空"
				}];
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.getSystemInfo({
						success: function(res) {
							var params = {
								username: formData.phone,
								password: formData.password,
								imei: res.imei
							}
							if (checkRes) {
								uni.request({
									url: this.$serverUrl + '/mobile/user/login', //仅为示例，并非真实接口地址。
									method: 'POST',
									data: params,
									success: (res) => {
										var data = res.data
										if (data.code == 0) {
											uni.navigateTo({
												url: '/pages/index/index'
											});
										} else {
											uni.showToast({
												title: data.msg,
												icon: "none"
											});
										}
									}
								});
							} else {
								uni.showToast({
									title: graceChecker.error,
									icon: "none"
								});
							}
						}
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			register() {
				uni.navigateTo({
					url: '/pages/register/register'
				});
			}
		}
	}
</script>

<style>

</style>
