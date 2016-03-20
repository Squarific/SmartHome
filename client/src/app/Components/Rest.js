/*
	Creates a rest interface for the given server
	Server should end with a '/'

	Example: const restClient = new Rest("http://localhost:8000/");
*/
function Rest (server) {
	this.server = server;
}

/*
	This function makes a GET request to server

	The methodArray will be appended at the end of the server
	Every entry will be encoded using encodeUriComponent

	Options are the GET options, they will be added at the end
	These should be an object in the form {key: value}
	They will also be encoded and appended using ?key=value&key2=value2

	Callback will be called with the response
	It is given an object, the object will have an error property set
	if something went wrong during the request.

	This function throws an error if the methodarray is not supplied.
*/
Rest.prototype.get = function get (methodArray, options, callback) {
	if (!methodArray || typeof methodArray.length !== "number")
		throw "Request expects a method list as second parameter";

	const cleanedMethod = [];
	methodArray.forEach(function (el) {
		cleanedMethod.push(encodeURIComponent(el));
	});

	const cleanedOptions = [];
	for (key in options) {
		cleanedOptions.push(encodeURIComponent(key) + "=" + encodeURIComponent(options[key]));
	}

	const request = new XMLHttpRequest();

	request.addEventListener("readystatechange", function (event) {
		if (request.readyState === 4 && request.status === 200) {
			try {
				const data = JSON.parse(request.responseText);
			} catch (e) {
				callback({
					error: "JSON Parse error:" + e,
				});
				return;
			}

			callback(data);
		} else if (request.readyState === 4) {
			debugger;
			callback({
				error: "Problem while trying to reach the server. Server responded with status: " + request.status,
			});
		}
	});

	request.open("GET", this.server + cleanedMethod.join("/") + "?" + cleanedOptions.join("&"));
	request.send();
};

module.exports = {
	Rest,
};