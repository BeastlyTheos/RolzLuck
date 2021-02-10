const parse = require("../parse")

describe("lexer", () => {
	test("lexer tokenizes", () => {
		testLexer("1+2", [
			["int", 1],
			["plus", "+"],
			["int", 2],
		])
		testLexer("\t 32 +\t 1111 \t", [
			["WS", ""],
			["int", 32],
			["WS", ""],
			["plus", "+"],
			["WS", ""],
			["int", 1111],
			["WS", ""],
		])
	})
})

testLexer = function (input, expectedTokens) {
	parse.lexer.reset(input)
	for (const expectedTok of expectedTokens) {
		tok = parse.lexer.next()
		expect(tok.type).toBe(expectedTok[0])
		expect(tok.value).toBe(expectedTok[1])
	}
}
