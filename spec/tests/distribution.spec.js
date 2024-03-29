/* eslint-env jasmine */
import {Dice, Distribution} from "../../src/distribution"

var distro1 = new Distribution([1])
const distroNegative = new Distribution([-3])
const distroMultiple1 = new Distribution([4, 9])
const distroMultiple2 = new Distribution([18, 42])
const distroD6 = new Distribution([1, 2, 3, 4, 5, 6])

describe("Dice.toString", () => {
	it("shows only sides when numDice is 1", () => {
		var die = new Dice(1, 4)
		expect(die.toString()).toBe("D4")
	})

	it("shows number of dice and sides when there are more than one die but no keep value", () => {
		var die = new Dice(3, 6)
		expect(die.toString()).toBe("3D6")
	})

	it("shows full syntax when keeping a subset of highest dice", () => {
		var die = new Dice(4, 8, Dice.highest, 2)
		expect(die.toString()).toBe("4D8H2")
	})

	it("shows full syntax when keeping a subset of lowest dice", () => {
		var die = new Dice(7, 6, Dice.lowest, 3)
		expect(die.toString()).toBe("7D6L3")
	})
})

describe("Dice.createDistribution", () => {
	it("creates a distribution of 1's for trivial dice codes", () => {
		for (var sides of [1, 2, 3, 10, 20, 103]) {
			let dist = new Dice(1, sides).createDistribution()
			expect(dist.dist).toEqual(new Array(sides).fill(1))
		}
	})

	it("creates a distribution with a 100% chance of 0 when given a dice code with either 0 dice or 0 sides", () => {
		try {
			for (var [numDice, sides] of [
				[1, 0],
				[2, 0],
				[7, 0],
				[0, 0],
				[0, 10],
				[0, 20],
				[0, 103],
				[93, 0],
			]) {
				let dist = new Dice(numDice, sides).createDistribution()
				expect(dist.min).withContext(`${numDice} and ${sides}`).toBe(0)
				expect(dist.dist).toEqual([1])
			}
		} catch (err) /* istanbul ignore next */ {
			err.message += "\nnumDice " + numDice + ". sides " + sides
			throw err
		}
	})

	it("creates specified distribution for dice codes with few dice", () => {
		try {
			for (var [numDice, sides, expectedDist] of [
				[2, 1, [1]],
				[2, 2, [1, 2, 1]],
				[3, 3, [1, 3, 6, 7, 6, 3, 1]],
			]) {
				let dist = new Dice(numDice, sides).createDistribution()
				expect(dist.min).toBe(numDice)
				expect(dist.dist).toEqual(expectedDist)
			}
		} catch (err) /* istanbul ignore next */ {
			err.message += "\nnumDice " + numDice + ". sides " + sides
			throw err
		}
	})

	it("creates a distribution within sensable boundaries for dice codes with huge numbers of dice", () => {
		try {
			for (var [numDice, sides] of [
				[1, 1],
				[1, 2],
				[1, 3],
				[1, 10],
				[1, 20],
				[1, 103],
				[2, 1],
				[2, 2],
				[2, 3],
				[2, 10],
				[2, 20],
				[2, 103],
				[7, 1],
				[7, 2],
				[7, 3],
				[7, 10],
				[7, 20],
				[7, 103],
				[0, 1],
				[0, 2],
				[0, 3],
				[0, 10],
				[0, 20],
				[0, 103],
				[93, 1],
				[93, 2],
				[93, 3],
				[93, 10],
				[93, 20],
				[93, 103],
			]) {
				let dist = new Dice(numDice, sides).createDistribution()
				expect(dist.min).withContext(`${numDice} and ${sides}`).toBe(numDice)
				expect(dist.dist.length).toBe(numDice * sides - numDice + 1)
				expect(dist.dist[0]).toBe(1)
				expect(dist.dist[dist.dist.length - 1]).toBe(1)
			}
		} catch (err) /* istanbul ignore next */ {
			err.message += "\nnumDice " + numDice + ". sides " + sides
			throw err
		}
	})
})

describe("Dice.createPartialSumDistribution", () => {
	it("creates specified distribution when a subset of the highest dice are kept and there are few dice", () => {
		var die, dist
		for (let [numDice, sides, numKeep, expectedDist] of [
			[1, 1, 0, [1]],
			[1, 1, 1, [1]],
			[2, 1, 0, [1]],
			[2, 1, 1, [1]],
			[2, 1, 2, [1]],
			[1, 2, 0, [2]],
			[1, 2, 1, [1, 1]],
			[2, 2, 0, [4]],
			[2, 2, 1, [1, 3]],
			[2, 2, 2, [1, 2, 1]],
			[3, 3, 0, [27]],
			[3, 3, 1, [1, 7, 19]],
			[3, 3, 2, [1, 3, 7, 9, 7]],
			[3, 3, 3, [1, 3, 6, 7, 6, 3, 1]],
		]) {
			die = new Dice(numDice, sides, Dice.highest, numKeep)
			dist = die.createDistribution()
			expect(dist.min).withContext(die).toBe(numKeep)
			expect(dist.dist).withContext(die).toEqual(expectedDist)
		}
	})

	it("creates specified distribution when a subset of the lowest dice are kept and there are few dice", () => {
		var die, dist
		for (let [numDice, sides, numKeep, expectedDist] of [
			[1, 1, 0, [1]],
			[1, 1, 1, [1]],
			[2, 1, 0, [1]],
			[2, 1, 1, [1]],
			[2, 1, 2, [1]],
			[1, 2, 0, [2]],
			[1, 2, 1, [1, 1]],
			[2, 2, 0, [4]],
			[2, 2, 1, [3, 1]],
			[2, 2, 2, [1, 2, 1]],
			[3, 3, 0, [27]],
			[3, 3, 1, [19, 7, 1]],
			[3, 3, 2, [7, 9, 7, 3, 1]],
			[3, 3, 3, [1, 3, 6, 7, 6, 3, 1]],
		]) {
			die = new Dice(numDice, sides, Dice.lowest, numKeep)
			dist = die.createDistribution()
			expect(dist.min).withContext(die).toBe(numKeep)
			expect(dist.dist).withContext(die).toEqual(expectedDist)
		}
	})
})

describe("distribution method", () => {
	it("add (scalar) increases the domain of results while the range does not change", () => {
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

	it("negate inverses the range of results while the negating the domain", () => {
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

	it("intersection merges in another distribution such that the current distribution reflects the odds that both happen", () => {
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

	it("union merges another distribution such that the current distribution reflects the odds of either or happening", () => {
		var distro1 = new Distribution([1])
		distro1.union(distro1)
		expect(distro1.dist).toEqual([2])

		var distroD4 = new Distribution([1, 1, 1, 1])
		var distroD6 = new Distribution([1, 1, 1, 1, 1, 1])
		distroD4.union(distroD6)
		expect(distroD4.dist).toEqual([2, 2, 2, 2, 1, 1])
		expect(distroD4.min).toBe(1)

		var distroD2 = new Distribution([1, 1])
		distro1 = new Distribution([1])
		distroD2.union(distro1)
		expect(distroD2.dist).toEqual([2, 1])
		expect(distroD2.min).toBe(1)
	})

	it("oddsOfResult returns the odds that a given result happens", () => {
		expect(distro1.oddsOfResult(1)).toBe(1)
		expect(distroNegative.oddsOfResult(1)).toBe(-3)
		expect(distroMultiple2.oddsOfResult(1)).toBe(18)
		expect(distroMultiple2.oddsOfResult(2)).toBe(42)
		expect(distroD6.oddsOfResult(5)).toBe(5)
	})

	it("luckOfResult returns the user's luck rating given the result", () => {
		expect(distro1.luckOfResult(1)).toBe(0.5)
		expect(distroNegative.luckOfResult(1)).toBe(0.5)
		expect(distroMultiple1.luckOfResult(1)).toBe(2 / 13)
		expect(distroMultiple1.luckOfResult(2)).toBe(8.5 / 13)
		expect(distroD6.luckOfResult(1)).toBe(0.5 / 21)
		expect(distroD6.luckOfResult(4)).toBe(8 / 21)
	})
})
