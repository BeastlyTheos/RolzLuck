const parse = require("../parse")

test("parseDiceCode", () => {
	check("1", [1])
	check("+1", [1], 1)
	check("-1", [1], -1)
	check(" d4", [1, 1, 1, 1], 1)
	check(" - d3", [1, 1, 1], -3)
	check("d2+1", [1, 1], 2)
})

check = function (diceCode, expectedDistro, expectedMin = 1) {
	var distro = parse.parseDiceCode(diceCode)
	expect(distro.distro).toEqual(expectedDistro)
	expect(distro.min).toBe(expectedMin)
}
