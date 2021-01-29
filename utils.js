errorWrapper = function(func) {
	try {
		func();
	} catch (err) {
		window.prompt("error!", err);
		throw err;
	}
}

str = JSON.stringify

function isNewMessageMutation(mutation) {
	return true
}

if (! (typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module)) {
	module.exports.isNewMessageMutation = isNewMessageMutation
}
