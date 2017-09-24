
var plane1 = {el: null,
			 htmlId: "plane-1",
			 limitLeft: -500, 
			 limitRight: 1200,
			 direction: 1, 
			 speed: 5, 
			 onClick: function(event){
				var planeEl = this.el;
				// change the "src" attribute with the new explosion
				planeEl.setAttribute("src", "images/explosion-1.gif");
				setTimeout(() => {
					planeEl.parentNode.removeChild(planeEl);
					removeObject(this);
				}, 500)					
			 }
			};

var car1 = {el: null,
			htmlId: "car-1",
			limitLeft: 50, 
			limitRight: 800,
			direction: 1,
		    speed: 5};

var person1 = {el: null,
			htmlId: "person-1",
			limitLeft: -100, 
			limitRight: 1200,
			direction: 1,
			speed: 2.5};		
			
var person2 = {el: null,
			htmlId: "person-2",
			limitLeft: 200, 
			limitRight: 800,
			direction: 1,
			speed: 4};	
			
var cloud1 = {el: null,
			htmlId: "cloud-1",
			limitLeft: -100, 
			limitRight: 1100,
			direction: 1,
			speed: 0.32};

var cloud2 = {el: null,
			htmlId: "cloud-2",
			limitLeft: -100, 
			limitRight: 1100,
			direction: 1,
			speed: 0.02};

 var objects = [plane1, car1, person1, person2, cloud1,cloud2 ];


// ------- P5 app code ------- //
function setup(){

}

function draw(){
	
	for (obj of objects){
		moveObject(obj)
	}
};

function moveObject(obj){
	// here we make sure we move object that have a direction
	if (obj.direction == null){
		return;
	}

	// get the current left
	obj.currentLeft = (obj.currentLeft == null)?obj.el.offsetLeft:obj.currentLeft;

	// decide the direction
	if (obj.currentLeft  > obj.limitRight){
		obj.el.classList.add("left");
		obj.direction = -1;
	}else if (obj.currentLeft  < obj.limitLeft){
		obj.el.classList.remove("left");
		obj.direction = 1;
	}

	// get the new left position from the direction
	var newLeft = obj.currentLeft + obj.direction * obj.speed;
	
	// update the html element left (this will round the el.offsetLeft)
	obj.el.style.left = newLeft + "px";

	// and we store exact newLeft in the obj.currentLeft
	obj.currentLeft = newLeft;
}
// ------- /P5 app code ------- //

// This will be called when the page is loaded (before setup and draw)
document.addEventListener("DOMContentLoaded", function(event) {

	// for all of our mo
	for (let obj of objects){
		obj.el = document.getElementById(obj.htmlId);
		// we add the event listener only if the obj has a .onClick
		if (obj.onClick != null){
			obj.el.addEventListener('click', function(event){
				obj.onClick();	
			})
		}
	}
});

// helper function
function removeObject(object){
	var index = objects.indexOf(object);
	objects.splice(index, 1);
}