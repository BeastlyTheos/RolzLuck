const nearley = require("nearley")
const lexer = require("../parse").lexer
const grammar = require("../grammar.js")

const compiledGrammar = nearley.Grammar.fromCompiled(grammar)

class sample {}
test("parsing atomic dice codes", () => {
	for ([code, sides] of [
		["D1", 1],
		["d6", 6],
		["d20", 20],
		["D48", 48],
	]) {
		parser = new nearley.Parser(compiledGrammar)
		parser.feed(code)
		expect(parser.results.length).toBe(1)
		res = parser.results[0]
		expect(res[0]).toBe(sides)
	}
})
