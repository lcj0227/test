/**
* 倒计时插件
* @Author tarymee
* @Create 2014-11-18
*/


(function (window,document) {
	if (window.countdown) {return};
	function countdown(config) {
		this.config = this._extend(config, countdown.config, false);
		this._init();
	}

	// 默认配置
	countdown.config = {
		endTime: "2050/08/17 00:00:00",//到期时间
		endLoop: false,//默认不清除递归调用
		loopTime: 1000,//循环执行时间（毫秒）
		onChange: function() {},//未到期执行函数
		onComplete: function() {}//到期执行函数
	};

	countdown.prototype = {
		_init : function() {
			var self = this;
			var c = self.config;

			var nowTime = new Date();//现在时间
			var leftTime = Math.round((new Date(c.endTime).getTime() - nowTime.getTime()) / 1000);//计算剩余的秒数
			var year = parseInt(leftTime / 31556926);//计算剩余的年数，按回归年365天5时48分46秒算
			var month = parseInt(leftTime / 2629744 % 12);//计算剩余的月份，按回归年除以12计算
			var day = parseInt(leftTime / 3600 / 24 % 30);//计算剩余的天数
			var hour = parseInt(leftTime / 3600 % 24);//计算剩余的小时数
			var minute = parseInt(leftTime / 60 % 60);//计算剩余的分钟数
			var second = parseInt(leftTime % 60);//计算剩余的秒数

			if (leftTime <= 0) {
				c.onComplete && c.onComplete(-year,-month,-day,-hour,-minute,-second);
			}else {
				c.onChange && c.onChange(year,month,day,hour,minute,second);
			};

			if (c.endLoop) {
				clearTimeout(self.timmer);//结束调用
			}else {
				//递归自身调用
				self.timmer = setTimeout(function() {
					self._init();
				},c.loopTime);
			};
		},
		/**
		* 对 json 对象进行更新扩展，会修改待更新扩展的对象，同时将其返回。
		* @param destination 待更新扩展的对象
		* @param source 扩展来源
		* @param {Boolean} override (optional) 对于已存在的键值，是否用新的值覆盖旧的，默认覆盖
		* @param {Function} replacer (optional) 替换规则函数
		* @return {Object} 更新扩展后的对象
		*/
		_extend: function(destination, source, override, replacer) {
			if (override === undefined) override = true;
			for (var property in source) {
				if (override || !(property in destination)) {
					if (replacer) replacer(property);
					else destination[property] = source[property];
				}
			}
			return destination;
		}
	};

	window.countdown = countdown;
})(window,document);