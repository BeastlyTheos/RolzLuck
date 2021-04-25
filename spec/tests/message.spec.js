/* eslint-env jasmine */
import Message from "../../src/message"
import samples from "./testSamples"

describe("Message", () => {
	describe(".toString", () => {
		it("shows inner HTML of the initial node", () => {
			let node = {innerHTML: "developer rolls 10d100 = 10"}
			let msg = new Message("id", node)
			expect(msg.toString()).toEqual(`[Message: ${node.innerHTML}]`)
		})
	})

	it("constructor returns truthy when when given a new message mutation", () => {
		var Roll = jasmine.createSpy("Roll class")
		Roll.combineRoll = jasmine.createSpy("Roll.combineRoll method")
		for (let data of samples.rollMutations) {
			expect(Message.parseMessage(data.mutation, Roll)).not.toEqual(null)
		}
	})

	it("constructor returns falsy when when given a new message mutation", () => {
		var Roll = jasmine.createSpy("Roll class")
		Roll.combineRoll = jasmine.createSpy("Roll.combineRoll method")
		for (let data of samples.nonRollMutations) {
			expect(Message.parseMessage(data.mutation, Roll)).toBeFalsy()
		}
	})

	it("constructor parses addedNode into message and roll objects", () => {
		var Roll = jasmine.createSpy("Roll class")
		Roll.combineRoll = jasmine.createSpy("Roll.combineRoll method")
		for (let data of samples.rollMutations) {
			var msg = Message.parseMessage(data.mutation, Roll)
			expect(msg.id).toBe(data.roll.id)
			expect(msg.name).toBe(data.roll.name)
			expect(Roll.calls.count()).toBe(data.roll.diceCodes.length)
			for (let i = 0; i < data.roll.diceCodes.length; i++) {
				expect(Roll.calls.argsFor(i)[0]).toBe(data.roll.diceCodes[i])
				expect(Roll.calls.argsFor(i)[1]).toBe(data.roll.results[i])
			}
			Roll.calls.reset()
		}
	})
})
