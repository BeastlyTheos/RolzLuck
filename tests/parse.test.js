const nearley = require("nearley")
const lexer = require("../parse").lexer
const grammar = require("../grammar.js")

const compiledGrammar = nearley.Grammar.fromCompiled(grammar)

const zip = (a, b) => a.map((e, i) => [e, b[i]])

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
			err.message += "\nProblem with " + code + "\nres is " + res
			throw err
		}
	}
})

test("simple addition", () => {
	try {
		for ([expr, addends] of [
			["1+1", [1, 1]],
			["2+4", [2, 4]],
			["83+92+12", [83, 92, 12]],
		])
			parser.feed(expr)
		expect(parser.results.length).toBe(1)
		res = parser.results[0]
		expect(res).toEqual(addends)
	} catch (err) {
		err.message += "\nexpression: " + expr
	}
})

test("adding scalars and dice codes", () => {
	try {
		for ([expr, addends] of [
			["d1+1", [{numDice: 1, sides: 1}, 1]],
			["d20+4", [{numDice: 1, sides: 20}, 4]],
			["92D12+83", [{numDice: 92, sides: 12}, 83]],
			["4+92D12+83", [4, {numDice: 92, sides: 12}, 83]],
		])
			parser.feed(expr)
		expect(parser.results.length).toBe(1)
		res = parser.results[0]
		expect(res.length).toBe(addends.length)
		for ([res, expectedAddend] of zip(res, addends)) {
			if (typeof expectedAddend === "int") expect(res).toBe(expectedAddend)
			else {
				expect(res.numDice).toBe(expectedAddend.numDice)
				expect(res.sides).toBe(expectedAddend.sides)
			}
		}
	} catch (err) {
		err.message += "\nexpression: " + expr
	}
})
