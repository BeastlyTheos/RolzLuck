/* globals module, parser, */

class Roll {
	constructor(diceCode, result, resultNode) {
		this.diceCode = diceCode
		this.result = result
		this.resultNode = resultNode
		this.dist = parser.parse(this.diceCode)
	}

	combineRoll(roll) {
		this.dist.combine(roll.dist)
		this.result += roll.result
	}

	getLuck() {
		if (!this.luck) this.luck = this.dist.luckOfResult(this.result)
		return this.luck
	}
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
	module.exports = Roll
