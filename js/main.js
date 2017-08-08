
var plane1El;
var car1El;

var limitLeftPlane = -500;
var limitRightPlane = 1200;
var limitLeftCar = 50;
var limitRightCar = 800;
var directionPlane = 1; 
var directionCar = 1;
var step = 5;

// ------- P5 app code ------- //
function setup(){

}

function draw(){
	
	// ------ Moving Plane ------- //
	// get the current left
	var currentLeft = plane1El.offsetLeft;

	// decide the direction
	if (currentLeft > limitRightPlane){
		plane1El.classList.add("left");
		directionPlane = -1;
	}else if (currentLeft < limitLeftPlane){
		plane1El.classList.remove("left");
		directionPlane = 1;
	}

	// get the new left position from the direction
	var newLeft = currentLeft + directionPlane * step;

	plane1El.style.left = newLeft + "px";
	// ------ /Moving Plane ------- //

	// ------ Moving Car ------- //
	// get the current left
	var currentLeft = car1El.offsetLeft;

	// decide the direction
	if (currentLeft > limitRightCar){
		car1El.classList.add("left");
		directionCar = -1;
	}else if (currentLeft < limitLeftCar){
		car1El.classList.remove("left");
		directionCar = 1;
	}

	// get the new left position from the direction
	var newLeft = currentLeft + directionCar * step;

	car1El.style.left = newLeft + "px";
	// ------ /Moving Car ------- //	
};

// ------- /P5 app code ------- //

// This will be called when the page is loaded (before setup and draw)
document.addEventListener("DOMContentLoaded", function(event) {
	// assign plane1El to point to the DOM plane-1 element.
	plane1El = document.getElementById("plane-1");
	// assign car1El
	car1El = document.getElementById("car-1");
});

