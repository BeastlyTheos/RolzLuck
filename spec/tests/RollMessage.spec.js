/* globals jasmine */
const RollMessage = require("../../RollMessage")
const samples = require("./testSamples")

it("isNewMessageMutation returns true when given a new message mutation", () => {
	for (let mutation of samples.rollMutations) {
		expect(RollMessage.isNewMessageMutation(mutation)).toBe(true)
	}
})

it("isNewMessageMutation returns false when given anything that is not a new message mutation", () => {
	for (let mutation of samples.nonRollMutations) {
		expect(RollMessage.isNewMessageMutation(mutation)).toBe(false)
	}
})

it("RollMessage constructor", () => {
	var Roll = jasmine.createSpy("Roll class")
	Roll.combineRoll = jasmine.createSpy("Roll.combineRoll method")
	for (let sampleRoll of samples.rolls) {
		var log = new RollMessage(sampleRoll.mutation, Roll)
		expect(log.name).toBe(sampleRoll.name)
		expect(Roll.calls.count()).toBe(sampleRoll.diceCodes.length)
		for (let i = 0; i < sampleRoll.diceCodes.length; i++) {
			expect(Roll.calls.argsFor(i)[0]).toBe(sampleRoll.diceCodes[i])
			expect(Roll.calls.argsFor(i)[1]).toBe(sampleRoll.results[i])
		}
		Roll.calls.reset()
	}
})
