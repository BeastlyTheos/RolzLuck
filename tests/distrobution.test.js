const Distribution = require("../distribution").Distribution
const Dice = require("../distribution").Dice

const distro1 = new Distribution([1])
const distroNegative = new Distribution([-3])
const distroMultiple1 = new Distribution([4, 9])
const distroMultiple2 = new Distribution([18, 42])
const distroD6 = new Distribution([1, 2, 3, 4, 5, 6])

arrayEqual = function (a, b) {
	expect(a).toEqual(expect.arrayContaining(b))
	expect(b).toEqual(expect.arrayContaining(a))
}

describe("distribution", () => {
	test("probabilityOfDistrabution", () => {
		expect(distro1.odds(1)).toBe(1)
		expect(distroNegative.odds(1)).toBe(-3)
		expect(distroMultiple2.odds(1)).toBe(18)
		expect(distroMultiple2.odds(2)).toBe(42)
		expect(distroD6.odds(5)).toBe(5)
	})

	test("addNumber", () => {
		distro1.addNumber(12)
		expect(distro1.odds(13)).toBe(1)
		distro1.addNumber(-12)
		expect(distro1.odds(1)).toBe(1)

		distroMultiple1.addNumber(20)
		expect(distroMultiple1.odds(21)).toBe(4)
		expect(distroMultiple1.odds(22)).toBe(9)
		distroMultiple1.addNumber(-20)
		expect(distroMultiple1.odds(1)).toBe(4)
		expect(distroMultiple1.odds(2)).toBe(9)
	})

	/*
test("luckOfResult", () => {
	expect(distro1.luckOfResult(1)).toBe(0.5)
	expect(distroNegative.luckOfResult(1)).toBe(0.5)
	expect(distroMultiple1.luckOfResult(1)).toBe(2 / 13)
	expect(distroMultiple1.luckOfResult(2)).toBe(8.5 / 13)
	expect(distroD6.luckOfResult(1)).toBe(0.5 / 21)
	expect(distroD6.luckOfResult(4)).toBe(8 / 21)
})
*/

	test("combine", () => {
		var distro1 = new Distribution([1])
		distro1.combine(distro1)
		arrayEqual(distro1.dist, [1])

		var distroD4 = new Distribution([1, 1, 1, 1])
		var distroD6 = new Distribution([1, 1, 1, 1, 1, 1])
		distroD4.combine(distroD6)
		expect(distroD4.dist).toEqual([1, 2, 3, 4, 4, 4, 3, 2, 1])
		expect(distroD4.min).toBe(2)

		var distroD2 = new Distribution([1, 1])
		var distro1 = new Distribution([1])
		distroD2.combine(distro1)
		expect(distroD2.dist).toEqual([1, 1])
		expect(distroD2.min).toBe(2)
	})
})

describe("creating distributions from dice codes", () => {
	test("trivial dice codes", () => {
		for (sides of [1, 2, 3, 0, 10, 20, 103]) {
			dist = new Dice(sides).createDistribution()
			expect(dist.dist).toEqual(new Array(sides).fill(2))
		}
	})
})
