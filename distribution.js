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

class Distribution {
	constructor(odds, min = 1) {
		this.dist = odds
		this.min = min
	}

	odds = function (result) {
		return this.dist[result - this.min]
	}

	addNumber = function (num) {
		this.min += num
	}

	luckOfResult = function (result) {
		result -= this.min
		return (
			(sum(this.dist.slice(0, result)) + this.dist[result] / 2) / sum(this.dist)
		)
	}

	combine = function (other) {
		var combined = new Array(this.dist.length + other.dist.length - 1).fill(0)
		const min = this.min + other.min
		for (var i = 0; i < this.dist.length; i++)
			for (var j = 0; j < other.dist.length; j++)
				combined[i + j] += this.dist[i] * other.dist[j]
		this.dist = combined
		this.min = min
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
	module.exports.Distribution = Distribution
	module.exports.Roll = Roll
}
