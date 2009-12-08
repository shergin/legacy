var Animal = Base.extend({
	constructor: function(name) {
		this.name = name;
	},
	
	name: "",
	
	eat: function() {
		this.say("Yum!");
	},
	
	say: function(message) {
		alert(this.name + ": " + message);
	}
});

var Mouse = Animal.extend();

var Cat = Animal.extend({
		eat: function(food) {
			this.say('Cats eat.');
			if (food instanceof Mouse)
				this.base();
			else
				this.say("Yuk! I only eat mice.");
		}
	});

var animal = new Animal();
var cat = new Cat("Tom");
var mouse = new Mouse("Jerry");

cat.say("Hello!");
cat.eat(animal);
cat.eat(mouse);