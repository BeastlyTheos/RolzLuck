if (typeof module !== "undefined") {
	nearley = require("nearley")
	grammar = require("./grammar.js")
}

const compiledGrammar = nearley.Grammar.fromCompiled(grammar)

parser = {
	feed: function (input) {
		_parser = new nearley.Parser(compiledGrammar)
		_parser.feed(input)
		return _parser.results
	},
}

if (typeof module !== "undefined") {
	module.exports = parser
}
