var jsdom = require("jsdom")

// eslint-disable-next-line no-global-assign
window = new jsdom.JSDOM(
	'<html><head></head><body><div id="rondavu_container"></div></body></html>'
).window

/* istanbul ignore if */
if (Object.keys(window).length === 0) {
	// this hapens if contextify, one of jsdom's dependencies doesn't install correctly
	// (it installs different code depending on the OS, so it cannot get checked in.);
	throw "jsdom failed to create a usable environment, try uninstalling and reinstalling it"
}

global.window = window

global.document = window.document
