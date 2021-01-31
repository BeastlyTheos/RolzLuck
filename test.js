const RollLog = require("./RollLog")
                const samples = require("./testSamples")

                                test(
"isNewMessageMutation returns true when given a new message mutation", ()=> {
	for (mutation of samples.rolls) {
		expect(RollLog.isNewMessageMutation(mutation)).toBe(true)
	}
}
                                )

test(
"isNewMessageMutation returns false when given anything that is not a new message mutation", ()=> {
	for(mutation of samples.nonRolls) {
		expect(RollLog.isNewMessageMutation(mutation)).toBe(false)
	}
}
)

test("parseNewMessageMutation finds correct name", ()=> {
	for(mutation of samples.rolls) {
		var log = new RollLog(mutation)
		expect(log.name).toBe("_Alfred")
	}
})
