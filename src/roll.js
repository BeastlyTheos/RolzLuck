import parser from "./parser"

export default class {
	constructor(diceCode, result, resultNode) {
		this.diceCode = diceCode
		this.result = result
		this.resultNode = resultNode
		this.dist = parser.parse(this.diceCode)
	}

	static intersection(a, b) {
		a.dist.intersection(b.dist)
		a.result += b.result
		return a
	}

	getLuck() {
		if (!this.luck) this.luck = this.dist.luckOfResult(this.result)
		return this.luck
	}
}
