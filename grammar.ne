@{%
if (typeof module !== "undefined" && typeof require != "undefined") {
	const Distribution = require("./distribution").Distribution
	const Dice = require("./distribution").Dice
}
%}


expr -> sum {% id %}

sum -> sum "+" scalar
	| sum "-" scalar
	| scalar {% id %}

scalar -> dice{% id %}
	| int {% id %}

dice -> int [Dd] int [Hh] int {%
	function ([numDice, d, sides, h, numKeep]) {
		return new Dice(numDice, sides, Dice.highest, numKeep)
	} %}
	| int [Dd] int {%
	function ([numDice, d, sides]) {
		return new Dice(numDice, sides)
	} %}
	| [dD] int {%
	 function([d, sides]) {
		return new Dice(1, sides)
	} %}

int -> [0-9]:+ {% (data) => { return parseInt(data[0].join("")) } %}
	| [+-] int {% ([operator, value]) => "-"==operator? -1*value: value %}
