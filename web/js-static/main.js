
class MovingEntity {

	constructor(type, src, width) {
		var html = `<img class='${type}' src='${src}' width='${width}'>`;
		this.el = htmlToElement(html);
	}

	onClick() {
		this.crash();
	}

	crash() {
		this.el.setAttribute("src", "images/explosion-1.gif");
		setTimeout(() => {
			this.el.parentNode.removeChild(this.el);
			removeObject(this);
		}, 500)
	}
}

class Plane extends MovingEntity {
	constructor() {
		super('plane', 'images/plane-1.png', 100);

		this.limitLeft = -500;
		this.limitRight = 1200;
		this.direction = 1;
		this.speed = 6;
	}
}

class Car extends MovingEntity {
	constructor() {
		super('car', 'images/car-1.png', 100);


		this.limitLeft = -200;
		this.limitRight = 1400;
		this.direction = 1;
		this.speed = 4;
	}
}

class Person extends MovingEntity {
	constructor() {
		super('person', 'images/person-running.gif', 35);

		// var html = '<img class="person" src="images/person-running.gif" width="50">';
		// this.el = htmlToElement(html);

		this.limitLeft = -50;
		this.limitRight = 900;
		this.direction = 1;
		this.speed = 2;
	}

}


var cloud1 = {
	el: null,
	htmlId: "cloud-1",
	limitLeft: -100,
	limitRight: 1100,
	direction: 1,
	speed: 0.32
};

var cloud2 = {
	el: null,
	htmlId: "cloud-2",
	limitLeft: -100,
	limitRight: 1100,
	direction: 1,
	speed: 0.02,
	onClick: function () {
		var newPlane = new Plane();
		addObject(newPlane);
	}
};

var house2 = {
	el: null,
	htmlId: "house-2",

	onClick: function () {


		var newCar = new Car();
		addObject(newCar);

	}
};

var house1 = {
	el: null,
	htmlId: "house-1",

	onClick: function () {


		var newperson = new Person();
		addObject(newperson);

	}
};

var objects = [cloud1, cloud2, house2, house1];


// ------- P5 app code ------- //
function setup() {

}

function draw() {

	for (obj of objects) {
		moveObject(obj)
	}
};

function moveObject(obj) {
	// here we make sure we move object that have a direction
	if (obj.direction == null) {
		return;
	}

	// get the current left
	obj.currentLeft = (obj.currentLeft == null) ? obj.el.offsetLeft : obj.currentLeft;

	// decide the direction
	if (obj.currentLeft > obj.limitRight) {
		obj.el.classList.add("left");
		obj.direction = -1;
	} else if (obj.currentLeft < obj.limitLeft) {
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
document.addEventListener("DOMContentLoaded", function (event) {

	// for all of our mo
	for (let obj of objects) {
		// the element is already in HTML, so, we just get it by id.
		obj.el = document.getElementById(obj.htmlId);
		// now that the object is ready, we initialize it. 
		initializeObject(obj);
	}

	var firstPlane = new Plane();
	addObject(firstPlane);

	var firstCar = new Car();
	addObject(firstCar);

	var firstperson = new Person();
	addObject(firstperson);
});

// Add a new object to the list of managed objects
function addObject(object) {
	// first, we add it to the DOM (to HTML with javascript)
	document.querySelector("body").appendChild(object.el);

	// second, we add the event listener
	initializeObject(object);

	// then we add it to the list of objects
	objects.push(object);
}


function initializeObject(object) {
	if (object.onClick != null) {
		object.el.addEventListener('click', function (event) {
			object.onClick();
		})
	}
}
// helper function
function removeObject(object) {
	var index = objects.indexOf(object);
	objects.splice(index, 1);
}


// create HTMLELement from string
function htmlToElement(html) {
	var template = document.createElement('template');
	template.innerHTML = html;
	return template.content.firstChild;
}