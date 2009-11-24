// Animal
Animal = Class(
	null,
	{
		constructor: function() {
			document.writeln('Animal::constructor' + '<br/>')
		},
		identity: function() {
			return "I'm a Animal";
		},
		feed: function() {
		
		},
		say: function() {
			document.writeln(this.identity())
		}
	}
);

// Animal::Mammal
Mammal = Class(
	Animal,
	{
		constructor: function() {
			this.$base();
			document.writeln('Mammal::constructor' + '<br/>');
		},
		feed: function() {
			document.writeln('Mammal::feed' + '<br/>');
		},
		identity: function() {
			return "I'm a Mammal and " + this.$base();
		}
	}
)

// Animal::Mammal::Dog
Dog = Class(
	Mammal,
	{
		constructor: function() {
			this.$base();
			document.writeln('Dog::constructor' + '<br/>')
		},
		identity: function() {
			return "I'm a Dog and " + this.$base();
		}
	}
)

// Animal::Mammal::Dog::Chihuahua
Chihuahua = Class(
	Dog,
	{
		constructor: function() {
			//this.$base();
			this.$super().constructor.call(this);
			document.writeln('Chihuahua::constructor' + '<br/>')
		},
		identity: function() {
			return "I'm a Chihuahua and " + this.$base();
		},
		feed: function() {
			this.$super().feed.call(this);
			document.writeln('Chihuahua::feed' + '<br/>');
		}
	}
)

// Animal::Mammal::Dog::Dalmatian
Dalmatian = Class(
	Dog,
	{
		constructor: function() {
			this.$base();
			document.writeln('Chihuahua::constructor' + '<br/>')
		},
		identity: function() {
			return "I'm a Chihuahua and " + this.$base();
		}
	}
)

chihuahua = new Chihuahua();
chihuahua.feed();

document.writeln('chihuahua.$class == Chihuahua is ' + (chihuahua.$class == Chihuahua) + '<br/>')

document.writeln('The end. Thanks!')