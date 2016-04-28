import React from 'react';

const nl = {
	noInternet: "Verbinding met de server is niet mogelijk. Controleer je internetverbinding.",
	requestError: "Er was een probleem met de server. De server antwoordde met status:",
	JSONError: "JSON Parse fout:",
	next: "Volgende",
	previous: "Vorige",
	username: "Gebruikersnaam",
	password: "Wachtwoord",
	confirmPassword: "Bevestig wachtwoord",
	email: "Email adres",
	submit: "Verzend",
	login: "Log in",
	loading: "Laden...",
	household: "Huishouden",
	loadingHomes: "Je huishoudens worden geladen...",
	createHousehold: "Huishouden aanmaken",
	householdName: "Naam Huishouden",
	country: "Land",
	city: "Stad",
	street: "Straat",
	houseNumber: "Huisnummer",
	createSensor: "Sensor aanmaken",
	sensorName: "Naam sensor",
	sensorDescription: "Beschrijving",
	sensorTags: "Tags",
	powerUnit: "Eenheid",
	cancel: "Annuleren",
	create: "Aanmaken",
	footerMessage: "Gemaakt door CertainlyNotEvilCorp",
	home: "Home",
	viewHouseholds: "Huishoudens bekijken",
	wall: "Wall",
	notifications: "Notificaties",
	signOut: "Afmelden",
	languageChanged: "Taal veranderd naar ",
	post: "Versturen",
	postToWall: "Maak een post",
	message: "Bericht",
	postFrom: "Bericht van ",
	clearAll: "Alles markeren als gelezen",
	clear: "Gelezen",
	accept: "Accepteer",
	friendRequest: "Vriendschapsverzoek",
	alert: "Melding",
	adminInterface: "Admin Interface",
	getData: "Verzamel data!",
	zipCode: "Postcode",
	introMessage: "SmartHome.\n\nEen unieke applicatie waarmee je je energieverbruik kan bekijken,\nsamen oplossingen vinden voor een zuiniger verbruik,\nen vergelijken met anderen via ons sociaal netwerk.\n\nOp deze manier werken we allemaal samen aan een beter milieu,\nen dat allemaal van bij jou thuis, achter de computer.",
	welcomeMessage: "Welkom bij SmartHome.",
	exampleGraph: "Voorbeeldgrafiek",
	graphs: "Grafieken",
	graphsMessage: "Gebruikmakend van 3 verschillende types grafieken,\nzorgt SmartHome ervoor dat je informatie altijd duidelijk en toegankelijk is.\n\n Hiernaast zie je een voorbeeld van de grafieken die gebruikt worden.\n\nWanneer u ingelogd bent, kan u kiezen welke data van welke sensor u wilt zien.\nHet verbruik van je elektrische douche van de afgelopen week?\nHet vebruik van je televisie deze maand, of misschien wel alles?\n\nGeen zorgen. SmartHome doet het allemaal.",
}

const en = {
	noInternet: "Could not connect to the server, either it is offline or you don't have internet.",
	requestError: "Problem while trying to reach the server. Server responded with status:",
	JSONError: "JSON Parse error:",
	next: "Next",
	previous: "Previous",
	username: "Username",
	password: "Password",
	confirmPassword: "Confirm password",
	email: "Email adress",
	submit: "Submit",
	login: "Log in",
	loading: "Loading...",
	household: "Household",
	loadingHomes: "Loading your households...",
	createHousehold: "Create Household",
	householdName: "Household name",
	country: "Country",
	city: "City",
	street: "Street",
	houseNumber: "House number",
	createSensor: "Create Sensor",
	sensorName: "Sensor name",
	sensorDescription: "Description",
	sensorTags: "Tags",
	powerUnit: "Power Unit",
	cancel: "Cancel",
	create: "Create",
	footerMessage: "Proudly presented to you by CertainlyNotEvilCorp",
	home: "Home",
	viewHouseholds: "View Households",
	wall: "Wall",
	notifications: "Notifications",
	signOut: "Sign Out",
	languageChanged: "Language changed to ",
	post: "Post",
	postToWall: "Post a message",
	message: "Message",
	postFrom: "Post from ",
	clearAll: "Clear all",
	clear: "Clear",
	accept: "Accept",
	friendRequest: "Friend Request",
	alert: "Alert",
	adminInterface: "Admin Interface",
	getData: "Get data!",
	zipCode: "Zip code",
	introMessage: "SmartHome.\n\nA unique application to monitor your energy consumption,\nfind solutions to improve together,\nand compare with others on our social network\n\nWe can all work together to save the planet,\nwith only a few clicks.",
	welcomeMessage: "Welcome to SmartHome.",
	exampleGraph: "Example",
	graphs: "Graphs",
	graphsMessage: "Using 3 different types of graphs,\nSmartHome makes sure your information is always clear and accessible.\n\nTo the left you can see an interactive example of the graphs we use.\n\nWhen logged in, you can also specify which data, from which sensor you want to see.\nLast week's electric shower consumption?\nThis month's television consumption, or perhaps just everything?\n\nDon't worry. SmartHome does it all.",
}

module.exports = {
	nl,
	en,
};