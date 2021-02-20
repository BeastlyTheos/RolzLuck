/* globals Roll */
const RollMessage = require("../RollMessage")
const samples = require("./testSamples")
Roll = RollMessage.Roll.prototype.constructor = jest.fn() //eslint-disable-line

test("isNewMessageMutation returns true when given a new message mutation", () => {
	for (let mutation of samples.rollMutations) {
		expect(RollMessage.isNewMessageMutation(mutation)).toBe(true)
	}
})

test("isNewMessageMutation returns false when given anything that is not a new message mutation", () => {
	for (let mutation of samples.nonRollMutations) {
		expect(RollMessage.isNewMessageMutation(mutation)).toBe(false)
	}
})

test("parseNewMessageMutation finds correct name", () => {
	for (let mutation of samples.rollMutations) {
		var log = new RollMessage(mutation)
		expect(log.name).toBe("_Alfred")
	}
})

test("RollMessage constructor", () => {
	for (let sampleRoll of samples.rolls) {
		Roll.mockClear()
		var log = new RollMessage(sampleRoll.mutation)
		expect(log.name).toBe(sampleRoll.name)
		expect(Roll.mock.calls.length).toBe(sampleRoll.diceCodes.length)
		for (let i = 0; i < sampleRoll.diceCodes.length; i++) {
			expect(Roll.mock.calls[i][0]).toBe(sampleRoll.diceCodes[i])
			expect(Roll.mock.calls[i][1]).toBe(sampleRoll.results[i])
		}
	}
})
