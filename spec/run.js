import getopts from "getopts"
import Jasmine from "jasmine"

const opts = getopts(process.argv.slice(2))
const FILES = opts._,
	SPEC_FILTER = opts.filter

var jasmine = new Jasmine()
jasmine.loadConfigFile("spec/support/jasmine.json")
jasmine.execute(FILES, SPEC_FILTER)
