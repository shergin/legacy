function Class(hash) {
	
	var result = function() {
	}

	result.prototype = {};
	
	function name(f) {
		if (typeof f.name != 'undefined')
			return f.name;
		return f.name = (f.toString().match(/^function\s+(\w+)\(/)[1] || null);
	}

	function extend(Child, Parent) {
	    var F = function() { };
	    F.prototype = Parent.prototype;
	    Child.prototype = new F();
	    Child.prototype.constructor = Child;
	    Child.superclass = Parent.prototype;   
	}
	
	if (hash.parent)
		extend(result, hash.parent);
	
	if (hash.private)
		for(var i = hash.private.length; i --; ) {
			var method = hash.private[i];
			result.prototype[name(method)] = method;
		}
	
	return result;
}

Animal = Class({
	public: [
	    function constructor() {
	    	
	    },
	    function identity() {
	    	return "I'm a Animal";
	    },
	    function say() {
	    	alert(this.identity());
	    }
	]        
});

Dog = Class({
	base: Animal,
	public: [
	    function constructor() {
	    	
	    },
	    function identity() {
	    	return "I'm a Dog and " + this.base();
	    },
	    function say() {
	    	alert(this.identity());
	    }
	]        
});


Labradorite = Class({
	base: Dog,
	public: [
	    function identity() {
	    	return "I'm a Labradorite and " + this.base();
	    }
	]
});