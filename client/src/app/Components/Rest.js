/*
	Creates a rest interface for the given server
	Server should end with a '/'

	Example: const restClient = new Rest("localhost:8000/");
*/
function Rest (server) {
	this.server = server;
}

/*
	This function makes a request to server
	It uses htmlmethod as the type (GET, POST, ...)

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
Rest.prototype.request = function restRequest (htmlmethod, methodArray, options, callback) {
	if (!methodArray || typeof methodArray.length !== "number")
		throw "Request expects a method list as second parameter";

	const cleanedMethod = [];
	methodArray.forEach(function (el) {
		cleanedMethod.push(encodeUriComponent(el));
	});

	const request = new XMLHttpRequest();

	request.addEventListener("readystatechange", function (event) {
		if (request.status === 200) {
			try {
				const data = JSON.parse(request.responseText);
			} catch (e) {
				callback({
					error: "JSON Parse error:" + e,
				});
				return;
			}

			callback(data);
		} else {
			callback({
				error: "Problem while trying to reach the server. Server responded with status: " + request.status,
			});
		}
	});

	request.open(htmlmethod, this.server + cleanedMethod.join("/") + "?" + cleanedOptions.join("&"));
};

module.exports = Rest;