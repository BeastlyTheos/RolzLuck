if (typeof module !== "undefined") {
	Distribution = require("./Distribution").Distribution
}

parseDiceCode = function (diceCode) {
	values = []
	var sign = "+"
	var i = 0
	var roll = false
	var num = 0
	diceCode = diceCode.replace(/\s+/g, "")
	while (i < diceCode.length) {
		if (diceCode[i] == "-") {
			sign = "-"
			i++
		}
		if (diceCode[i] == "+") i++
		if (diceCode[i] == "d" || diceCode[i] == "D") {
			roll = true
			i++
		}
		while ("0" <= diceCode[i] && diceCode[i] <= "9") {
			num *= 10
			num += diceCode[i] - "0"
			i++
		}
		if (roll) var dist = new Distribution(new Array(parseInt(num)).fill(1))
		else {
			var dist = new Distribution([1])
			dist.min = num
		}
		if (sign == "-") dist.min = -1 * dist.min + 1 - dist.distro.length
		values[values.length] = dist
		i++
		sign = "+"
		roll = false
		num = 0
	}
	var distro = values[0]
	for (var i = 1; i < values.length; i++) distro.combine(values[i])
	return distro
}

if (typeof module !== "undefined") {
	module.exports.parseDiceCode = parseDiceCode
}
