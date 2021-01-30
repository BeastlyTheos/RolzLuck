const content = require("./utils")

class MockMutation {
	constructor(type, addedNodes) {
		this.type = type
		            this.addedNodes = addedNodes
	}
}

test(
"isNewMessageMutation returns true when given a new message mutation", ()=> {
	m = new MockMutation("childList", ["test"])
	expect(content.isNewMessageMutation(m)).toBe(true)
}
)

test(
"isNewMessageMutation returns false when given anything that is not a new message mutation", ()=> {
	m = new MockMutation("childList", [])
	expect(content.isNewMessageMutation(m)).toBe(false)
}
)
