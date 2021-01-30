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
	constructor(name) {
		this.name = name
	}
}

function isNewMessageMutation(mutation) {
	if(mutation.type !== "childList" || ! mutation.addedNodes.length)
		return false
		       var node = mutation.addedNodes[0]
		                  var span = node.getElementsByClassName("result2")
		                             if(span.length)
			                             return true
			                                    return false
		}

function parseNewMessageMutation(node) {
	var div = node.addedNodes[0]
	          var span = div.getElementsByClassName("username")
	                     var name = span[0].innerHTML
	                                return new RollLog(name)
}

if (typeof module !== 'undefined') {
	module.exports.isNewMessageMutation = isNewMessageMutation
	                                      module.exports.parseNewMessageMutation = parseNewMessageMutation
}
