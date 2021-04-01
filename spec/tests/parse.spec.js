/* globals process */
const {execSync} = require("child_process")

try {
	execSync("npm run compile-grammar", {windowsHide: true})
} catch (err) /* istanbul ignore next */ {
	console.error(`\nNearley compiler exited with error [${err.status}]`)
	process.exit(15)
}

const parser = require("../../parse")
const zip = (a, b) => a.map((e, i) => [e, b[i]])

const treeEquality = function (a, b) {
	if (Array.isArray(a) && Array.isArray(b)) {
		expect(a.length).toBe(b.length)
		for (var [ai, bi] of zip(a, b)) treeEquality(ai, bi)
	} else {
		//they should both be terminal values
		expect(typeof a).not.toBe("Array")
		expect(typeof b).not.toBe("Array")

		// expect both values to be equivalent
		if (typeof a === "object" && typeof b === "object") {
			// they are likely dice objects
			expect(a.numDice).toBe(b.numDice)
			expect(a.sides).toBe(b.sides)
			if (typeof a.keep !== "undefined" && typeof b.keep !== "undefined")
				expect(a.keep).toBe(b.keep)
		} else expect(a).toBe(b)
	} //end if they are not both arrays
}

describe("mathematical operations", () => {
	it("simple addition and subtraction", () => {
		try {
			for (var [expr, expectedTree] of [
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
			]) {
				let results = parser.feed(expr)
				expect(results.length).toBe(1)
				let res = results[0]
				expect(res).toEqual(expectedTree)
				treeEquality(res, expectedTree)
			}
		} catch (err) /* istanbul ignore next */ {
			err.message += "\nexpression: " + expr + "\n" + res //eslint-disable-line no-undef
			throw err
		}
	})

	it("unary plus and minus", () => {
		try {
			for (var [expr, expectedTree] of [
				["-10", -10],
				["-+9", -9],
				["1+-1", [1, "+", -1]],
				["2-+4", [2, "-", 4]],
				["-5+2-8", [[-5, "+", 2], "-", 8]],
				["-12", -12],
				["+42", 42],
				["+-090", -90],
				["-+13", -13],
				["+83+92+-12", [[83, "+", 92], "+", -12]],
			]) {
				let results = parser.feed(expr)
				expect(results.length).toBe(1)
				let res = results[0]
				expect(res).toEqual(expectedTree)
				treeEquality(res, expectedTree)
			}
		} catch (err) /* istanbul ignore next */ {
			err.message += "\nexpression: " + expr
			throw err
		}
	})
})

describe("dice codes", () => {
	it("parsing atomic dice codes", () => {
		for (var [code, numDice, sides] of [
			["D1", 1, 1],
			["d6", 1, 6],
			["d20", 1, 20],
			["D48", 1, 48],
			["3D8", 3, 8],
			["4d6", 4, 6],
		]) {
			try {
				let results = parser.feed(code)
				expect(results.length).toBe(1)
				let res = results[0]
				expect(res.numDice).toBe(numDice)
				expect(res.sides).toBe(sides)
			} catch (err) /* istanbul ignore next */ {
				err.message += "\nProblem with " + code + "\nres is " + res //eslint-disable-line no-undef
				throw err
			}
		}
	})

	it("adding scalars and dice codes", () => {
		try {
			for (var [expr, expectedTree] of [
				["d1+1", [{numDice: 1, sides: 1}, "+", 1]],
				["d20+4", [{numDice: 1, sides: 20}, "+", 4]],
				["92D12+83", [{numDice: 92, sides: 12}, "+", 83]],
				["4+92D12+83", [[4, "+", {numDice: 92, sides: 12}], "+", 83]],
				["4-92D12-83", [[4, "-", {numDice: 92, sides: 12}], "-", 83]],
			]) {
				let results = parser.feed(expr)
				expect(results.length).toBe(1)
				let res = results[0]
				treeEquality(res, expectedTree)
			}
		} catch (err) /* istanbul ignore next */ {
			err.message += "\nexpression: " + expr //eslint-disable-line no-undef
			throw err
		}
	})

	it("parses partial sum dice codes", () => {
		for (var [expr, expectedTree] of [
			["2d4h9", {numDice: 2, sides: 4, keep: 9}],
			["2d4h3", {numDice: 2, sides: 4, keep: 3}],
			["4d6h3+3", [{numDice: 4, sides: 6, keep: 3}, "+", 3]],
			["4-8d6h3", [4, "-", {numDice: 8, sides: 6, keep: 3}]],
			["12-+8d6h5--40", [[12, "-", {numDice: 8, sides: 6, keep: 5}], "-", -40]],
			// ["12+-8d6h5--40", [[12, "-", {numDice: 8, sides: 6, keep:5}], "+", 40]] // this last case should combine the +- into a -, leaving the 8 positive. Can be fixed either by refactoring createDistribution to handle negative numDice or by fixing parser
		]) {
			let results = parser.feed(expr)
			expect(results.length).toBe(1)
			let res = results[0]
			treeEquality(res, expectedTree)
		}
	})
})

describe("evaluating AST's", () => {
	it("math without dice codes", () => {
		for (var [text, expectedResult] of [
			["1", 1],
			["5", 5],
			["1+1", 2],
			["10+12", 22],
			["4-9", -5],
			["34-14", 20],
			["1+2+3", 6],
			["1+2-3", 0],
			["1-2+3", 2],
			["-4+12", 8],
			["+5-1", 4],
			["-+3", -3],
			["+-9", -9],
			["+----+++-12", -12],
			["---++--38+---+14", -52],
		]) {
			let res = parser.parse(text)
			expect(res.min).toBe(expectedResult)
			expect(res.dist).toEqual([1])
		}
	})
})
