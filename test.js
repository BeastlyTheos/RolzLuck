const content = require("./utils")
                const samples = require("./testSamples")

class MockMutation {
	constructor(type, addedNodes) {
		this.type = type
		            this.addedNodes = []
		for (const addedNode of addedNodes) {
			var node = document.createElement("div")
			           node.innerHTML = addedNode
			                            this.addedNodes[this.addedNodes.length] = node
		}
	}
}

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

test("parseNewMessageMutation finds correct name", ()=> {
	for(roll of samples.rolls) {
		var log = content.parseNewMessageMutation(new MockMutation("childList", [roll]))
		          expect(log.name).toBe("_Alfred")
	}
})
