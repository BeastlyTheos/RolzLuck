const fs = require("fs")

/* istanbul ignore if */
if (
	!fs.existsSync("src/grammar.js") ||
	fs.statSync("src/grammar.ne").mtime > fs.statSync("src/grammar.js").mtime
)
	try {
		const {execSync} = require("child_process")
		execSync("npm run compile-grammar", {windowsHide: true})
	} catch (err) {
		console.error(`\nNearley compiler exited with error [${err.status}]`)
		process.exit(15)
	}
