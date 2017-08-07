
var plane1El;
var car1El;

var limitLeft = 50;
var limitRight = 800;
var direction = 1; 
var step = 5;

// ------- P5 app code ------- //
function setup(){

}

function draw(){
	
	// ------ Moving Plane ------- //
	// get the current left
	var currentLeft = plane1El.offsetLeft;

	// decide the direction
	if (currentLeft > limitRight){
		plane1El.classList.add("left");
		direction = -1;
	}else if (currentLeft < limitLeft){
		plane1El.classList.remove("left");
		direction = 1;
	}

	// get the new left position from the direction
	var newLeft = currentLeft + direction * step;

	plane1El.style.left = newLeft + "px";
	// ------ /Moving Plane ------- //

	// ------ Moving Car ------- //
	// get the current left
	var currentLeft = car1El.offsetLeft;

	// decide the direction
	if (currentLeft > limitRight){
		car1El.classList.add("left");
		direction = -1;
	}else if (currentLeft < limitLeft){
		car1El.classList.remove("left");
		direction = 1;
	}

	// get the new left position from the direction
	var newLeft = currentLeft + direction * step;

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

