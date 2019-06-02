<template>
	<view class="uni-padding-wrap uni-common-mt register-wrap">
		<form @submit="formSubmit" @reset="formReset">
			<view class="input-view">
				<view class="label-view">
					<text class="label">手机号</text>
				</view>
				<input class="input" type="text" placeholder="请填写手机号码" name="phone" />
			</view>
			<view class="input-view">
				<view class="label-view">
					<text class="label">密码</text>
				</view>
				<input class="input" type="password" placeholder="请填写密码" name="password" />
			</view>
			<view class="input-view">
				<view class="label-view">
					<text class="label">确认密码</text>
				</view>
				<input class="input" type="password" placeholder="请再次输入密码" name="againPassword" />
			</view>
			<view class="input-view">
				<view class="label-view">
					<text class="label">邀请码</text>
				</view>
				<input class="input" type="text" placeholder="请输入邀请码(必填)" name="referrer" />
			</view>
			<view class="button-view">
				<button type="default" class="login" hover-class="hover" formType="submit">注册</button>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require("../../js_sdk/graceChecker.js");
	export default {
		data() {
			return {
				pickerHidden: true,
				chosen: ''
			}
		},
		methods: {
			pickerConfirm: function(e) {
				this.pickerHidden = true
				this.chosen = e.target.value
			},
			pickerCancel: function(e) {
				this.pickerHidden = true
			},
			pickerShow: function(e) {
				this.pickerHidden = false
			},
			formSubmit: function(e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
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
				}, {
					name: "againPassword",
					checkType: "notnull",
					errorMsg: "密码不能为空"
				}, {
					name: "againPassword",
					checkType: "same",
					checkRule: formData.password,
					errorMsg: "两次密码不一致，请重新输入"
				}, {
					name: "referrer",
					checkType: "notnull",
					errorMsg: "邀请码不能为空"
				}];
				var checkRes = graceChecker.check(formData, rule);
				// 获取设备信息
				if (checkRes) {
					uni.getSystemInfo({
						success: (res) => {
							var params = {
								username: formData.phone,
								password: formData.password,
								referrer: formData.referrer,
								imei: res.imei
							}
							uni.request({
								url: this.$serverUrl + '/mobile/user/register',
								method: 'POST',
								data: params,
								success: (res) => {
									var data = res.data
									if (data.code == 0) {
										uni.navigateTo({
											url: '/pages/login/login'
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
			formReset: function(e) {
				this.chosen = ''
			}
		}
	}
</script>

<style>
	.register-wrap {
		padding: 50upx 0;
	}

	.register-wrap .label-view {
		width: 160upx;
	}
</style>
