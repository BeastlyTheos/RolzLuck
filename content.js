chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	errorWrapper( function() {
		var e = $("#output")
		        window.prompt("", JSON.stringify(e.text()))
	})
})


function isNewMessageMutation(mutation) {
	return true
}
//module.exports.isNewMessageMutation = isNewMessageMutation



errorWrapper(function() {
	// Select the node that will be observed for mutations
	const targetNode = document.getElementById("output");
	//window.prompt("", JSON.stringify(targetNode.text()));


	// Options for the observer (which mutations to observe)
	const config = { attributes: true, childList: true, subtree: true };

	// Callback function to execute when mutations are observed
	const callback = function(mutationsList, observer) {
		// Use traditional 'for loops' for IE 11
		for(const mutation of mutationsList) {
			if (mutation.type === 'childList') {
				var text = 'A child node has been added or removed. ' + str(mutation.target)
				           var text = text +  ". the removed nodes are: "
				                      for ( const node of mutation.removedNodes)
					                      text = text +  node.outerHTML
					                             text = text+ ". the added nodes are "
					                                    for (const node of mutation.addedNodes)
						                                    text = text +  node.outerHTML
						                                            window.prompt("child node: ", text)
					}
			else if (mutation.type === 'attributes') {
				window.prompt('The ' + mutation.attributeName + ' attribute was modified.');
			}
			else if (mutation.type === 'characterData') {
				window.prompt('The character data ' + JSON.stringify(mutation.target) + ' was modified');
			}
		}
	};

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(targetNode, config);

	// Later, you can stop observing
	//observer.disconnect();
});
