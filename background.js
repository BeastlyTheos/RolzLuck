/* globals chrome */
// background.js

// Called when the user clicks on the browser action.
// eslint-disable-next-line no-unused-vars
chrome.browserAction.onClicked.addListener(function (tab) {
	// Send a message to the active tab
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		var activeTab = tabs[0]
		chrome.tabs.sendMessage(activeTab.id, {
			message: "clicked_browser_action",
		})
	})
})

// eslint-disable-next-line no-unused-vars
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === "open_new_tab") {
		chrome.tabs.create({url: request.url})
	}
})
