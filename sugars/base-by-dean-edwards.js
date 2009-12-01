Base = Class(null, {
		extend: function(methods, statics) {
			return Class(this.$class, methods || {}, statics);
		},
		
		base: function() {
			// not implemented yet
		}
	}, {
		extend: function $extend(methods, statics) {
			statics = statics || {};
			statics.extend = this.extend;
			statics.implement = this.implement;
			var $class = Class(this, methods || {}, statics);
			$class.prototype.base = $class.prototype.$base; 
			return $class;
		},
		
		implement: function() {
			for (var i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] == "function") {
					// if it's a function, call it
					arguments[i](this.prototype);
				} else {
					// add the interface using the extend method
					this.prototype.extend(arguments[i]);
				}
			}
			return this;
		}
	}
);