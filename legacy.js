/*
	Legacy: Javascript class-oriented inheritance framework
	legacy.js, version 0.6
	http://github.com/shergin/legacy/
	Copyright (c) 2009, Valentin Shergin, http://shergin.com/
	License: LGPL
*/

function Class($super, $members, $statics) {
	
	if ($super && !$super.prototype) {
		$members = $super;
		$statics = $members;
		$super = null;
	}
	
	$super = $super || $members.$super;
	$statics = $statics || $members.$statics;
	
	var $class = function $class() {
		if ($class.prototype.$constructor)
			$class.prototype.$constructor.apply(this, arguments);
	}
	
	var prototype = {};
	
	if ($super) {
		if (prototype.__proto__) {
			prototype.__proto__ = $super.prototype;
		} else {
			Class.$empty.prototype = $super.prototype;
			prototype = new Class.$empty();
		}
		prototype.constructor = $class;
	}
	
	$class.$super = $super;
	$class.prototype = prototype;
	
	if ($members.constructor && $members.constructor != Object) {
		$members.$constructor = $members.constructor;
		delete $members.constructor;
	}
	
	for (var name in $members) {
		var member = $members[name];
		if (member instanceof Function) {
			member.$name = name;
			member.$class = $class;
		}
		prototype[name] = member;
	}
	
	prototype.$class = $class;
	prototype.$super = $super ? $super.prototype : null;
	prototype.$base = Class.$base;
	
	if ($statics)
		for (var name in $statics)
			$class[name] = $statics[name];
	
	return $class;
}

Class.$empty = function () {}

Class.$base = function $base() {
	var caller = $base.caller || arguments.callee.caller;
	return caller.$class.$super.prototype[caller.$name].apply(this, arguments.length ? arguments : caller.arguments);
}
