@{%
class dice {
	constructor(sides, numDice=1) {
		this.numDice = numDice
		this.sides = sides
	}
}
%}


expr -> sum {% id %}
sum -> sum "+" scalar
	| scalar {% id %}
scalar -> dice{% id %}
	| int {% id %}
dice -> int [Dd] int {%
	function ([numDice, d, sides]) {
		return new dice(sides, numDice) 
	} %}
	| [dD] int {%
	 function([d, sides]) {
		return new dice(sides)
	} %}
int -> [0-9]:+ {% (data) => { return parseInt(data[0].join("")) } %}
