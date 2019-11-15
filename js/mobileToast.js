/**
 *	消息提示框
 *	@param：{options}
 *		title：	String  '提示内容'	
 *		time:   Nubmer  '弹窗消失时间，默认2000ms'
 *		callback：Function '弹框消失之后的回调函数'
 *	
 **/
function showToast(options) {
	if(!options.title) {
		throw new Error('fail Title should be required.');
	}
	var opt = {
		title: options.title,
		time: options.time ? options.time : 2000,
		callback: options.success
	}
	var dom = document.createElement('p');
	dom.setAttribute('class', 'mobile-toast');
	document.body.appendChild(dom);
	dom.innerHTML = opt.title;

	var clear = setTimeout(function(){
		dom.parentNode.removeChild(dom);
		clearTimeout(clear);
		if (opt.callback) {opt.callback();}
	}, opt.time);
}

/**
 * [模态框]
 * @param {options}
 *   title: 提示文字
 *   showCancel: 是否显示取消按钮
 *   cancelText: 取消按钮的文字，最多四个字符
 *   cancelColor: 取消按钮文字颜色
 *   confirmText: 确定按钮的文字，最多四个字符
 *   confirmColor: 确定按钮文字颜色
 *   success: 成功回调
 */
function dialog(options) {
	if(options.cancelText && options.cancelText.length > 4) {
		throw new Error('fail cancelText length should not larger than 4 Chinese characters.');
	}else if(options.confirmText && options.confirmText.length > 4) {
		throw new Error('fail confirmText length should not larger than 4 Chinese characters.');
	}
	this.opt = {
		title: options.title,
		showCancel: options.showCancel === undefined || options.showCancel ? true : false,	// 是否显示取消按钮
		cancelText: options.cancelText ? options.cancelText : '取消',	// 取消按钮的文字，最多四个字符
		cancelColor: options.cancelColor ? options.cancelColor : '#292929',	// 取消按钮文字颜色
		confirmText: options.confirmText ? options.confirmText : '确定',	//确定按钮的文字，最多四个字符
		confirmColor: options.confirmColor ? options.confirmColor : '#E1151D',	//确定按钮文字颜色
		success: options.success || function() {},	//成功的回调
		error: options.error || function() {},	//失败的回调
	}
	this.returnMsg = {
		cancle: false,
		confirm: false
	}
	this.init();
	if(this.opt.showCancel) {
		this.initCancle();
	}
	this.initConfirm();
}
dialog.prototype =  {
	init: function(){
		var _this = this;
		_this.dom = document.createElement('div');
		_this.dom.setAttribute('class', 'modal-wrap');
		document.body.appendChild(_this.dom);
		var html=`<div class="mask"></div>
							<div class="content">
								<div class="top">${_this.opt.title}</div>
								<div class="clearfix">
									${_this.opt.showCancel ? '<div class="lf item cancle" style="color:'+ _this.opt.cancelColor +';">'+_this.opt.cancelText+'</div>' : ''}
									<div class="lf item confirm ${_this.opt.showCancel ? '' : 'width100'}" style="color:${_this.opt.confirmColor};">${_this.opt.confirmText}</div>
								</div>
							</div>`;
		_this.dom.innerHTML = html;
	},
	removeDom: function() {
		this.dom.parentNode.removeChild(this.dom);
	},
	initCancle: function() {
		var _this = this;
		var cancleDom = this.dom.getElementsByClassName('cancle')[0];
		cancleDom.addEventListener('click',function() {
			_this.returnMsg.confirm = false;
			_this.returnMsg.cancle = true;
			_this.opt.success(_this.returnMsg);
			_this.removeDom();
		})
	},
	initConfirm: function() {
		var _this = this;
		var cancleDom = this.dom.getElementsByClassName('confirm')[0];
		cancleDom.addEventListener('click',function() {
			_this.returnMsg.cancle = false;
			_this.returnMsg.confirm = true;
			_this.opt.success(_this.returnMsg);
			_this.removeDom();
		})
	}

}