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

if (typeof module !== 'undefined') {
	module.exports.isNewMessageMutation = isNewMessageMutation
}
