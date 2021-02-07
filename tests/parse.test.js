const parse = require("../parse")

test("parseDiceCode", () => {
	var code = "d20+3"
	var distro = parse.parseDiceCode(code)
	console.log(code)
	expect(distro.distro).toBe([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
})
