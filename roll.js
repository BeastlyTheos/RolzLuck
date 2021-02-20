/* globals module, Roll */
if (typeof module !== "undefined" && typeof require !== "undefined") {
	parser = require("./parse")
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

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
	module.exports = Roll
