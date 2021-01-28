//var firstHref = $("a[href^='http']").eq(0).attr("href");

//alert("Hello from your script " + firstHref)

// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
try {
var e = $("#output")
window.prompt("", JSON.stringify(e.text()));
}// end try
catch (err) {alert("error! " + err);}
  }
);
