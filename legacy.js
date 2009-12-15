/*
	Legacy: Javascript class-oriented inheritance framework
	legacy.js, version 0.5
	http://github.com/shergin/legacy/
	Copyright (c) 2009, Valentin Shergin, http://shergin.com/
	License: LGPL
*/

function Class(extends, members, statics) {
	
	if (extends && !extends.prototype) {
		members = extends;
		statics = members;
		extends = null;
	}
	
	extends = extends || members.$extends;
	statics = statics || members.$statics;
	
	var $class = function $class() {
		if ($class.prototype.$constructor)
			$class.prototype.$constructor.apply(this, arguments);
	}
	
	var prototype = {};
	
	if (extends) {
		if (prototype.__proto__) {
			prototype.__proto__ = extends.prototype;
		} else {
			Class.$empty.prototype = extends.prototype;
			prototype = new Class.$empty();
		}
		prototype.constructor = $class;
	}
	
	$class.$super = extends;
	$class.prototype = prototype;
	
	prototype.$class = $class;
	prototype.$super = extends ? extends.prototype : null;
	prototype.$base = Class.$base;
	prototype.$prototype = prototype;
	
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
		prototype[name] = member;
	}
	
	if (statics)
		for (var name in statics)
			$class[name] = statics[name];
	
	return $class;
}

Class.$empty = function () {}

Class.$base = function $base() {
	var caller = $base.caller || arguments.callee.caller;
	return caller.$class.$super.prototype[caller.$name].apply(this, arguments.length ? arguments : caller.arguments);
}
