const nearley = require("nearley")
const lexer = require("../parse").lexer
const grammar = require("../grammar.js")

const compiledGrammar = nearley.Grammar.fromCompiled(grammar)

class sample {}
test("parsing atomic dice codes", () => {
	for ([code, numDice, sides] of [
		["D1", 1, 1],
		["d6", 1, 6],
		["d20", 1, 20],
		["D48", 1, 48],
		["3D8", 3, 8],
		["4d6", 4, 6],
	]) {
		try {
			parser = new nearley.Parser(compiledGrammar)
			parser.feed(code)
			expect(parser.results.length).toBe(1)
			res = parser.results[0]
			expect(res[0].sides).toBe(sides)
		} catch (err) {
			err.message += "\nProblem with " + code
			throw err
		}
	}
})
