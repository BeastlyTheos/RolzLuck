var p = console.log

var fs = require("fs")

var findFiles = function (m) {
	for (var n in m) {
		if (typeof m[n] === "object") {
			//p(n + " is iterable")
			findFiles(m[n])
		} else {
			//p(n + " is type " + typeof m[n])
			if (typeof m[n] === "string") {
				//p(m[n] + " is a string")
				if (fs.existsSync(m[n])) {
					p(m[n] + " is a file")
				} //is a file
				else {
					p("not! " + m[n])
				} //end is not file
			} //end is a string
		} //is not iterable
	} //end looping
}

var data = fs.readFileSync("manifest.json", "utf8")
//console.log(data);
var m = JSON.parse(data)
findFiles(m)
