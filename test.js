const content = require("./utils")
                const samples = require("./testSamples")
//const fs = require("fs")


class MockMutation {
	constructor(type, addedNodes) {
		this.type = type
		            this.addedNodes = []
		for (const addedNode of addedNodes) {
			var node = document.createElement("div")
			           node.outerHTML = addedNode
			                            this.addedNodes[this.addedNodes.length] = node
		}
	}
}

//get input data

test(
"isNewMessageMutation returns true when given a new message mutation", ()=> {
	for (roll of samples.rolls) {
		m = new MockMutation("childList", [roll])
		expect(content.isNewMessageMutation(m)).toBe(true)
	}
}
)

test(
"isNewMessageMutation returns false when given anything that is not a new message mutation", ()=> {
	for(nonRoll of samples.nonRolls) {
		m = new MockMutation("childList", [nonRoll])
		expect(content.isNewMessageMutation(m)).toBe(false)
	}
}
)
