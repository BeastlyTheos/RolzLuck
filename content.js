customErr = function(func) {
	try {
		func();
	} catch (err) {
		window.prompt("error!", err);
		throw err;
	}
}

//var firstHref = $("a[href^='http']").eq(0).attr("href");

//alert("Hello from your script " + firstHref)

// content.js
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
	customErr( function() {
		var e = $("#output")
		        window.prompt("", JSON.stringify(e.text()));
	}//end of handled code
	         )//end of call to customErr
}//end of event handler function
)//end of call to add listener


customErr(function() {
// Select the node that will be observed for mutations
	const targetNode = document.ogetElementById("output");
//window.prompt("", JSON.stringify(targetNode.text()));


// Options for the observer (which mutations to observe)
	const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
	const callback = function(mutationsList, observer) {
		// Use traditional 'for loops' for IE 11
		for(const mutation of mutationsList) {
			if (mutation.type === 'childList') {
				alert('A child node has been added or removed.');
			}
			else if (mutation.type === 'attributes') {
				alert('The ' + mutation.attributeName + ' attribute was modified.');
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
