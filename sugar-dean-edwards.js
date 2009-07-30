function $extend(methods, interfaces) {
	interfaces = interfaces || {};
	interfaces.extend = $extend;
	return Class(this['class'], methods, interfaces);
}

Base = Class(null, {}, {extend: $extend});