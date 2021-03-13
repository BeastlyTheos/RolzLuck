var fs = require("fs")
var dirname = require("path").dirname

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

if (fs.existsSync("dist")) fs.rmdirSync("dist", {recursive: true})
fs.mkdirSync("dist")

for (var file of files) {
	var path = "dist/" + dirname(file)
	if (!fs.existsSync(path)) fs.mkdirSync(path, {recursive: true})
	fs.copyFileSync(file, "dist/" + file)
}
