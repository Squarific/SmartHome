# Classes

function Sensor (input) {
	this.lifeTime = input;
}

Sensor.prototype.staticVariable = 5;

Sensor.prototype.getUsage = function getUsage (param1) {
	
};

# FORS

## GENERAL STYLE
for (var k = 0; k < array.length; k++) {

}

## Looping trough array and object

for (key in object)

NIET for (key in array)
WEL for (key = 0; ...)

## Vars
var i = 5;
var b = 7; // Appart

#Tabs
TABS, en spaties voor alignment
En houd het zo dicht mogelijk tegen 80 chars

# If, else if, else
if (ietsveeltefuckinglangomgwaaromzolang ||
    ietsanders) {

    omg()

} else if (omgweeraliets) {

	iets()
} else {

	lol()
}

function handleDimension () {
	for (i in dimension) {

}	
}

function () {
	for () {
		return;
	}
}