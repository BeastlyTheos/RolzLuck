/* globals Dice:writable, Distribution:writable, grammar:writable, nearley:writable, */
if (typeof module !== "undefined") {
	nearley = require("nearley")
	grammar = require("./grammar.js")
	Distribution = require("./distribution").Distribution
	Dice = require("./distribution").Dice
}

const compiledGrammar = nearley.Grammar.fromCompiled(grammar)

const parser = {
	parse: function (input) {
		return this.evaluate(this.feed(input)[0])
	},

	feed: function (input) {
		input = input.replace(/\s+/g, "")
		let _parser = new nearley.Parser(compiledGrammar)
		_parser.feed(input)
		return _parser.results
	},

	evaluate: function (tree) {
		if (Array.isArray(tree)) {
			if (tree.length == 1) return this.evaluate(tree[0])
			if (tree.length == 3) {
				let val1 = this.evaluate(tree[0])
				let op = tree[1]
				let val2 = this.evaluate(tree[2])
				if (op === "-") val2.negate()
				return val1.intersection(val2)
			} else throw new Error("tree has wrong number of nodes at this level")
		} else {
			if (typeof tree === "number") return new Distribution([1], tree)
			if (tree instanceof Dice) return tree.createDistribution()
			else
				throw new Error(
					"unrecognised object in tree of type " +
						typeof tree +
						" and class " +
						tree.constructor.name +
						"\nLooks like " +
						tree.toString()
				)
		}
	},
}

if (typeof module !== "undefined") {
	module.exports = parser
}
