function min(arr) {
	var len = arr.length,
		min = Infinity
	while (len--) {
		if (arr[len] < min) {
			min = arr[len]
		}
	}
	return min
}

function max(arr) {
	var len = arr.length,
		max = -Infinity
	while (len--) {
		if (arr[len] > max) {
			max = arr[len]
		}
	}
	return max
}

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

	createDistribution = function () {
		var odds = new Array(this.sides).fill(1)
		var dist = new Distribution(odds)
		for (var i = 1; i < this.numDice; i++) dist.combine(new Distribution(odds))
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

	oddsOfResult = function (result) {
		return this.dist[result - this.min]
	}

	luckOfResult = function (result) {
		result -= this.min
		return (
			(sum(this.dist.slice(0, result)) + this.dist[result] / 2) / sum(this.dist)
		)
	}

	combine = function (other) {
		if (!other instanceof Distribution)
			throw new ValueError(
				"Cannot combine " + typeof other + " with a distribution"
			)
		var combined = new Array(this.dist.length + other.dist.length - 1).fill(0)
		const min = this.min + other.min
		for (var i = 0; i < this.dist.length; i++)
			for (var j = 0; j < other.dist.length; j++)
				combined[i + j] += this.dist[i] * other.dist[j]
		this.dist = combined
		this.min = min
		return this
	}

	addNumber = function (num) {
		this.min += num
	}

	negate = function () {
		this.min = -1 * this.min - this.dist.length + 1
		this.dist.reverse()
		return this
	}
}

class Roll extends Distribution {
	constructor(diceCode, result, resultNode) {
		this.diceCode = diceCode
		this.result = result
		this.resultNode = resultNode
		this.dist = new Distribution(this.diceCode)
	}

	combineRoll = function (roll) {
		this.dist.combine(roll.dist)
		this.result += roll.result
	}

	getLuck = function () {
		if (!this.luck) this.luck = this.dist.luckOfResult(this.result)
		return this.luck
	}
}

if (typeof module !== "undefined") {
	module.exports.Dice = Dice
	module.exports.Distribution = Distribution
	module.exports.Roll = Roll
}
