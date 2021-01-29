errorWrapper = function(func) {
	try {
		func();
	} catch (err) {
		window.prompt("error!", err);
		throw err;
	}
}

str = JSON.stringify
