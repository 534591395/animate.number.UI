(function(root, $) {
	'use strict';

	var AnimateNumberUI = function() {};
	root.AnimateNumberUI = AnimateNumberUI;
	// 模板
	AnimateNumberUI.Tpl = {
	  	'box': '<div class="animateNumberUIBox">' +
	  	            '<ul class="numberList">'+'</ul>' +
	  	       '</div>'
	};
    // 获取数据ajax接口
	AnimateNumberUI.prototype.ajaxUrl = '';
	// 弹出框提示组件
	AnimateNumberUI.prototype.alert = function(string) { window.console && console.log(string); };
	// 要显示的值
	AnimateNumberUI.prototype.value = '0000000';
	// 显示的数字最小位数,如果值大于0，则触发 _turnValue 方法
	AnimateNumberUI.prototype._minLength = 0;
	// 每个实例标记
	AnimateNumberUI.prototype._mark = '';
	// 动画效果配置
	AnimateNumberUI.prototype.animate = 'animate-EaseInOut';
	// 当前 $Dom
	AnimateNumberUI.prototype.$Dom = '';
	// 请求成功回调函数
	AnimateNumberUI.prototype._afterCallback = function() {};
	// 请求前回调函数
	AnimateNumberUI.prototype._beforeCallback = function() {};
	// ajax方法
	AnimateNumberUI.prototype._ajax = function() {
		var that = this;
		var ajax = '';
		if($.ajax) {
			ajax = $.ajax;
		} else {
			throw "找不到ajax方法，请引入 jQuery 或 zepto";
		}
		return ajax;
	};
	// 设置显示的值
	AnimateNumberUI.prototype._setValue = function(value) {
		this.value = value;
		this._turnValue();
		return this;
	};
	// 设置动画效果
	AnimateNumberUI.prototype._setAnimate = function(animate) {
		this.animate = animate || "";
		return this;
	};
	// 设置实例标记
	AnimateNumberUI.prototype._setMark = function(mark) {
		var marks = mark || "AnimateNumberUI" + Math.floor(Math.random()*1000000);
		this._mark = marks;
		return this;
	};
	// 获取实例标记
	AnimateNumberUI.prototype._getMark = function() {
		return this._mark;
	};
	// 事件
	AnimateNumberUI.prototype._event = function() {
		var that = this;
		return that;
	};
	// 初始化组件
	// config.ajaxUrl --- ajax请求地址, config.$parent ---- 外部html容器
	// config.value --- 要显示的内容-数字
	// config.alert --- 异常弹出框组件
	// config.animate --- 动画效果
	// config.minLength --- 设置显示数字的最小位数
	AnimateNumberUI.prototype.init = function(config) {
		if(config && config.ajaxUrl) {
			this.ajaxUrl = config.ajaxUrl;
		}
		if(config && config.$parent) {
			this.$parent = config.$parent;
		}
		if(config && config.value) {
			if(!isNaN(config.value)) {
				if(parseInt(config.value, 10) == config.value) {
					if(parseInt(config.value, 10) > -1) {
						this._setValue(config.value);
					} else {
						throw "传入的参数 value 不能小于0";
					}
				} else {
					throw "传入的参数 value 必须为一个整数";
				}
			} else {
				throw "传入的参数 value 必须为一个数字";
			}
		}
		if(config && config.alert) {
			this.alert = config.alert;
		}
		if(config && config.animate) {
			this._setAnimate(config.animate);
		}
		if(config && config.minLength) {
			if(!isNaN(config.minLength)) {
				if(parseInt(config.minLength, 10) == config.minLength) {
					if(parseInt(config.minLength, 10) > -1) {
						this._minLength = config.minLength;
					} else {
						throw "传入的参数 minLength 不能小于0";
					}
				} else {
					throw "传入的参数 minLength 必须为一个整数";
				}
			} else {
				throw "传入的参数 minLength 必须为一个数字";
			}
		}
		this._setMark().render()._event()._sendAjax();
		return this;
	};
    // 视图渲染
    // config.reRenderBool 
    AnimateNumberUI.prototype.render = function(config) {
    	var marks = this._getMark();
		if(!this.$Dom) {
		    this.$Dom = $(AnimateNumberUI.Tpl.box);
		    this.$Dom.addClass(marks);
		}
		if(this.value) {
			if(this.$Dom.find('.numberList li').length == 0 || (config && config.reRenderBool)) {
				this.$Dom.find('.numberList').html(this.numberList());
			}
		}
		if(this.$parent) {
			if(!this.$parent.find('.animateNumberUIBox').length) {
				this.$parent.append(this.$Dom);
			}
		} else {
			if(!$('body').find('.' + marks).length) {
				$('body').append(this.$Dom);
			}
		}
		// 触发css3动画效果，滚动到指定值
		this._runTargetNumber();
		return this;
    };
    // html元素
    AnimateNumberUI.prototype.numberList = function() {
    	var tpl = '';
    	var numberList = this.value +'';
    	var items = function(nowNumber) {
    		var items = '';
    		for(var k=0; k< 10; k++) {
    			items += '<span class="item">'+k+'</span>';
    		}
    		return items;
    	};
    	for(var j = 0; j < numberList.length; j++) {
    		if(j == numberList.length-1) {
    			tpl += '<li class="number'+ j +' marginRight0"><div class="innerBox '+ this.animate +'">'+items()+'</div></li>';
    		} else {
    			tpl += '<li class="number'+ j +'"><div class="innerBox '+ this.animate +'">'+items()+'</div></li>';
    		}
    	}
    	return tpl;
    }; 
    // 滚动到当前数值
    AnimateNumberUI.prototype._runTargetNumber = function() {
    	var numberList = this.value +'';
    	// 获取元素高度重绘一遍，触发css3效果
    	this.$Dom.find('.item').height();
    	for(var k = 0; k < numberList.length; k++) {
    		this.$Dom.find('.number'+k+' .innerBox').css({'transform':'translateY(-'+ 10 * numberList[k] +'%)',
    			'-webkit-transform':'translateY(-'+ 10 * numberList[k] +'%)'});
    	}
    	return this;
    };
    // 获取显示的数字 
    AnimateNumberUI.prototype.getValue = function() {
    	return this.value;
    };
    // 请求成功后调用方法
    AnimateNumberUI.prototype.after = function(callback) {
    	this._afterCallback = callback || function() {};
    	return this;
    };
    // 请求前调用方法
    AnimateNumberUI.prototype.before = function(callback) {
    	this.__beforeCallback = callback || function() {};
    };
    // 执行ajax获取数据
    // 注：用户使用该组件需要ajax时，如果返回的数据结构跟组件不一致，可在这边修改。
    AnimateNumberUI.prototype._sendAjax = function() {
    	var that = this;
    	var ajax = function() {};
    	if(that.ajaxUrl) {
    		ajax = that._ajax();
	        ajax({
	            url: that.ajaxUrl,
	            type: 'post',
	            dataType: 'json',
	            data: {},
	            success: function(data) {
	                if(data.resultCode == 0) {
	                	that._setValue(data.data);
	                    that._afterCallback(that, that.value);
	                }
	            }
	        });
    	} else {
    		setTimeout(function() {
    			that._afterCallback(that, that.value);
    		}, 0);
    	}
    };
    // 根据设置的 _minLength 修改 value值。 如 value = '123' _minLength=5 ,则 value = '00123';
    AnimateNumberUI.prototype._turnValue = function() {
    	var value = this.value;
    	var valueLength = (value+'').length;
    	var length = Number(this._minLength);
    	var str = '';
    	if(length > 0) {
    		if(valueLength < length) {
    			for(var j = 0; j< (length-valueLength); j++) {
    				str += '0';
    			}
    		    value = str + value;
    		    this._setValue(value);
    		}
    	}
    	return this;
    }

    if(typeof define === "function" && define.amd) {
        define(function () {
            return AnimateNumberUI;
        });
    }
})(this, $);