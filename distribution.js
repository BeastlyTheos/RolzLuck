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
	constructor(diceCode) {
		//parse diceCode into a series of distributions then combine them
		if (!Array.isArray(probabilities))
			throw new TypeError(JSON.stringify(probabilities) + " is not an array.")
		this.distro = probabilities
		this.min = 1
	}

	odds = function (result) {
		return this.distro[result - this.min]
	}

	addNumber = function (num) {
		this.min += num
	}

	luckOfResult = function (result) {
		result -= this.min
		return (
			(sum(this.distro.slice(0, result)) + this.distro[result] / 2) /
			sum(this.distro)
		)
	}

	combine = function (other) {
		var combined = new Array(this.distro.length + other.distro.length - 1).fill(
			0
		)
		const min = this.min + other.min
		for (var i = 0; i < this.distro.length; i++)
			for (var j = 0; j < other.distro.length; j++)
				combined[i + j] += this.distro[i] * other.distro[j]
		this.distro = combined
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
