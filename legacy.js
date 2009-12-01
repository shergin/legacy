/*
	Legacy: Class-oriented OOP framework
	legacy.js, version 0.1
	http://github.com/shergin/legacy/
	Copyright (c) 2009, Valentin Shergin, shergin.com
	License: LGPL
*/

function Class(parent, members, statics) {
	
	function $base() {
		var caller = $base.caller || arguments.callee.caller;
		return caller.$class.$super.prototype[caller.$name].apply(this, arguments.length ? arguments : caller.arguments);
	}
	
	function $super() {
		return ($super.caller || arguments.callee.caller).$class.$super.prototype;
	}
	
	function $class() {
		if ($class.prototype.$constructor)
			$class.prototype.$constructor.apply(this, arguments);
	}
	
	$class.prototype = {};
	$class.$super = parent;
	
	if (parent) {
		if ($class.prototype.__proto__) {
			$class.prototype.__proto__ = parent.prototype;
		} else {
			var F = function() {};
			F.prototype = parent.prototype;
			$class.prototype = new F();
		}
		$class.prototype.constructor = $class;
	}
	
	$class.prototype.$class = $class;
	$class.prototype.$super = $super;
	$class.prototype.$base = $base;
	
	if (members.constructor && members.constructor != Object) {
		members.$constructor = members.constructor;
		delete members.constructor;
	}
	
	for (var name in members) {
		var member = members[name];
		if (member instanceof Function) {
			member.$name = name;
			member.$class = $class;
		}
		$class.prototype[name] = member;
	}
	
	if (statics)
		for (var name in statics)
			$class[name] = statics[name];
	
	return $class;
}
