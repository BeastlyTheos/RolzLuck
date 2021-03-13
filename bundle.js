var p = console.log

var fs = require("fs")

var findFiles = function (m) {
	for (var n in m) {
		if (typeof m[n] === "object") {
			findFiles(m[n])
		} else {
			if (typeof m[n] === "string" && fs.existsSync(m[n])) {
				p(m[n] + " is a file")
			}
		}
	}
}

var data = fs.readFileSync("manifest.json", "utf8")
var m = JSON.parse(data)
findFiles(m)
