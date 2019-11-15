## 移动端消息提示框、模态对话框


* [在线预览](https://annamayyan.github.io/mobile-toast/demo.html)
<p>
  <img width="400" src="img/delToast.png">
</p>  

#### 模态对话框使用

属性         |类型      |默认值     |必填  |说明
------------ | -------- | --------- | ---- | -----------  
title        | String   |           |  否  | 提示的内容 
showCancel   | Boolean  | true      |  否  | 是否显示取消按钮
cancelText   | String   | '取消'    |  否  | 取消按钮文字，最多4个字符
cancelColor  | String   | '#292929' |  否  | 取消按钮文字颜色
confirmText  | String   | '确定'    |  否  | 确定按钮文字，最多4个字符
confirmColor | String   | '#E1151D' |  否  | 确定按钮文字颜色
success      | Function |           |  否  | 调用成功的回调

示例代码
```javascript
var delDialog = new dialog({ 
	title: '提示的内容',
	showCancle: 
	confirmColor: 'green',
	success: function(res) {
		if(res.confirm) {
			console.log('用户点击确定');
		} else if (res.cancle) {
			console.log('用户点击了取消');
		}
	}
});
```  

#### 消息提示框使用

属性     |类型      |默认值     |必填  |说明
-------- | -------- | --------- | ---- | -----------
title    | String   |           |  是  | 提示的内容 
time     | Number   | 2000      |  否  | 提示的延迟时间
success  | Function |           |  否  | 调用成功的回调

```javascript
showToast({
	title: '自动消失提示',
	success: function() {
		console.log('弹框消失');
	}
});
``` 





