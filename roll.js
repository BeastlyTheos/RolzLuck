/* globals module, parser, */

class Roll {
	constructor(diceCode, result, resultNode) {
		this.diceCode = diceCode
		this.result = result
		this.resultNode = resultNode
		this.dist = parser.parse(this.diceCode)
	}

	static combineb(a, b) {
		a.dist.combine(b.dist)
		a.result += b.result
		return a
	}

	getLuck() {
		if (!this.luck) this.luck = this.dist.luckOfResult(this.result)
		return this.luck
	}
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
	module.exports = Roll
