/* globals module, ValueError */
function sum(arr) {
	var len = arr.length,
		sum = 0
	while (len--) {
		sum += arr[len]
	}
	return sum
}

class Dice {
	constructor(sides, numDice = 1) {
		this.numDice = numDice
		this.sides = sides
	}

	createDistribution() {
		var odds = new Array(this.sides).fill(1)
		var dist = new Distribution(odds)
		for (var i = 1; i < this.numDice; i++)
			dist.intersection(new Distribution(odds))
		return dist
	}
}

class Distribution {
	constructor(odds, min = 1) {
		if (!odds.length)
			throw new Error(
				"cannot create a probability distribution with 0 possible outcomes"
			)
		this.dist = odds
		this.min = min
	}

	oddsOfResult(result) {
		return this.dist[result - this.min]
	}

	luckOfResult(result) {
		result -= this.min
		return (
			(sum(this.dist.slice(0, result)) + this.dist[result] / 2) / sum(this.dist)
		)
	}

	intersection(other) {
		if (!(other instanceof Distribution))
			throw new ValueError(`need A Distribution to derive an intersection`)
		var dist = new Array(this.dist.length + other.dist.length - 1).fill(0)
		const min = this.min + other.min
		for (var i = 0; i < this.dist.length; i++)
			for (var j = 0; j < other.dist.length; j++)
				dist[i + j] += this.dist[i] * other.dist[j]
		this.dist = dist
		this.min = min
		return this
	}

	addNumber(num) {
		this.min += num
	}

	negate() {
		this.min = -1 * this.min - this.dist.length + 1
		this.dist.reverse()
		return this
	}
}

if (typeof module !== "undefined") {
	module.exports.Dice = Dice
	module.exports.Distribution = Distribution
}
