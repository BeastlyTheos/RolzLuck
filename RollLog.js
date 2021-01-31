errorWrapper = function(func) {
	try {
		func();
	} catch (err) {
		window.prompt("error!", err);
		throw err;
	}
}

str = JSON.stringify

class RollLog {
	constructor(mutation) {
		var node = mutation.addedNodes[0]
		           var span = node.getElementsByClassName("username")
		                      var name = span[0].innerHTML
		                                 this.name = name
	}

	static isNewMessageMutation(mutation) {
		if(mutation.type !== "childList" || ! mutation.addedNodes.length)
			return false
			       var node = mutation.addedNodes[0]
			                  var span = node.getElementsByClassName("result2")
			                             if(span.length)
				                             return true
				                                    return false
			}
}

if (typeof module !== 'undefined') {
	module.exports = RollLog
}
