const Distribution = require("../../distribution").Distribution
const Dice = require("../../distribution").Dice

var distro1 = new Distribution([1])
const distroNegative = new Distribution([-3])
const distroMultiple1 = new Distribution([4, 9])
const distroMultiple2 = new Distribution([18, 42])
const distroD6 = new Distribution([1, 2, 3, 4, 5, 6])

describe("misc distribution functions", () => {
	it("oddsOfResult", () => {
		expect(distro1.oddsOfResult(1)).toBe(1)
		expect(distroNegative.oddsOfResult(1)).toBe(-3)
		expect(distroMultiple2.oddsOfResult(1)).toBe(18)
		expect(distroMultiple2.oddsOfResult(2)).toBe(42)
		expect(distroD6.oddsOfResult(5)).toBe(5)
	})

	it("luckOfResult", () => {
		expect(distro1.luckOfResult(1)).toBe(0.5)
		expect(distroNegative.luckOfResult(1)).toBe(0.5)
		expect(distroMultiple1.luckOfResult(1)).toBe(2 / 13)
		expect(distroMultiple1.luckOfResult(2)).toBe(8.5 / 13)
		expect(distroD6.luckOfResult(1)).toBe(0.5 / 21)
		expect(distroD6.luckOfResult(4)).toBe(8 / 21)
	})

	it("derives intersections between distributions", () => {
		var distro1 = new Distribution([1])
		distro1.intersection(distro1)
		expect(distro1.dist).toEqual([1])

		var distroD4 = new Distribution([1, 1, 1, 1])
		var distroD6 = new Distribution([1, 1, 1, 1, 1, 1])
		distroD4.intersection(distroD6)
		expect(distroD4.dist).toEqual([1, 2, 3, 4, 4, 4, 3, 2, 1])
		expect(distroD4.min).toBe(2)

		var distroD2 = new Distribution([1, 1])
		distro1 = new Distribution([1])
		distroD2.intersection(distro1)
		expect(distroD2.dist).toEqual([1, 1])
		expect(distroD2.min).toBe(2)
	})
})

describe("creating distributions from dice codes", () => {
	it("trivial dice codes", () => {
		for (var sides of [1, 2, 3, 10, 20, 103]) {
			let dist = new Dice(sides).createDistribution()
			expect(dist.dist).toEqual(new Array(sides).fill(1))
		}
	})

	it("dice codes with few dice", () => {
		try {
			for (var [numDice, sides, expectedDist] of [
				[2, 1, [1]],
				[2, 2, [1, 2, 1]],
				[3, 3, [1, 3, 6, 7, 6, 3, 1]],
			]) {
				let dist = new Dice(sides, numDice).createDistribution()
				expect(dist.min).toBe(numDice)
				expect(dist.dist).toEqual(expectedDist)
			}
		} catch (err) /* istanbul ignore next */ {
			err.message += "\nnumDice " + numDice + ". sides " + sides
			throw err
		}
	})

	it("dice codes with huge numbers of dice", () => {
		try {
			for (var [numDice, sides] of [
				[1, 1],
				[1, 2],
				[1, 3],
				[1, 0],
				[1, 10],
				[1, 20],
				[1, 103],
				[2, 1],
				[2, 2],
				[2, 3],
				[2, 0],
				[2, 10],
				[2, 20],
				[2, 103],
				[7, 1],
				[7, 2],
				[7, 3],
				[7, 0],
				[7, 10],
				[7, 20],
				[7, 103],
				[0, 1],
				[0, 2],
				[0, 3],
				[0, 0],
				[0, 10],
				[0, 20],
				[0, 103],
				[93, 1],
				[93, 2],
				[93, 3],
				[93, 0],
				[93, 10],
				[93, 20],
				[93, 103],
			]) {
				let dist = new Dice(sides, numDice).createDistribution()
				expect(dist.min).toBe(numDice)
				expect(dist.dist.length).toBe(numDice * sides - numDice + 1)
				expect(dist.dist[0]).toBe(1)
				expect(dist.dist[dist.dist.length - 1]).toBe(1)
			}
		} catch (err) {
			err.message += "\nnumDice " + numDice + ". sides " + sides
		}
	})
})

describe("mathematical operations on distributions", () => {
	it("addNumber", () => {
		distro1.addNumber(12)
		expect(distro1.oddsOfResult(13)).toBe(1)
		distro1.addNumber(-12)
		expect(distro1.oddsOfResult(1)).toBe(1)

		distroMultiple1.addNumber(20)
		expect(distroMultiple1.oddsOfResult(21)).toBe(4)
		expect(distroMultiple1.oddsOfResult(22)).toBe(9)
		distroMultiple1.addNumber(-20)
		expect(distroMultiple1.oddsOfResult(1)).toBe(4)
		expect(distroMultiple1.oddsOfResult(2)).toBe(9)
	})

	it("negate distribution", () => {
		distro1.negate()
		expect(distro1.oddsOfResult(-1)).toBe(1)
		distro1.negate()
		expect(distro1.oddsOfResult(1)).toBe(1)

		distroMultiple1.negate()
		expect(distroMultiple1.oddsOfResult(-1)).toBe(4)
		expect(distroMultiple1.oddsOfResult(-2)).toBe(9)
		distroMultiple1.negate()
		expect(distroMultiple1.oddsOfResult(1)).toBe(4)
		expect(distroMultiple1.oddsOfResult(2)).toBe(9)
	})
})
