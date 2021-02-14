if (typeof module !== "undefined") {
	Distribution = require("./distribution").Distribution
	Roll = require("./distribution").Roll
}

class RollMessage {
	constructor(mutation) {
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

		this.combinedRoll = null
		this.time = Date.now()
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
	module.exports.Roll = Roll
}