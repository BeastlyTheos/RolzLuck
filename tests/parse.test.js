const parse = require("../parse")

describe("lexer", () => {
	test("lexer tokenizes", () => {
		parse.lexer.reset("1+2")
		for (const expectedTok of [
			["int", 1],
			["plus", "+"],
			["int", 2],
		]) {
			tok = parse.lexer.next()
			expect(tok.type).toBe(expectedTok[0])
			expect(tok.value).toBe(expectedTok[1])
		}
	})
})
