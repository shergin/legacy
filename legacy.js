function Class(parent, members) {

	function $class() {
		return arguments.callee.caller['class'];
	}

	function $base(a) {
		var caller = arguments.callee.caller;
		return caller['class']['super'].prototype[caller.name].apply(this, a || caller.arguments);
	}

	function $super() {
		return arguments.callee.caller['class']['super'].prototype;
	}

	var $class = function(a) {
		if ($class.prototype.__constructor__)
			$class.prototype.__constructor__.apply(this, arguments);
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
				name = '__constructor__';
			member.name = name;
			member['class'] = $class;
		}
		$class.prototype[name] = member;
	}

	return $class;
}