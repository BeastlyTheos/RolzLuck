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

class Distrobution {
	constructor(probabilities) {
		this.distro = probabilities
		this.min = 1
	}

	probabilityOfResult = function (result) {
		return this.distro[result - this.min]
	}

	addNumber = function (num) {
		this.min += num
		this.max += num
	}

	combine = function () {
		//create new array that has size of maxA+maxB - minA-minB
		//for each value of b
		//	copy a to dummie array
		//	increment by value
		//	add into result array
		//set result array to this.distro
	}

	luckOfResult = function (result) {
		result = result - this.min
		//return this.distro[result]/2 + sum(this.distro[min:result-1])
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
