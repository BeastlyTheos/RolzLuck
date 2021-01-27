//var firstHref = $("a[href^='http']").eq(0).attr("href");

//alert("Hello from your script " + firstHref)

// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
try {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      alert(firstHref);
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
}// end try
catch (err) {alert("error! " + err);}
  }
);
