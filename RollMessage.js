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
			if (ancor.hasAttribute("onclick")) {
				var code = ancor.innerHTML
				if (code.toLowerCase().startsWith("roll")) code = code.slice(4)
				diceCodes[diceCodes.length] = code
			}
		var resultNodes = this.node.getElementsByClassName("result2")
		for (var i = 0; i < diceCodes.length; i++) {
			var result = parseInt(resultNodes[i].innerHTML)
			if (!isNaN(result))
				try {
					this.rolls[this.rolls.length] = new Roll(
						diceCodes[i],
						result,
						resultNodes[i]
					)
				} catch (err) {
					err.message += `\nError caused by dice code '${diceCodes[i]}' with result '${resultNodes[i].innerHTML}'.`
					throw err
				}
		}

		if (this.rolls.length) {
			this.combinedRoll = this.rolls[0]
			for (let i = 1; i < this.rolls.length; i++)
				this.combinedRoll = Roll.combineRoll(this.combinedRoll, this.rolls[i])
		}
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
