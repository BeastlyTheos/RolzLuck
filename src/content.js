const readline = require("readline")
const parser = require("./parser").parser

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false,
})

rl.question("Dice code> ", (diceCode) => {
	rl.question("result> ", (result) => {
		console.log("you said " + diceCode + " gave you " + result)
		var dist = parser.parse(diceCode)
		var luck = dist.luckOfResult(result)
		console.log(`${100 * luck}% luck.`)
		if (luck > 0.5)
			console.log(
				`Luck this good only happens once out of every ${1 / (1 - luck)} times.`
			)
		else
			console.log(
				`luck this bad only happens once out of every ${1 / luck} times.`
			)
		rl.close()
	})
})
