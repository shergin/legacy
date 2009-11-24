Base = Class(null, {
		extend: function(methods, statics) {
			return Class(this.$class, methods || {}, statics);
		},
		base: function() {
			
		}
	}, {
		extend: function $extend(methods, statics) {
			statics = statics || {};
			statics.extend = $extend;
			var $class = Class(this, methods || {}, statics);
			$class.prototype.base = $class.prototype.$base; 
			return $class;
		}
	}
);