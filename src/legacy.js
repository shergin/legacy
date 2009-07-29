/*

function object
	name
	class
	super = class.super


*/


function Class(hash) {
	// вспомогательные функции
	function functionName(f) {
		if (typeof f.name != 'undefined')
			return f.name;
		return f.name = (f.toString().match(/^function\s+(\w+)\(/)[1] || null);
	}

	function base(a) {
		//alert([name(arguments.callee.caller), this.constructor.toString()])
		return this.constructor.prototype[functionName(arguments.callee.caller)].apply(this, a || arguments.callee.caller.arguments);
	}

	// возвращает прототип базового класса, основываясь на функции, которая ее вызвала
	function super() {
		return arguments.callee.caller['class']['super'].prototype;
		//var caller = arguments.callee.caller;
		//return caller['class']['super'] || (caller['super'] = caller['class']['base'], caller['super']);
		//alert([name(arguments.callee.caller), this.constructor.toString()])
		//return this.constructor.prototype[functionName(arguments.callee.caller)].apply(this, a || arguments.callee.caller.arguments);
	}

	
	// создаем реальный конструктор
	var klazz = function(a) {
		if (klazz.preparing)
			return delete(klazz.preparing);

		this.constructor = klazz;
		
		var t = this;
		//eval('var local = 1');
		var local = 1;
		
		return;
		alert([a, this.constuctor, this.xxx]);
		// после того как  
		// this.constructor = klazz;
		if (klazz.__constructor__) {
			// ?
			//this.constructor = klazz;
			// вызываем кастомный конструктор, который раньше назывался 'constructor'
			klazz.__constructor__.apply(this, arguments);
		}
	}
	
	// в некоторых реализациях прототип по умолчанию пуст, создаем его
	klazz.prototype = {};
	klazz.super = hash.base;
	
	if (hash.base) {

		hash.base.preparing = true;

		//alert('create base');
		var F = function() { };
		F.prototype = hash.base.prototype;
		klazz.prototype = new F();
		klazz.prototype.xxx = 222;
		klazz.prototype.constructor = klazz;
		klazz.__constructor__ = hash.base;
		klazz.superclass = hash.base.prototype;
		//klazz.super = hash.base.prototype;
		klazz.prototype.super = super;
		klazz.prototype.superclass = hash.base.prototype;
		//klazz.prototype.super = hash.base.prototype;
	}

	if (hash.public)
		for(var i = hash.public.length; i --; ) {
			var method = hash.public[i];
			var name = functionName(method);
			if (name == 'constructor')
				name = '__constructor__';
			method.__class__ = klazz.superclass//hash.base.prototype;	
			method['class'] = klazz//hash.base.prototype;
			klazz.prototype[name] = method;
		}
	klazz.prototype.base = base;
	//klazz.prototype.super = hash.base.prototype;
	return klazz;
}

Animal = Class({
	public: [
		function n() {return 'animal'},
		function constructor1() {
		},
		function identity() {
			window.animal_c = this.constructor;
			window.animal_p = this.constructor.prototype;
			//alert(this.constructor);
			return "I'm a Animal";
		},
		function say() {
			alert('identity: ' + this.identity());
		}
	]
});


animal = new Animal();
animal.say();

Dog = Class({
	base: Animal,
	public: [
		function n() {return 'dog'},
		function constructor1() {
		},
		function identity() {
			window.dog_c = this.constructor;
			window.dog_p = this.constructor.prototype;
			//alert([window.dog_c, window.animal_c, window.dog_c == window.animal_c]);
			//alert([window.dog_p.n(), window.animal_p.n(), window.dog_p == window.animal_p]);
			//alert('1: ' + this.constructor.prototype.n())
			//alert('1: ' + this.constructor..n())
			//alert('2: ' + this.super)
			//alert([this.constructor.prototype.n(), this.super.constructor.n()])
			//alert(this.constructor.prototype.identity);
			//return "I'm a Dog and " + this.constructor.prototype.identity.call(this);
			//return "I'm a Dog and " + this.base();

			//alert(typeof this.super);
			//return "I'm a Dog and " + Dog.superclass.identity.call(this);
			return "I'm a Dog and " + this.super().identity.call(this);
			//return "I'm a Dog and " + Dog.super.identity.call(this);
		}
	]
});

//alert(Dog.super.n())

dog = new Dog(1);

//alert([dog.constructor, dog.constructor.prototype, dog.say, dog.identity]);


dog.say();


Labradorite = Class({
	base: Dog,
	public: [
		function constructor1() {
		},
		function n() {return 'labradorite'},
		function identity() {
			//alert(this.super.n());

			//return "I'm a Labradorite and ";
			return "I'm a Labradorite and " + this.super().identity.call(this);
		},
		function test() {
			alert(local);
		}
	]
});

labradorite = new Labradorite();
//labradorite.say();
labradorite.test();


alert('fin')