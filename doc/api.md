Defined Objects:
	Sensor: {
		name: "", // Unicode name of sensor
		type: "wasmachine", // Unicode type
		location: Location // Id of location
	}

	Location: {
		x: 5,
		y: 5
	}

# METHODS

## POST /login/

Data:
	{
		email: "jantje@gmail.com",
		password: bcrypt(email + password) //bcrypt hashed
	}

Returns:
	{
		error: "Wrong password!", // Human readable, contains no classified information
		success: true
	}

## POST /register/

Data:
	{
		name: "Jantje", // optional
		surname: "Met De Pet", // optional
		email: "jantje@gmail.com",
		password: bcrypt(email + password), //bcrypt hashed
		spam: true
	}

// TODO: Create household
// TODO: Get households

## GET /sensors/$household

$household is the id

Returns:
	{
		error: "Not logged in!", // Human readable, contains no classified information
		sensors: [
			Sensor
		]
	}

## GET /usage/$sensor

$sensor is the name

Returns:
	{
		error: "Not logged in!", // Human readable, contains no classified information
		usage: [{
			date: "", // Parseable by new Date()
			value: 5, // Watt
		}, ...]
	}