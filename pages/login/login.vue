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
					errorMsg: "用户名不能为空"
				}, 
				{
					name: "phone",
					checkType: "phoneno",
					errorMsg: "请填写正确用户名"
				}, 
				{
					name: "password",
					checkType: "notnull",
					errorMsg: "密码不能为空"
				}];
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					// 获取设备信息
					uni.getSystemInfo({
						success: (res) => {
							var params = {
								username: formData.phone,
								password: formData.password,
								imei: res.imei
							}
							uni.request({
								url: this.$serverUrl + '/mobile/user/login',
								method: 'POST',
								data: params,
								success: (res) => {
									var data = res.data
									if (data.code == 0) {
										// 保存用户信息
										window.sessionStorage.setItem('username', data.data.username) // 用户名称
										window.sessionStorage.setItem('token', data.data.token)
										window.sessionStorage.setItem('uid', data.data.uid) // 用户Uid
										window.sessionStorage.setItem('nickname_code', data.data.nickname_code)
										window.sessionStorage.setItem('nickname', data.data.nickname) // 用户昵称
										window.sessionStorage.setItem('end_time', data.data.end_time) // vip时间
										window.sessionStorage.setItem('is_end', data.data.is_end) // 等于1就等于是过期了
										window.sessionStorage.setItem('is_ever', data.data.is_ever)
										window.sessionStorage.setItem('avatar', data.data.avatar) // 用户头像
										uni.reLaunch({
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
