const RollLog = require("./RollLog")
const samples = require("./testSamples")

test("isNewMessageMutation returns true when given a new message mutation", () => {
	for (mutation of samples.rollMutations) {
		expect(RollLog.isNewMessageMutation(mutation)).toBe(true)
	}
})

test("isNewMessageMutation returns false when given anything that is not a new message mutation", () => {
	for (mutation of samples.nonRollMutations) {
		expect(RollLog.isNewMessageMutation(mutation)).toBe(false)
	}
})

test("parseNewMessageMutation finds correct name", () => {
	for (mutation of samples.rollMutations) {
		var log = new RollLog(mutation)
		expect(log.name).toBe("_Alfred")
	}
})

test("RollLog constructor extracts the text and results of all dice codes", () => {
	for (roll of samples.rolls) {
		log = new RollLog(roll.mutation)
		expect(log.name).toBe(roll.name)
		//dice codes
		expect(log.diceCodes).toEqual(expect.arrayContaining(roll.diceCodes))
		expect(roll.diceCodes).toEqual(expect.arrayContaining(log.diceCodes))
		//results
		expect(log.results).toEqual(expect.arrayContaining(roll.results))
		expect(roll.results).toEqual(expect.arrayContaining(log.results))
	}
})
