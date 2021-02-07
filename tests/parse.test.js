const parse = require("../parse")

test("parseDiceCode", () => {
	check("1", [1])
})

check = function (diceCode, expectedDistro) {
	var distro = parse.parseDiceCode(diceCode)
	expect(distro.distro).toEqual(expectedDistro)
}
