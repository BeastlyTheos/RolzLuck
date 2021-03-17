/* globals module, Roll:writable */
if (typeof module !== "undefined" && typeof require !== "undefined") {
	Roll = require("./roll")
}

class RollMessage {
	constructor(mutation, injectedRoll = null) {
		Roll = injectedRoll || Roll
		this.node = mutation.addedNodes[0]
		var span = this.node.getElementsByClassName("username")
		var name = span[0].innerHTML
		this.name = name
		this.rolls = []

		var diceCodes = []
		for (const ancor of this.node.getElementsByTagName("a"))
			if (ancor.hasAttribute("onclick"))
				diceCodes[diceCodes.length] = ancor.innerHTML
		var resultNodes = this.node.getElementsByClassName("result2")
		for (var i = 0; i < diceCodes.length; i++)
			this.rolls[this.rolls.length] = new Roll(
				diceCodes[i],
				parseInt(resultNodes[i].innerHTML),
				resultNodes[i]
			)

		this.combinedRoll = this.rolls[0]
		for (let i = 1; i < this.rolls.length; i++)
			this.combinedRoll = Roll.combineRoll(this.combinedRoll, this.rolls[i])
		this.time = Date.now()
	}

	toString() {
		return "[RollMessage: " + this.node.innerHTML + "]"
	}
	static isNewMessageMutation(mutation) {
		if (mutation.type !== "childList" || !mutation.addedNodes.length)
			return false
		var node = mutation.addedNodes[0]
		var span = node.getElementsByClassName("result2")
		if (span.length) return true
		return false
	}
}

if (typeof module !== "undefined") {
	module.exports = RollMessage
}
