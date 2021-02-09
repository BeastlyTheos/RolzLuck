var logs = []

errorWrapper = function (func) {
	try {
		func()
	} catch (err) {
		window.prompt("error!", err.stack)
		throw err
	}
}

str = JSON.stringify

// code to execute when receiving a message from the background script
// currently runs whenever the browser action is requested
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	errorWrapper(function () {
		window.prompt("", JSON.stringify(logs))
	})
})

errorWrapper(function () {
	// Select the node that will be observed for mutations
	const targetNode = document.getElementById("output")

	// Options for the observer (which mutations to observe)
	const config = {childList: true}

	// Callback function to execute when mutations are observed
	const callback = function (mutationsList, observer) {
		errorWrapper(() => {
			for (const mutation of mutationsList)
				if (RollMessage.isNewMessageMutation(mutation)) {
					var log = new RollMessage(mutation)
					try {
						for (var i = 0; i < log.rolls.length; i++)
							logs[logs.length] = JSON.stringify({
								name: log.name,
								diceCode: log.diceCodes[i],
								result: log.results[i],
								luck: log.rolls[i].luck(),
								time: log.time,
							})
					} catch (TypeError) {
						//throw new Error("improper distro object : "+ log.diceCodes[i] + " produced distro "+ JSON.stringify(log.rolls[i].distro))
					}
				}
		})
	}

	//debugger callback function for displaying mutations as they happen
	const debuggerCallback = function (mutationsList, observer) {
		// Use traditional 'for loops' for IE 11
		for (const mutation of mutationsList) {
			if (mutation.type === "childList") {
				var text =
					"A child node has been added or removed. " + str(mutation.target)
				text = text + ". the type is " + mutation.addedNodes.constructor.name

				text = text + ". the removed nodes are: "
				for (const node of mutation.removedNodes) text = text + node.outerHTML
				text = text + ". the added nodes are "
				for (const node of mutation.addedNodes) {
					text = text + ". the type of this node is " + node.constructor.name
					text = text + node.outerHTML
				}
				window.prompt("child node: ", text)
			} else if (mutation.type === "attributes") {
				window.prompt(
					"The " + mutation.attributeName + " attribute was modified."
				)
			} else if (mutation.type === "characterData") {
				window.prompt(
					"The character data " +
						JSON.stringify(mutation.target) +
						" was modified"
				)
			}
		}
	}

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback)

	// Start observing the target node for configured mutations
	observer.observe(targetNode, config)
})
