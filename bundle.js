var AdmZip = require("adm-zip")
var fs = require("fs")
var path = require("path")

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

if (fs.existsSync("RolzLuck.zip")) fs.rmSync("RolzLuck.zip")

var zip = AdmZip()
for (var file of files) {
	var folder = path.dirname(file)
	if (folder == ".") folder = ""
	zip.addLocalFile(file, folder)
}

zip.writeZip("RolzLuck.zip")
