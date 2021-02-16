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
dice -> int [Dd] int {%
	function ([numDice, d, sides]) {
		return new Dice(sides, numDice)
	} %}
	| [dD] int {%
	 function([d, sides]) {
		return new Dice(sides)
	} %}
int -> [0-9]:+ {% (data) => { return parseInt(data[0].join("")) } %}
	| [+-] int {% ([operator, value]) => "-"==operator? -1*value: value %}
