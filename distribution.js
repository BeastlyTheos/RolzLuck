/* globals module, ValueError */
function sum(arr) {
	var len = arr.length,
		sum = 0
	while (len--) {
		sum += arr[len]
	}
	return sum
}

function factorial(n) {
	if (n <= 0) return 1
	return n * factorial(n - 1)
}

class Dice {
	constructor(numDice, sides, keep = null) {
		this.numDice = numDice
		this.sides = sides
		if (keep === null) this.keep = this.numDice
		else this.keep = keep
	}

	toString() {
		/* istanbul ignore next */
		return `${this.numDice}d${this.sides}h${this.keep}`
	}

	createDistribution() {
		if (this.numDice === 0 || this.sides === 0) return new Distribution([1], 0)
		if (this.numDice <= this.keep) return this.createTrivialDistribution()
		else return this.createPartialSumDistribution()
	}

	createTrivialDistribution() {
		var odds = new Array(this.sides).fill(1)
		var dist = new Distribution(odds)
		for (var i = 1; i < this.numDice; i++)
			dist.intersection(new Distribution(odds))
		return dist
	}

	/* createPartialSumDistribution
	 * recursive algorithm for deriving the PROBABILITY distribution of a partial sum dice roll
	 * syntax: nDsKh
	 * where n is an int representing the number of dice being rolled,
	 * s is an int representing the number of sides on the dice
	 * and k <= n is an int representing the number of highest dice that count towards the partial sum
	 * returns a probability distribution where distro[sum] is the number of permutations that create a given sum
	 */
	createPartialSumDistribution() {
		return this._createPartialSumDistribution(
			this.numDice,
			this.sides,
			this.keep,
			0,
			0,
			1
		)
	}

	/* _createPartialSumDistribution
	 * helper function to handle the recursive aspect of creating a partial sum distribution
	 * where each level of recursion represents one of the dice being summed
	 * parameters: n, s, k depth, streekOfEquals, divisorOfFactorial
	 * int(n) represents the number of dice yet counted at this level of recursion, including the current die
	 * int(s) represents the highest face value this level of recursion is tasked for computing
	 * 	where s is non-increasing with successive levels of recursion
	 * int(k) is the number of dice remaining to be counted towards the partial sum
	 * int(depth) is the number of recursive calls on the stack
	 * 	depth likewise represents the number of dice already accounted for
	 * 	given s is non-decreasing, the dice accounted for at higher levels of recursion will be counted in the partial sum
	 * int(streekOfEquals) is the number of consequtive prior dice that had equal value
	 * int(divisorOfFactorial) is used to compute the number of permutations equivalent to the set of rolls represented by all levels of recursion
	 * 	streekOfEquals and divisorOfFactorial are not used until the terminal case
	 */
	_createPartialSumDistribution(
		numDice,
		sides,
		keep,
		depth,
		streekOfEquals,
		divisorOfFactorial
	) {
		if (!numDice)
			return new Distribution([factorial(depth) / divisorOfFactorial], 0)
		/* istanbul ignore if */
		if (numDice < 0)
			throw Error(
				`exceeded maximum depth: n=${numDice}, s=${sides}, k=${keep}, depth=${depth}, streek=${streekOfEquals}, div=${divisorOfFactorial}`
			)

		var dist, d, newStreek

		for (var s = 1; s <= sides; s++) {
			newStreek = s == sides ? streekOfEquals + 1 : 1
			d = this._createPartialSumDistribution(
				numDice - 1,
				s,
				keep - 1,
				depth + 1,
				newStreek,
				divisorOfFactorial * newStreek
			)
			if (keep > 0) d.min += s
			if (dist) dist.union(d)
			else dist = d
		}

		return dist
	}
}

class Distribution {
	constructor(odds, min = 1) {
		this.dist = odds
		this.min = min
	}

	toString() {
		/* istanbul ignore next */
		return `${this.dist} with a minimum of ${this.min}`
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
		/* istanbul ignore if */
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

	union(other) {
		/* istanbul ignore if */
		if (!(other instanceof Distribution))
			throw new ValueError(`need A Distribution to derive a union`)
		var max =
			Math.max(this.dist.length + this.min, other.dist.length + other.min) - 1
		var min = Math.min(this.min, other.min)
		var length = max - min + 1
		var dist = new Array(length).fill(0)
		for (let i = 0; i < this.dist.length; i++)
			dist[i + this.min - min] += this.dist[i]
		for (let i = 0; i < other.dist.length; i++)
			dist[i + other.min - min] += other.dist[i]
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

/* istanbul ignore next */
if (typeof module !== "undefined") {
	module.exports.Dice = Dice
	module.exports.Distribution = Distribution
}
