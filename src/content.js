/* globals chrome, Message: writable */
// uncomment the following line to run in debug mode
//chrome.storage.local.set({"debug": true})

const errorWrapper = function (func) {
	try {
		func()
	} catch (err) {
		chrome.storage.sync.get(["debug"], (result) => {
			if (result.debug === true) window.prompt("error!", err.stack)
		})
		throw err
	}
}

// add link to view statistics at top of page
let e = document.createElement("a")
e.setAttribute(
	"href",
	"chrome-extension://" + chrome.runtime.id + "/public/popup.html"
)
e.setAttribute("target", "_blank")
e.innerHTML = "view luck statistics"
document.getElementsByTagName("body")[0].prepend(e)

errorWrapper(function () {
	// Select the node that will be observed for mutations
	const targetNode = document.getElementById("output")

	// Options for the observer (which mutations to observe)
	const config = {childList: true}

	// Callback function to execute when mutations are observed
	// eslint-disable-next-line no-unused-vars
	const callback = function (mutationsList, observer) {
		errorWrapper(() => {
			for (const mutation of mutationsList) {
				var msg = Message.parseMessage(mutation)
				if (msg && msg.combinedRoll) {
					var e = document.createElement("span")
					e.innerHTML = Math.round(msg.combinedRoll.getLuck() * 100) + "% luck"
					mutation.addedNodes[0].appendChild(e)
				}
			}
		})
	}

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback)

	// Start observing the target node for configured mutations
	observer.observe(targetNode, config)
})
