const nearley = require("nearley")
const lexer = require("../parse").lexer
const grammar = require("../grammar.js")

const compiledGrammar = nearley.Grammar.fromCompiled(grammar)

const zip = (a, b) => a.map((e, i) => [e, b[i]])

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
			expect(res.sides).toBe(sides)
		} catch (err) {
			err.message += "\nProblem with " + code + "\nres is " + res
			throw err
		}
	}
})

test("simple addition and subtraction", () => {
	try {
		for ([expr, expectedTree] of [
			["10", 10],
			["1+1", [1, "+", 1]],
			["2+4", [2, "+", 4]],
			["83+92+12", [[83, "+", 92], "+", 12]],
			["1-1", [1, "-", 1]],
			["8-9+3", [[8, "-", 9], "+", 3]],
			["5+2-8", [[5, "+", 2], "-", 8]],
			["-5+2-8", [[-5, "+", 2], "-", 8]],
			["+-12", -12],
			["-+12", -12],
			["+83+92+-12", [[83, "+", 92], "+", -12]],
		])
			parser = new nearley.Parser(compiledGrammar)
		parser.feed(expr)
		expect(parser.results.length).toBe(1)
		res = parser.results[0]
		expect(res).toEqual(expectedTree)
		treeEquality(res, expectedTree)
	} catch (err) {
		err.message += "\nexpression: " + expr + "\n" + res
		throw err
	}
})

test("unary plus and minus", () => {
	try {
		for ([expr, expectedTree] of [
			["-10", -10],
			["-+9", 9],
			["1+-1", [1, "+", -1]],
			["2-+4", [2, "+", 4]],
			["-5+2-8", [[-5, "+", 2], "-", 8]],
			["-12", -12],
			["+42", 42],
			["+-090", -90],
			["-+13", -13],
			["+83+92+-12", [[83, "+", 92], "+", -12]],
		])
			parser = new nearley.Parser(compiledGrammar)
		parser.feed(expr)
		expect(parser.results.length).toBe(1)
		res = parser.results[0]
		expect(res).toEqual(expectedTree)
		treeEquality(res, expectedTree)
	} catch (err) {
		err.message += "\nexpression: " + expr + "\n" + res
		throw err
	}
})

test("adding scalars and dice codes", () => {
	try {
		for ([expr, expectedTree] of [
			["d1+1", [{numDice: 1, sides: 1}, 1]],
			["d20+4", [{numDice: 1, sides: 20}, 4]],
			["92D12+83", [{numDice: 92, sides: 12}, 83]],
			["4+92D12+83", [[4, "+", {numDice: 92, sides: 12}], "+", 83]],
			["4-92D12-83", [[4, "-", {numDice: 92, sides: 12}], "-", 83]],
		])
			parser = new nearley.Parser(compiledGrammar)
		parser.feed(expr)
		expect(parser.results.length).toBe(1)
		res = parser.results[0]
		treeEquality(res, expectedTree)
	} catch (err) {
		err.message += "\nexpression: " + expr
		throw err
	}
})

treeEquality = function (a, b) {
	if (Array.isArray(a) && Array.isArray(b)) {
		expect(a.length).toBe(b.length)
		for ([ai, bi] of zip(a, b)) treeEquality(ai, bi)
	} else {
		//they should both be terminal values
		expect(typeof a).not.toBe("Array")
		expect(typeof b).not.toBe("Array")

		// expect both values to be equivalent
		if (typeof a === "object" && typeof b === "object") {
			// they are likely dice objects
			expect(a.numDice).toBe(b.numDice)
			expect(a.sides).toBe(b.sides)
		} else expect(a).toBe(b)
	} //end if they are not both arrays
}
