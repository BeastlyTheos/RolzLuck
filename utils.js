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
	if(mutation.type === "childList" && mutation.addedNodes.length === 1)
		return true
		       return false
	}

if (typeof module !== 'undefined') {
	module.exports.isNewMessageMutation = isNewMessageMutation
}
