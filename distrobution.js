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

class Distrobution {
	constructor(probabilities) {
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

class roll {
	constructor(probabilities, result) {
		this.distro = new Distrobution(probabilities)
		this.result = result
	}

	addRoll = function (roll) {
		this.distro.add(roll.distro)
		this.result = roll.result
	}

	luck = function () {
		return this.distro.luckOfResult(this.result)
	}
}

if (typeof module !== "undefined") {
	module.exports = Distrobution
}
