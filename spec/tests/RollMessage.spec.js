/* globals jasmine */
const RollMessage = require("../../RollMessage")
const samples = require("./testSamples")

it("isNewMessageMutation returns true when given a new message mutation", () => {
	for (let data of samples.rollMutations) {
		expect(RollMessage.isNewMessageMutation(data.mutation)).toBe(true)
	}
})

it("isNewMessageMutation returns false when given anything that is not a new message mutation", () => {
	for (let data of samples.nonRollMutations) {
		expect(RollMessage.isNewMessageMutation(data.mutation)).toBe(false)
	}
})

it("RollMessage constructor", () => {
	var Roll = jasmine.createSpy("Roll class")
	Roll.combineRoll = jasmine.createSpy("Roll.combineRoll method")
	for (let data of samples.rollMutations) {
		var log = new RollMessage(data.mutation, Roll)
		expect(log.name).toBe(data.roll.name)
		expect(Roll.calls.count()).toBe(data.roll.diceCodes.length)
		for (let i = 0; i < data.roll.diceCodes.length; i++) {
			expect(Roll.calls.argsFor(i)[0]).toBe(data.roll.diceCodes[i])
			expect(Roll.calls.argsFor(i)[1]).toBe(data.roll.results[i])
		}
		Roll.calls.reset()
	}
})
