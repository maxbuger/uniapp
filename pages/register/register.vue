<template>
	<view class="uni-padding-wrap uni-common-mt register-wrap">
		<form @submit="formSubmit" @reset="formReset">
			<view class="input-view">
				<view class="label-view">
					<text class="label">手机号</text>
				</view>
				<input class="input" type="text" placeholder="请填写手机号码" name="phoneValue" />
			</view>
			<view class="input-view">
				<view class="label-view">
					<text class="label">密码</text>
				</view>
				<input class="input" type="password" placeholder="请填写密码" name="passwordValue" />
			</view>
			<view class="input-view">
				<view class="label-view">
					<text class="label">确认密码</text>
				</view>
				<input class="input" type="password" placeholder="请再次输入密码" name="againPasswordValue" />
			</view>
			<view class="input-view">
				<view class="label-view">
					<text class="label">邀请码</text>
				</view>
				<input class="input" type="text" placeholder="请输入邀请码(必填)" name="againValue" />
			</view>
			<view class="button-view">
				<button type="default" class="login" hover-class="hover" formType="submit">注册</button>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require("../../js_sdk/graceChecker.js");
	var baseUrl = require("../../js_sdk/baseUrl.js");
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
				var rule = [{
					name: "phoneValue",
					checkType: "phoneno",
					errorMsg: "请填写正确手机号码"
				}];
				console.log(baseUrl)
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				uni.getSystemInfo({
					success: function(res) {
						var params = {
							username: formData.phoneValue,
							password: formData.passwordValue,
							referrer: formData.referrer,
							imei: res.imei
						}
						if (checkRes) {
							uni.request({
								url: baseUrl.post + '/mobile/user/register', //仅为示例，并非真实接口地址。
								method: 'POST',
								data: params,
								success: (res) => {
									console.log(res.data);
									this.text = 'request success';
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
			},
			formReset: function(e) {
				console.log('清空数据')
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
