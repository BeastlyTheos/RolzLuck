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
		console.log(this.min)
	}

	luckOfResult = function (result) {
		result -= this.min
		return (
			(sum(this.distro.slice(0, result)) + this.distro[result] / 2) /
			sum(this.distro)
		)
	}

	combine = function () {
		//create new array that has size of maxA+maxB - minA-minB
		//for each value of b
		//	copy a to dummie array
		//	increment by value
		//	add into result array
		//set result array to this.distro
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
