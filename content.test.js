const content = require("./utils")

class MockMutation {
	constructor(type) {
		this.type = type
	}
}

test(
"isNewMessageMutation returns true when given a new message mutation", ()=> {
	m = new MockMutation("childList")
	expect(content.isNewMessageMutation(m)).toBe(true)
}
)
