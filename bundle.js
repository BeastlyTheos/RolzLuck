var p = console.log

var fs = require("fs")

var findFiles = function (m) {
	var files = []
	for (var n in m) {
		if (typeof m[n] === "object") {
			files.push(...findFiles(m[n]))
		} else {
			if (typeof m[n] === "string" && fs.existsSync(m[n])) {
				files[files.length] = m[n]
			}
		}
	}
	return files
}

var data = fs.readFileSync("manifest.json", "utf8")
var m = JSON.parse(data)
var files = findFiles(m)
files.push("manifest.json")

p(files.length)
for (var f in files) p(files[f])
