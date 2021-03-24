/* globals jasmine */
const Message = require("../../Message")
const samples = require("./testSamples")

it("isNewMessageMutation returns true when given a new message mutation", () => {
	var Roll = jasmine.createSpy("Roll class")
	Roll.combineRoll = jasmine.createSpy("Roll.combineRoll method")
	for (let data of samples.rollMutations) {
		expect(Message.parseMessage(data.mutation, Roll)).not.toEqual(null)
	}
})

it("isNewMessageMutation returns null when given anything that is not a new message mutation", () => {
	var Roll = jasmine.createSpy("Roll class")
	Roll.combineRoll = jasmine.createSpy("Roll.combineRoll method")
	for (let data of samples.nonRollMutations) {
		expect(Message.parseMessage(data.mutation, Roll)).toBeFalsy()
	}
})

it("Message constructor", () => {
	var Roll = jasmine.createSpy("Roll class")
	Roll.combineRoll = jasmine.createSpy("Roll.combineRoll method")
	for (let data of samples.rollMutations) {
		var log = Message.parseMessage(data.mutation, Roll)
		expect(log.name).toBe(data.roll.name)
		expect(Roll.calls.count()).toBe(data.roll.diceCodes.length)
		for (let i = 0; i < data.roll.diceCodes.length; i++) {
			expect(Roll.calls.argsFor(i)[0]).toBe(data.roll.diceCodes[i])
			expect(Roll.calls.argsFor(i)[1]).toBe(data.roll.results[i])
		}
		Roll.calls.reset()
	}
})
