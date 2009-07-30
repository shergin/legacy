function Class(parent, members, static) {

	function $base(a) {
		var caller = arguments.callee.caller;
		return caller['class']['super'].prototype[caller.name].apply(this, a || caller.arguments);
	}

	function $super() {
		return arguments.callee.caller['class']['super'].prototype;
	}

	var $class = function(a) {
		if ($class.prototype.$constructor)
			$class.prototype.$constructor.apply(this, arguments);
	}
	
	$class.prototype = {};
	$class.super = parent;
	
	if (parent) {
		var F = function() { };
		F.prototype = parent.prototype;
		$class.prototype = new F();
		$class.prototype.constructor = $class;
	}

	$class.prototype.class = $class;
	$class.prototype.super = $super;
	$class.prototype.base = $base;

	for (var name in members) {
		var member = members[name];
		if (member instanceof Function) {
			if (name == 'constructor')
				name = '$constructor';
			member.name = name;
			member['class'] = $class;
		}
		$class.prototype[name] = member;
	}
	
	if (static)
		for (var name in static)
			$class[name] = static[name];
	
	return $class;
}