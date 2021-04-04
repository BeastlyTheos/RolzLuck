/* globals Roll: writable */
if (typeof module !== "undefined" && typeof require !== "undefined") {
	Roll = require("./roll")
}

class Message {
	static parseMessage(mutation, injectedRoll = null) {
		Roll = injectedRoll || Roll
		if (mutation.type !== "childList" || !mutation.addedNodes.length)
			return null
		var node = mutation.addedNodes[0]
		var resultNodes = node.getElementsByClassName("result2")
		if (!resultNodes.length) return null
		var diceCodes = []
		var rolls = []

		var name = node.getElementsByClassName("username")[0].innerHTML

		for (const ancor of node.getElementsByTagName("a"))
			if (ancor.hasAttribute("onclick")) {
				var code = ancor.innerHTML
				if (code.toLowerCase().startsWith("roll")) code = code.slice(4)
				diceCodes[diceCodes.length] = code
			}

		for (var i = 0; i < diceCodes.length; i++) {
			var result = parseInt(resultNodes[i].innerHTML)
			if (!isNaN(result))
				try {
					rolls[rolls.length] = new Roll(diceCodes[i], result, resultNodes[i])
				} catch (err) {
					err.message += `\nError caused by dice code '${diceCodes[i]}' with result '${resultNodes[i].innerHTML}'.`
					throw err
				}
		}

		if (!rolls.length) return null
		var combinedRoll = rolls[0]
		for (let i = 1; i < rolls.length; i++)
			combinedRoll = Roll.combineRoll(combinedRoll, rolls[i])
		return new Message(node, name, rolls, combinedRoll)
	}

	constructor(node, name, rolls, combinedRoll) {
		this.node = node
		this.name = name
		this.rolls = rolls
		this.combinedRoll = combinedRoll
		this.time = Date.now()
	}

	toString() {
		return "[Message: " + this.node.innerHTML + "]"
	}
}

if (typeof module !== "undefined") {
	module.exports = Message
}
