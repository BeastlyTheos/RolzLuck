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

		this.diceCodes = []
		for (const ancor of this.node.getElementsByTagName("a"))
			if (ancor.hasAttribute("onclick"))
				this.diceCodes[this.diceCodes.length] = ancor.innerHTML

		this.results = []
		for (const span of this.node.getElementsByClassName("result2"))
			this.results[this.results.length] = parseInt(span.innerHTML)

		this.rolls = new Array().fill(null)
		this.combined = null
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
}
