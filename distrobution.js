class Distrobution {
	constructor(probabilities) {
		this.distro = probabilities
		this.min = min(this.distro)
		this.max = max(this.distro)
	}

	addNumber = function (num) {
		min += num
		max += num
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

	probabilityOfResult = function (result) {
		return this.distro[result - this.distro.min]
	}

	addRoll = function (roll) {
		this.distro.add(roll.distro)
		this.result = roll.result
	}

	luck = function () {
		return this.distro.luckOfResult(this.result)
	}
}
